import React from 'react';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { Box, Collapse } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverTruck } from 'models/dataStructures/DriverTruck';
import FOAppBar from 'components/v3/FOAppBar';
import FODottedDivider from 'components/v3/FODottedDivider';
import SecondaryActionButton from 'components/v3/FOAppBar/SecondaryActionButton';
import TrackingIcon from 'assets/images/png/tracking/TrackingIcon.png';
import { TRACKING_UI_NO_TRUCK } from 'constants/Messages';
import CurrentTrackingLoad from './CurrentTrackingLoad';
import UpcomingTrackingLoads from './UpcomingTrackingLoads';
import SendTrackingLink from './SendTrackingLink';
import styles from './styles';

interface ITrackingOwnProps {
  personId?: string;
  sessionType?;
}
interface ITrackingSessionsPageV3State {
  showSendTrackingLink: boolean;
}

type ITrackingSessionsPageV3Props = ITrackingOwnProps & IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class TrackingSessionsPageV3 extends React.Component<ITrackingSessionsPageV3Props, ITrackingSessionsPageV3State> {
  state = {
    showSendTrackingLink: false,
  };

  componentDidMount() {
    if (this.Truck) {
      this.downloadTrackingSesssions();
    }
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

  showSendTrackingLink = () => {
    this.setState({ showSendTrackingLink: true });
  };

  goBack = () => {
    const { showSendTrackingLink } = this.state;
    const { history } = this.props;
    if (showSendTrackingLink) {
      this.setState({ showSendTrackingLink: false });
    } else {
      history.push('/driver/viewV3');
    }
  };

  render() {
    const { showSendTrackingLink } = this.state;
    const { classes } = this.props;
    if (!this.Truck) {
      throw new Error(TRACKING_UI_NO_TRUCK);
    }
    const { trackingSessionsStore } = this.Truck;
    const SecondaryAction = () => {
      if (!showSendTrackingLink) {
        return (
          <SecondaryActionButton
            text='Send Tracking Info'
            startIcon={<img className={classes.trackingImg} src={TrackingIcon} alt='Send Tracking Info' />}
            onClick={this.showSendTrackingLink}
            endIcon={<ChevronRightOutlinedIcon color='primary' />}
          />
        );
      }
      return null;
    };

    return (
      <Box height='100%' className={classes.root}>
        <FOAppBar
          pageTitle='Tracking'
          showBackButton
          secondaryActionButtons={<SecondaryAction />}
          backButtonAction={this.goBack}
        />
        <div className={classes.bodyContent}>
          <Collapse in={showSendTrackingLink}>
            {
              showSendTrackingLink && (
                <>
                  <SendTrackingLink />
                  <FODottedDivider />
                </>
              )
            }
          </Collapse>
          {
            trackingSessionsStore.activeSession && (
              <>
                <Box p={2}>
                  <CurrentTrackingLoad title='Current Load' trackingSessionsStore={trackingSessionsStore} />
                </Box>
                <FODottedDivider />
              </>
            )
          }
          <Box pt={1} px={2} pb={1}>
            <UpcomingTrackingLoads title='Upcoming Loads' trackingSessionsStore={trackingSessionsStore} personId={this.Truck.personId} />
          </Box>
        </div>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(TrackingSessionsPageV3));
