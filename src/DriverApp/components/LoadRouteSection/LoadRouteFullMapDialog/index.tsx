import React, { Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react';
import { Dialog } from '@material-ui/core';
import FOTransitionUp from '../../../../components/FOTransitionUp';
import AisinRouteData from '../../../../models/dataStructures/Aisin/AisinRouteData';
import LoadRouteFullMapDialogContent from './LoadRouteFullMapDialogContent';
import { getAppContainer } from '../../../../utils/utility';


const onEnterHandler = (setEntered: Dispatch<SetStateAction<boolean>>, enteredState: boolean) => () => {
  return setEntered(enteredState);
};

interface ILoadRouteFullMapDialog {
  routeDataList: AisinRouteData[];
  selectedRoute: AisinRouteData;
  open: boolean;
  routeSelectSwitchHandler: (selectedRoute: (AisinRouteData | null)) => () => void;
  closeHandler: () => void;
}

const LoadRouteFullMapDialog = observer(({ open, selectedRoute, routeDataList, routeSelectSwitchHandler, closeHandler }: ILoadRouteFullMapDialog) => {
  const [entered, setEntered] = useState(false);
  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={FOTransitionUp}
      onEntered={onEnterHandler(setEntered, true)}
      onExit={onEnterHandler(setEntered, false)}
      container={getAppContainer}
    >
      <LoadRouteFullMapDialogContent
        routeSelectSwitchHandler={routeSelectSwitchHandler}
        dialogEntered={entered}
        selectedRoute={selectedRoute}
        routeDataList={routeDataList}
        closeHandler={closeHandler}
      />
    </Dialog>
  );
});

export default LoadRouteFullMapDialog;
