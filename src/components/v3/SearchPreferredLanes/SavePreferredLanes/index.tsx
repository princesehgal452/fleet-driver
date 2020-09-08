import React from 'react';
import { inject, observer } from 'mobx-react';
import 'firebase/auth';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { IOperatingLane, ILaneAddress } from 'models/interfaces/shared/IOperatingLanes';

import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';

import DeleteLanePrompt from './DeleteLanePrompt';
import AddLaneContentForm from './AddLaneContentForm';
import UpdateLaneContentForm from './UpdateLaneContentForm';

interface ISavePreferredLanesOwnProps {
  triggerSaveLane: (operatingLane?: IOperatingLane) => void;
  closeSaveLaneDrawer: () => void;
  selectedOperatingLane: IOperatingLane;
  closeAfterSave?: boolean;
}

interface ISavePreferredLanesState {
  showConfirmDelete: boolean;
}

type ISavePreferredLanesProps = ISavePreferredLanesOwnProps & IDriverAppStore;

@inject('driverAppStore')
@observer
class SavePreferredLanes extends React.Component<ISavePreferredLanesProps, ISavePreferredLanesState> {
  state = {
    showConfirmDelete: false
  }

  formDataHandler = (selectedOperatingLane?: IOperatingLane) => async (
    receivingDataPickup: ILaneAddress, receivingDataDropoff: ILaneAddress, name: string) => {
    const { driverAppStore, closeAfterSave, closeSaveLaneDrawer } = this.props;
    const { userStore: { FOUser: { operatingLanes }, updateOperatingLanes } } = driverAppStore as DriverAppStore;
    if(!name) {
      name = `${receivingDataPickup.city} to ${receivingDataDropoff?.city}`;
      let existingNames = operatingLanes.filter(lane => lane.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ).map(o => o.name);
      if (existingNames.length > 0) {
        var count = 1;
        existingNames.forEach((name, index) => {
          let words = name.split(" ");
          let lastWord = words[words.length -1];
          if(parseInt(lastWord)){
            count = parseInt(lastWord) + 1
          }
        });
        name += ` ${count}`;
      }
    }
    try {
      if (selectedOperatingLane) {
        await updateOperatingLanes(operatingLanes.map((operatingLane) => (
          operatingLane.rank === selectedOperatingLane.rank
          ? {
            rank: selectedOperatingLane.rank,
            pickup: receivingDataPickup,
            dropoff: receivingDataDropoff,
            name: name
          } : operatingLane)));
          this.props.closeSaveLaneDrawer();
        } else {
          var maxRank = 1;
          if(operatingLanes && operatingLanes.length > 0) {
            maxRank = (operatingLanes.reduce((max, o) => o.rank > max ? o.rank : max, operatingLanes[0].rank)) + maxRank;
          }
          await updateOperatingLanes([
          ...operatingLanes,
          {
            rank: maxRank,
            pickup: receivingDataPickup,
            dropoff: receivingDataDropoff,
            name: name
          },
        ]);
      }
      if (closeAfterSave) {
        closeSaveLaneDrawer();
      }
    } catch (e) {
    } finally {
      // this.loadingToggle();
    }
  };
  
  deleteOperatingLaneConfirmHandler = async () => {
    const { driverAppStore, selectedOperatingLane, closeSaveLaneDrawer } = this.props;
    const { userStore: { FOUser: { operatingLanes }, updateOperatingLanes }, snackbarStore: { enqueueSnackbarStore } } = driverAppStore as DriverAppStore;
    try {
      var updatedOperatingLanes = operatingLanes.filter((operatingLane) => operatingLane !== selectedOperatingLane);
      await updateOperatingLanes(updatedOperatingLanes);
      this.showDeleteLanePrompt(false);
      closeSaveLaneDrawer();
      enqueueSnackbarStore('Operating lane deleted');
    } catch (e) {

    }
  };

  showDeleteLanePrompt = (showConfirmDelete) => {
    this.setState({ showConfirmDelete })
  }

  reflectDrawerStateCallback = (showConfirmDelete)=> {
    this.setState({ showConfirmDelete });
  }

  render() {
    const {
      selectedOperatingLane,
      driverAppStore,
      triggerSaveLane,
      closeSaveLaneDrawer,
      closeAfterSave,
    } = this.props;
    const { showConfirmDelete}  = this.state;
    const {
      userStore: {
        FOUser: { operatingLanes },
        updateOperatingLanes,
      },
    } = driverAppStore as DriverAppStore;
    return (
      <>
        {!selectedOperatingLane ? (
          <AddLaneContentForm
            addLaneSaveHandler={this.formDataHandler(selectedOperatingLane)}
            triggerSaveLane={triggerSaveLane}
            operatingLanes={operatingLanes}
            resetAfterSubmit={closeAfterSave}
          />
        ) : (
          <UpdateLaneContentForm
            selectedOperatingLane={selectedOperatingLane}
            editLaneSaveHandler={this.formDataHandler(selectedOperatingLane)}
            cancelEditLane={closeSaveLaneDrawer}
            operatingLanes={operatingLanes}
            triggerDelete={this.showDeleteLanePrompt}
          />
        )}

        <FOSwipeableBottomDrawer
          maxHeight={160}
          isDrawerOpen={showConfirmDelete}
          reflectDrawerState={this.reflectDrawerStateCallback}
          variant='temporary'
        >
          <DeleteLanePrompt confirmDelete={this.deleteOperatingLaneConfirmHandler} cancelDelete={this.showDeleteLanePrompt} />
        </FOSwipeableBottomDrawer>
      </>
    );
  }
}


export default SavePreferredLanes;
