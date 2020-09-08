import React, { ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import { UnregisterCallback } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import DriverBottomBar from 'components/v3/DriverBottomBar';
import ErrorBoundary from 'components/v3/ErrorBoundary';
import GeotabServiceAccountPopup from 'components/v3/GeotabServiceAccountPopup';
import DriverSideMenu from 'DriverApp/components/DriverSideMenu';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';

import './DriverPage.scss';

interface IDriverPageState {
  selectedTab: string;
  showMorePopover: boolean;
  showAccountPopover: boolean;
  errKey: number;
}

interface IDriverPageOwnProps {
  children: ReactNode;
  customError?: string;
}

type IDriverPageProps = IDriverPageOwnProps & RouteComponentProps & IDriverAppStore;

@inject('driverAppStore')
@observer
class DriverPage extends React.Component<IDriverPageProps, IDriverPageState> {
  constructor(props: IDriverPageProps) {
    super(props);
    this.state = {
      selectedTab: '',
      showMorePopover: false,
      showAccountPopover: false,
      errKey: 0,
    };
  }

  locationUnlisten: UnregisterCallback = () => {
    return;
  };

  componentDidMount() {
    const { history } = this.props;
    this.redirectRouteIfNotOnboarded();
    this.setSelected(history.location);
    this.locationUnlisten = history.listen(({ location }) => {
      this.setSelected(location);
    });
  }

  componentWillUnmount() {
    this.locationUnlisten();
  }

  redirectRouteIfNotOnboarded = () => {
    const { history, driverAppStore } = this.props;
    const {
      userStore: {
        defaultDriver, dispatcher,
        dispatcherCompletedOnboarding, defaultDriverCompletedOnboarding, blacklistedCompanyType, hasServiceAccount,
      },
      configStore: { isGeotab },
      partnerStore: { isGeotabAdmin },
    } = driverAppStore as DriverAppStore;
    const redirectToCreateServiceAccount = isGeotabAdmin && !hasServiceAccount && !dispatcherCompletedOnboarding;
    const redirectToCreateAccount = !isGeotabAdmin && !hasServiceAccount && !dispatcherCompletedOnboarding;
    if (isGeotab) {
      if (redirectToCreateServiceAccount) {
        return history.replace('/ftAccountAccess/createServiceAccount');
      }
      if (isGeotabAdmin && !dispatcherCompletedOnboarding) {
        return history.replace('/ftOnboarding/companyInfo');
      }
      if (redirectToCreateAccount) {
        return history.replace('/ftAccountAccess/createAccount');
      }
      if (!isGeotabAdmin && !dispatcherCompletedOnboarding) {
        return history.replace('/ftOnboarding/companyInfo');
      }
    }

    if (dispatcher && !dispatcherCompletedOnboarding) {
      return history.replace('/driver/register/check');
    }
    if (defaultDriver && !defaultDriverCompletedOnboarding) {
      if (blacklistedCompanyType) {
        return history.replace('/driver/register/companyDriver');
      }
    }
  };

  setSelected(location) {
    const { errKey } = this.state;
    let selected = '';
    if (location.pathname.indexOf('driver/view') > -1) {
      selected = 'view';
    } else if (location.pathname.indexOf('driver/search') > -1) {
      selected = 'search';
    } else if (location.pathname.indexOf('driver/requestLoad') > -1) {
      selected = 'requestLoad';
    } else if (location.pathname.indexOf('driver/drivers') > -1) {
      selected = 'drivers';
    } else if (location.pathname.indexOf('driver/trackingSessions') > -1) {
      selected = 'trackingSessions';
    } else if (location.pathname.indexOf('driver/notifications') > -1) {
      selected = 'notifications';
    } else if (location.pathname.indexOf('driver/chatbot') > -1) {
      selected = 'chatbot';
    } else if (location.pathname.indexOf('more') > -1) {
      selected = 'more';
    }
    this.setState({
      selectedTab: selected,
      errKey: errKey + 1,
    });
  }

  handleShow = prop => () => {
    this.setState({
      [prop]: true,
    });
  };

  handleClose = prop => () => {
    this.setState({
      [prop]: false,
    });
  };

  handleChange = (selected) => {
    const { history, driverAppStore } = this.props;
    const { configStore: { isV3 } } = driverAppStore as DriverAppStore;

    if (selected === 'more') {
      if (isV3) {
        history.push('/more');
      } else {
        this.handleShow('showMorePopover')();
      }
    } else if (selected === 'search') {
      if (isV3) {
        history.push('/driver/searchV3/results');
      } else {
        history.push('/driver/search/results');
      }
    } else if (selected === 'requestLoad') {
      if (isV3) {
        history.push('/driver/requestLoadV3');
      } else {
        history.push('/driver/requestLoad');
      }
    } else {
      if (isV3 && selected === 'view') {
        history.push(`/driver/${selected}V3`);
      } else {
        history.push(`/driver/${selected}`);
      }
    }
  };

  render() {
    const {
      selectedTab, showMorePopover, showAccountPopover, errKey,
    } = this.state;
    const { customError, driverAppStore, children } = this.props;
    const { userStore: { dispatchableDriver, defaultDriver, dispatcher, FOUser }, configStore: { isGeotab } } = driverAppStore as DriverAppStore;
    const showMenu = (defaultDriver || dispatcher || (dispatchableDriver && FOUser?.permissions?.allowSearch));
    return (
      <div className='driver-template-page'>
        {showMenu && (
          <Hidden smDown>
            <DriverSideMenu selected={selectedTab} onChange={this.handleChange} />
          </Hidden>
        )}
        {isGeotab && (
          <GeotabServiceAccountPopup />
        )}
        <div className='driver-template-page__container'>
          <ErrorBoundary customError={customError} errKey={errKey}>
            <main className='driver-template-page__main'>
              {children}
            </main>
          </ErrorBoundary>
          {showMenu && (
            <Hidden mdUp>
              <DriverBottomBar selected={selectedTab} onChange={this.handleChange} />
            </Hidden>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(DriverPage);
