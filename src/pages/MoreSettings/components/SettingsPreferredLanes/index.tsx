import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';
import SavePreferredLanes from 'components/v3/SearchPreferredLanes/SavePreferredLanes';

import OperatingLanesDragAndDrop from './OperatingLanesDragAndDrop';
import AddNewButton from './AddNewButton';

type ISettingsPreferredLanesProps = IDriverAppStore;

interface ISettingsPreferredLanesState {
  isDrawerOpen: boolean;
  selectedLane: IOperatingLane | null;
}

@inject('driverAppStore')
@observer
class SettingsPreferredLanes extends React.Component<ISettingsPreferredLanesProps, ISettingsPreferredLanesState> {
  state = {
    isDrawerOpen: false,
    selectedLane: null,
  };

  reflectDrawerStateCallback = (isDrawerOpen) => {
    if (!isDrawerOpen) {
      this.setState({ selectedLane: null });
    }
    this.setState({ isDrawerOpen });
  };

  handleCloseSaveLane = () => {
    this.setState({ selectedLane: null, isDrawerOpen: false });
  };

  triggerSaveLane = (selectedLane?: IOperatingLane = null) => (e) => {
    e.stopPropagation();
    this.setState({ selectedLane, isDrawerOpen: true });
  };

  render() {
    const { isDrawerOpen, selectedLane } = this.state;
    const { driverAppStore } = this.props;
    const { userStore: { FOUser: { operatingLanes }, updateOperatingLanes } } = driverAppStore as DriverAppStore;
    return (
      <Grid
        container
        direction='row'
      >
        <Grid item xs={12}>
          {operatingLanes?.length > 0 && (
            <OperatingLanesDragAndDrop
              operatingLanes={operatingLanes}
              updateOperatingLanes={updateOperatingLanes}
              editOperatingLane={this.triggerSaveLane}
            />
          )}
          <AddNewButton openHandler={this.triggerSaveLane} text='Add Lane' />
        </Grid>
        <FOSwipeableBottomDrawer
          showDraggable
          isDrawerOpen={isDrawerOpen}
          reflectDrawerState={this.reflectDrawerStateCallback}
        >
          <SavePreferredLanes
            selectedOperatingLane={selectedLane}
            closeSaveLaneDrawer={this.handleCloseSaveLane}
            triggerSaveLane={this.triggerSaveLane}
            closeAfterSave
          />
        </FOSwipeableBottomDrawer>
      </Grid>
    );
  }
}

export default SettingsPreferredLanes;
