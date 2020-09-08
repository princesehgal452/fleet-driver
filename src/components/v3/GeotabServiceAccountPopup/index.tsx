import React from 'react';
import { inject, observer } from 'mobx-react';
import { Dialog } from '@material-ui/core';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { getAppContainer } from 'utils/utility';
import GeotabServiceAccountPopupDialogContent from './GeotabServiceAccountPopupDialogContent';


interface IGeotabServiceAccountPopupState {
  showDialog: boolean;
  loading: boolean;
  serviceAccountCreationSuccess: boolean;
}

type IGeotabServiceAccountPopupProps = IDriverAppStore;

@inject('driverAppStore')
@observer
class GeotabServiceAccountPopup extends React.Component<IGeotabServiceAccountPopupProps, IGeotabServiceAccountPopupState> {
  constructor(props: Readonly<IGeotabServiceAccountPopupProps>) {
    super(props);
    this.state = {
      showDialog: false,
      loading: false,
      serviceAccountCreationSuccess: false,
    };
  }

  componentDidMount() {
    this.timeout = this.timer();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  timer = () => {
    return setTimeout(() => {
      const { driverAppStore } = this.props;
      const { userStore: { FOUser: { geotab }, showedGeotabAcknowledgement, hasServiceAccount } } = driverAppStore as DriverAppStore;
      const acknowledgementNumber = geotab?.acknowledgementCounter ? geotab.acknowledgementCounter : 0;
      if (!showedGeotabAcknowledgement && !hasServiceAccount && acknowledgementNumber < 3) {
        this.setState({ showDialog: true });
      }
    }, 15000);
  };

  setDialogClose = () => {
    const { driverAppStore } = this.props;
    const { userStore: { setShowedGeotabAcknowledgement } } = driverAppStore as DriverAppStore;
    setShowedGeotabAcknowledgement(true);
    this.setState({ showDialog: false });
  };

  handleAcknowledgeClick = async () => {
    const { driverAppStore } = this.props;
    const { userStore: { updateGeotabAcknowledgement } } = driverAppStore as DriverAppStore;
    this.setDialogClose();
    await updateGeotabAcknowledgement(1);
  };

  handleCreateServiceAccountClick = async () => {
    const { driverAppStore } = this.props;
    const { partnerStore: { createServiceAccount } } = driverAppStore as DriverAppStore;
    try {
      this.setState({ loading: true });
      await createServiceAccount();
      this.setState({ serviceAccountCreationSuccess: true });
    } catch (e) {

    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { showDialog, loading, serviceAccountCreationSuccess } = this.state;
    const { driverAppStore } = this.props;
    const { partnerStore: { isGeotabAdmin } } = driverAppStore as DriverAppStore;

    return (
      <Dialog open={showDialog} maxWidth='sm' container={getAppContainer}>
        <GeotabServiceAccountPopupDialogContent
          loading={loading}
          serviceAccountCreationSuccess={serviceAccountCreationSuccess}
          isGeotabAdmin={isGeotabAdmin}
          dialogCloseHandler={this.setDialogClose}
          handleAcknowledgeClick={this.handleAcknowledgeClick}
          createServiceAccount={this.handleCreateServiceAccountClick}
        />
      </Dialog>
    );
  }
}

export default GeotabServiceAccountPopup;
