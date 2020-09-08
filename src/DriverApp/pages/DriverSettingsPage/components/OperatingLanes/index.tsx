import React from 'react';
import { inject, observer } from 'mobx-react';
import { Dialog, Grid } from '@material-ui/core';
import { DriverAppStore } from '../../../../store/DriverAppStore';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import { ILaneAddress, IOperatingLane } from '../../../../../models/interfaces/shared/IOperatingLanes';
import SettingsHeader from '../SettingsHeader';
import SettingsTitle from '../SettingsTitle';
import OperatingLanesDragAndDrop from './OperatingLanesDragAndDrop';
import OperatingLanesFormDialog from './OperatingLanesFormDialog';
import OperatingLanesDeleteDialogContent from './OperatingLanesDeleteDialogContent';
import SettingsContent from '../SettingsContent';
import FOAddNewItem from '../../../../../components/FOAddNewItem';
import { getAppContainer } from '../../../../../utils/utility';


type IOperatingLanesProps = IDriverAppStore;

interface IOperatingLanesState {
  loading: boolean;
  showOperatingLaneAddEditForm: boolean;
  showOperatingDeleteDialog: boolean;
  selectedOperatingLane?: IOperatingLane | null;
}

@inject('driverAppStore')
@observer
class OperatingLanes extends React.Component<IOperatingLanesProps, IOperatingLanesState> {
  state = {
    loading: false,
    showOperatingLaneAddEditForm: false,
    showOperatingDeleteDialog: false,
    selectedOperatingLane: undefined,
  };

  editOperatingLaneHandler = (operatingLane: IOperatingLane) => {
    this.setState({ selectedOperatingLane: operatingLane, showOperatingLaneAddEditForm: true });
  };

  deleteOperatingLaneHandler = (deletingOperatingLane: IOperatingLane) => {
    this.setState({ selectedOperatingLane: deletingOperatingLane });
    this.deleteLaneOpenHandler();
  };

  deleteOperatingLaneConfirmHandler = async () => {
    const { selectedOperatingLane } = this.state;
    const { driverAppStore } = this.props;
    const { userStore: { FOUser: { operatingLanes }, updateOperatingLanes }, snackbarStore: { enqueueSnackbarStore } } = driverAppStore as DriverAppStore;
    this.loadingToggle();
    try {
      await updateOperatingLanes(operatingLanes.filter((operatingLane) => operatingLane !== selectedOperatingLane));
      this.loadingToggle();
      this.deleteLaneCloseHandler();
      enqueueSnackbarStore('Operating lane deleted');
    } catch (e) {

    }
  };

  loadingToggle = () => {
    const { loading: currentLoadingState } = this.state;
    this.setState({ loading: !currentLoadingState });
  };


  addEditLaneOpenHandler = () => {
    this.setState({ showOperatingLaneAddEditForm: true });
  };

  addEditLaneCloseHandler = () => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ showOperatingLaneAddEditForm: false, selectedOperatingLane: null });
    }
  };

  deleteLaneOpenHandler = () => {
    this.setState({ showOperatingDeleteDialog: true });
  };

  deleteLaneCloseHandler = () => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ showOperatingDeleteDialog: false, selectedOperatingLane: null });
    }
  };

  formDataHandler = (selectedOperatingLane?: IOperatingLane) => async (
    receivingDataPickup: ILaneAddress, receivingDataDropoff: ILaneAddress) => {
    const { driverAppStore } = this.props;
    const { userStore: { FOUser: { operatingLanes }, updateOperatingLanes } } = driverAppStore as DriverAppStore;
    this.loadingToggle();
    try {
      if (selectedOperatingLane) {
        await updateOperatingLanes(operatingLanes.map((operatingLane) => (
          operatingLane.rank === selectedOperatingLane.rank
            ? {
              rank: selectedOperatingLane.rank,
              pickup: receivingDataPickup,
              dropoff: receivingDataDropoff,
            } : operatingLane)));
      } else {
        await updateOperatingLanes([
          ...operatingLanes,
          {
            rank: operatingLanes.length,
            pickup: receivingDataPickup,
            dropoff: receivingDataDropoff,
          },
        ]);
      }
      this.setState({ selectedOperatingLane: null, showOperatingLaneAddEditForm: false });
    } catch (e) {
    } finally {
      this.loadingToggle();
    }
  };


  render() {
    const { selectedOperatingLane, showOperatingLaneAddEditForm, showOperatingDeleteDialog, loading } = this.state;
    const { driverAppStore } = this.props;
    const { userStore: { FOUser: { operatingLanes }, updateOperatingLanes } } = driverAppStore as DriverAppStore;

    return (
      <Grid container direction='column'>
        <SettingsHeader>
          <Grid item>
            <SettingsTitle>
              Operating Lanes
            </SettingsTitle>
          </Grid>
        </SettingsHeader>
        {operatingLanes?.length > 0 && (
          <SettingsContent>
            <OperatingLanesDragAndDrop
              operatingLanes={operatingLanes}
              updateOperatingLanes={updateOperatingLanes}
              editOperatingLane={this.editOperatingLaneHandler}
              deleteOperatingLane={this.deleteOperatingLaneHandler}
            />
          </SettingsContent>
        )}
        <SettingsContent>
          <FOAddNewItem openHandler={this.addEditLaneOpenHandler} text='Add Lane' />
        </SettingsContent>
        <OperatingLanesFormDialog
          open={Boolean(showOperatingLaneAddEditForm)}
          closeHandler={this.addEditLaneCloseHandler}
          onSubmit={this.formDataHandler(selectedOperatingLane)}
          operatingLane={selectedOperatingLane}
          loading={loading}
        />
        <Dialog open={showOperatingDeleteDialog} onClose={this.deleteLaneCloseHandler} container={getAppContainer}>
          <OperatingLanesDeleteDialogContent
            loading={loading}
            closeHandler={this.deleteLaneCloseHandler}
            confirmHandler={this.deleteOperatingLaneConfirmHandler}
          />
        </Dialog>
      </Grid>
    );
  }
}

export default OperatingLanes;
