import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid, Tab, Tabs } from '@material-ui/core';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import TrackingActive from './TrackingActive';
import TrackingPending from './TrackingPending';
import { TrackingSessionTabStates } from '../../../services/constants';
import { DriverTruck } from '../../../models/dataStructures/DriverTruck';
import { ICoordinate } from '../../../models/interfaces/shared/ICoordinate';


interface ITrackingSessionsPageRouteProps {
  personId: string;
  sessionType;
}

interface ITrackingSessionsPageState {
  currentTab: TrackingSessionTabStates;
}

type ITrackingSessionsPageProps = & IDriverAppStore & RouteComponentProps<ITrackingSessionsPageRouteProps>;

@inject('driverAppStore')
@observer
class TrackingSessionsPage extends React.Component<ITrackingSessionsPageProps, ITrackingSessionsPageState> {
  constructor(props: ITrackingSessionsPageProps) {
    super(props);
    this.state = {
      currentTab: TrackingSessionTabStates.CURRENT,
    };
  }

  get coordinates(): ICoordinate {
    const { driverAppStore } = this.props;
    const { userStore: { dispatcher, currentCoordinates } } = driverAppStore as DriverAppStore;
    if (dispatcher) {
      return this.Truck?.driverCoordinates || { lat: 0, lng: 0 };
    }
    return currentCoordinates;
  }

  get Truck() {
    const { driverAppStore, match: { params } } = this.props;
    const { userStore } = driverAppStore as DriverAppStore;
    const { FOUser, dispatcher, defaultDriver } = userStore;

    let truck: DriverTruck | undefined;

    if (FOUser) {
      if (defaultDriver && FOUser.truck) {
        truck = FOUser.truck;
      } else if (dispatcher) {
        const dispatchableDriver = FOUser.drivers?.find((driver) => driver.personId === params.personId);
        if (dispatchableDriver) {
          truck = dispatchableDriver;
        }
      }
    }
    return truck;
  }

  handleTabChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  componentDidMount() {
    this.setInitialTabState();
    if (this.Truck) {
      this.downloadTrackingSesssions();
    }
  }

  setInitialTabState() {
    const { match: { params: { sessionType } } } = this.props;
    if (sessionType) {
      if (sessionType === TrackingSessionTabStates.CURRENT) {
        this.setState({ currentTab: TrackingSessionTabStates.CURRENT });
      } else if (sessionType === TrackingSessionTabStates.UPCOMING) {
        this.setState({ currentTab: TrackingSessionTabStates.UPCOMING });
      }
    }
  }

  downloadTrackingSesssions = async () => {
    const { driverAppStore } = this.props;
    const { userStore: { defaultDriver, downloadCurrentCoordinatesAsync } } = driverAppStore as DriverAppStore;
    if (this.Truck) {
      const { trackingSessionsStore } = this.Truck;
      if (trackingSessionsStore.results.length === 0) {
        await trackingSessionsStore.downloadResults(1, { personId: this.Truck.personId });
        if (defaultDriver) {
          await downloadCurrentCoordinatesAsync();
        }
        await trackingSessionsStore.downloadActiveSessionLoad();
      }
    }
  };

  render() {
    const { match: { params } } = this.props;
    const { currentTab } = this.state;
    if (!this.Truck) {
      throw new Error('User with no truck tried to access Tracking page');
    }
    const { trackingSessionsStore } = this.Truck;
    return (
      <Grid container>
        <Grid item xs={12}>
          <FOAppBarPage
            pageTitle='Load Tracking'
            showBackButton={params.personId && params.sessionType}
            secondaryControls={(
              <Tabs
                value={currentTab}
                onChange={this.handleTabChange}
                variant='fullWidth'
              >
                <Tab label='Current load' value={TrackingSessionTabStates.CURRENT} />
                <Tab label='Upcoming Loads' value={TrackingSessionTabStates.UPCOMING} />
              </Tabs>
            )}
          />
        </Grid>
        <Grid item xs={12} className='driver-page-content'>
          {currentTab === TrackingSessionTabStates.CURRENT && (
            <Grid item xs={12}>
              <TrackingActive trackingSessionsStore={trackingSessionsStore} coordinates={this.coordinates} />
            </Grid>
          )}
          {currentTab === TrackingSessionTabStates.UPCOMING && (
            <Grid item xs={12} className='driver-page-content'>
              <TrackingPending
                trackingSessionsStore={trackingSessionsStore}
                personId={this.Truck.personId}
                coordinates={this.coordinates}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(TrackingSessionsPage);
