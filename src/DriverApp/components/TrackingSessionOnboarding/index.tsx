import React from 'react';
import { inject, observer } from 'mobx-react';
import FOBottomSheet from '../../../components/FOBottomSheet';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';
import PartnerOnboardingContent from './PartnerOnboardingContent';


interface ITrackingSessionOnboardingState {
  showDialog: boolean;
}

type ITrackingSessionOnboardingProps = IDriverAppStore;

@inject('driverAppStore')
@observer
class TrackingSessionOnboarding extends React.Component<ITrackingSessionOnboardingProps, ITrackingSessionOnboardingState> {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }

  componentDidMount() {
    this.downloadSessions();
  }

  downloadSessions = async () => {
    const { driverAppStore } = this.props;
    const { userStore: { defaultDriver, dispatcher, FOUser } } = driverAppStore as DriverAppStore;
    if (FOUser) {
      const { drivers, truck } = FOUser;
      if (dispatcher && drivers.length > 0) {
        const promises = drivers.map(async (driver) => driver.trackingSessionsStore.downloadOnboardingSessions());
        await Promise.all(promises);
        if (this.checkHasPendingSessions()) {
          this.dialogOpenHandler();
        }
      } else if (defaultDriver && truck) {
        await truck.trackingSessionsStore.downloadOnboardingSessions();
        if (this.checkHasPendingSessions()) {
          this.dialogOpenHandler();
        }
      }
    }
  };

  checkHasPendingSessions = () => {
    const { driverAppStore } = this.props;
    const { userStore: { defaultDriver, dispatcher, FOUser } } = driverAppStore as DriverAppStore;
    if (FOUser) {
      const { drivers, truck } = FOUser;
      if (dispatcher && drivers.length > 0) {
        const hasPendingStatus = drivers.find((driver) => driver.trackingSessionsStore.partnerOnboarding.find((session) => session.status === 'PENDING'));
        return !!hasPendingStatus;
      }
      if (defaultDriver && truck) {
        return !!truck.trackingSessionsStore.partnerOnboarding.find((session) => session.status === 'PENDING');
      }
    }
    return false;
  };

  checkHasNoPendingSessionsAndCloseDialog = () => {
    if (!this.checkHasPendingSessions()) {
      this.dialogCloseHandler();
    }
  };

  dialogOpenHandler = () => {
    this.setState({ showDialog: true });
  };

  dialogCloseHandler = () => {
    this.setState({ showDialog: false });
  };

  render() {
    const { showDialog } = this.state;
    const { driverAppStore } = this.props;
    const { userStore: { defaultDriver, dispatcher, FOUser } } = driverAppStore as DriverAppStore;

    if (FOUser) {
      const { drivers, truck } = FOUser;
      if (defaultDriver) {
        return (
          <FOBottomSheet open={showDialog}>
            <PartnerOnboardingContent truck={truck} dialogCloseHandler={this.checkHasNoPendingSessionsAndCloseDialog} />
          </FOBottomSheet>
        );
      }

      if (dispatcher) {
        return (
          <FOBottomSheet open={showDialog}>
            <PartnerOnboardingContent drivers={drivers} dialogCloseHandler={this.checkHasNoPendingSessionsAndCloseDialog} />
          </FOBottomSheet>
        );
      }
    }

    return null;
  }
}

export default TrackingSessionOnboarding;
