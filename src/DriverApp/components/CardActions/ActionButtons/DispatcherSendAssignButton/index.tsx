import React from 'react';
import { inject, observer } from 'mobx-react';
import { UnregisterCallback } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Popover, Theme, WithStyles, withStyles } from '@material-ui/core';
import { ReplyRounded } from '@material-ui/icons';
import { DriverAppStore } from '../../../../store/DriverAppStore';
import { mixpanelLoadProperties, mixpanelTrack } from '../../../../../services/FOMixpanel';
import { MIXPANEL_EVENTS } from '../../../../../services/constants';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import { DriverTruck } from '../../../../../models/dataStructures/DriverTruck';
import Load from '../../../../../models/dataStructures/Load';
import DispatcherDialog from './DispatcherDialog';
import FOCardActionListItem from '../../../../../components/FOCardActionListItem';
import DispatcherReassignPopoverContent from './DispatcherReassignPopoverContent';
import { FOUser } from '../../../../../models/dataStructures/FOUser';


const styles = (theme: Theme) => ({});

interface IDispatcherSendAssignButtonOwnProps {
  load: Load | null;
  onClick?: Function;
}

interface IDispatcherSendAssignButtonState {
  showDialog: boolean;
  driverAssignPopoverShow: boolean;
  showSuccess: boolean;
  selectedDriver: DriverTruck | null;
  loading: boolean;
}

type IDispatcherSendAssignButtonProps =
  IDispatcherSendAssignButtonOwnProps
  & IDriverAppStore
  & RouteComponentProps
  & WithStyles<typeof styles>;

const popoverPlacementConfig = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
};

@inject('driverAppStore')
@observer
class DispatcherSendAssignButton extends React.Component<IDispatcherSendAssignButtonProps, IDispatcherSendAssignButtonState> {
  anchorEl: React.RefObject<any> = React.createRef();
  locationUnlisten?: UnregisterCallback;

  constructor(props: IDispatcherSendAssignButtonProps) {
    super(props);
    this.state = {
      showDialog: false,
      driverAssignPopoverShow: false,
      showSuccess: false,
      selectedDriver: null,
      loading: false,
    };
  }

  get getTooltipPosition() {
    return window.innerWidth < 360 ? 'right-start' : 'right-end';
  }

  get loadBookedAndNotAssigned() {
    const { load } = this.props;
    if (load) {
      const { bookedOrCompletedMatch, anyMatchAutomatedTrackingAssigned } = load;
      if (bookedOrCompletedMatch && !anyMatchAutomatedTrackingAssigned) {
        return true;
      }
    }
    return false;
  }

  setAnchorEl = node => {
    this.anchorEl = node;
  };

  sendToActionButtonClickHandler = () => {
    const { history, match, driverAppStore, load } = this.props;
    const { userStore: { FOUser: { firebaseUID } } } = driverAppStore as DriverAppStore;
    this.openDispatcherDialog();
    history.push(`${match.url}/selectDriver`);
    if (load) {
      mixpanelTrack(MIXPANEL_EVENTS.SEND_TO, {
        ...mixpanelLoadProperties(load),
        firebaseUID: firebaseUID,
      });
    }
  };

  openDispatcherDialog = () => {
    const { history } = this.props;
    this.setState({ showDialog: true });
    this.locationUnlisten = history.listen(({ location }) => {
      if (!location.pathname.includes('selectDriver')) {
        this.closeDispatcherDialog();
      }
    });
  };

  closeDispatcherDialog = () => {
    this.setState({ showDialog: false });
    this.locationUnlisten && this.locationUnlisten();
  };

  locationGoBack = () => {
    const { history, match } = this.props;
    history.length <= 1
      ? history.push(match.url)
      : history.back();
  };

  componentDidMount() {
    const { location, load } = this.props;
    if (load && (location.pathname.includes('selectDriver'))
      && ((location.pathname.includes(load.loadId)) || (location.pathname.includes(load.matchId)))) {
      this.openDispatcherDialog();
    }
  }

  handleAssignTypeSelect = (assignType) => {
    if (assignType === 'REASSIGN_DRIVER') {
      this.toggleDriverAssignPopover();
      this.sendToActionButtonClickHandler();
    } else if (assignType === 'ASSIGN_SELF') {
      const { driverAppStore } = this.props;
      const { userStore: { FOUser: { truck } } } = driverAppStore as DriverAppStore;
      if (truck) {
        this.dispatchLoad(truck);
      }
    }
  };

  dispatchLoad = async (selectedDriver: DriverTruck) => {
    const { load, driverAppStore } = this.props;
    const { snackbarStore: { enqueueSnackbarStore }, userStore: { FOUser } } = driverAppStore as DriverAppStore;
    if (load) {
      try {
        await load.dispatchLoadToDriver(selectedDriver);
        mixpanelTrack(MIXPANEL_EVENTS.SEND_LOAD, {
          ...mixpanelLoadProperties(load),
          firebaseUID: FOUser.firebaseUID,
          selectedDriverPersonId: selectedDriver.personId,
        });
        enqueueSnackbarStore(this.getName(selectedDriver, FOUser), { variant: 'success' });
        this.locationGoBack();
      } catch (error) {
        enqueueSnackbarStore('Technical error dispatching load', { variant: 'error' });
      } finally {
        this.setState({ driverAssignPopoverShow: false });
      }
    }
  };

  toggleDriverAssignPopover = () => {
    const { driverAppStore } = this.props;
    const { userStore: { canAssignToMe } } = driverAppStore as DriverAppStore;
    if (canAssignToMe) {
      const { driverAssignPopoverShow } = this.state;
      this.setState({ driverAssignPopoverShow: !driverAssignPopoverShow });
    } else {
      this.sendToActionButtonClickHandler();
    }
  };

  getName = (selectedDriver: DriverTruck, user: FOUser) => {
    if (user.truck && selectedDriver.truckId === user.truck.truckId) {
      return 'Assigned to You';
    }
    return `Load ${this.loadBookedAndNotAssigned ? 'Assigned' : 'Sent'} to ${selectedDriver.firstName} ${selectedDriver.lastName}`;
  };

  render() {
    const { load, driverAppStore } = this.props;
    const { userStore, snackbarStore, configStore } = driverAppStore as DriverAppStore;
    const { showDialog, driverAssignPopoverShow, showSuccess, loading } = this.state;
    const id = driverAssignPopoverShow ? 'simple-popover' : undefined;

    return (
      load && (
        <>
            <div ref={this.setAnchorEl}>
              <FOCardActionListItem
                text={this.loadBookedAndNotAssigned ? 'Dispatch' : 'Share'}
                Icon={ReplyRounded}
                color='primary'
                active={Boolean(load.anyMatchAutomatedTrackingAssigned)}
                onClick={this.toggleDriverAssignPopover}
              />
              <Popover
                id={id}
                open={driverAssignPopoverShow}
                anchorEl={this.anchorEl}
                onClose={this.toggleDriverAssignPopover}
                {...popoverPlacementConfig}
              >
                <DispatcherReassignPopoverContent onSelect={this.handleAssignTypeSelect} />
              </Popover>
            </div>
          <DispatcherDialog
            open={showDialog}
            load={load}
            loading={loading}
            loadBookedAndNotAssigned={this.loadBookedAndNotAssigned}
            dispatchLoad={this.dispatchLoad}
            userStore={userStore}
            configStore={configStore}
            snackbarStore={snackbarStore}
            onCloseHandler={this.locationGoBack}
          />
        </>
      ));
  }
}

export default withStyles(styles)(withRouter(DispatcherSendAssignButton));
