import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Hidden } from '@material-ui/core';
import LoadRouteFullMapDialogContentMobile from './LoadRouteFullMapDialogContentMobile';
import LoadRouteFullMapDialogContentDesktop from './LoadRouteFullMapDialogContentDesktop';
import AisinRouteData from '../../../../../models/dataStructures/Aisin/AisinRouteData';


const initiateAdditonalDataDownload = async (routeData: AisinRouteData) => {
  if (routeData.tourList.length === 0) {
    await routeData.downloadTourList();
  }
  if (routeData.routeDirections.length === 0) {
    await routeData.downloadRouteDirectionsInfo();
  }
};

const additionalDataDownloadEffect = (routeData) => () => {
  initiateAdditonalDataDownload(routeData);
};


interface ILoadRouteFullMapDialogContent {
  selectedRoute: AisinRouteData;
  routeDataList: AisinRouteData[];
  dialogEntered: boolean;
  routeSelectSwitchHandler: (selectedRoute: (AisinRouteData | null)) => () => void;
  closeHandler: () => void;
}

const LoadRouteFullMapDialogContent = observer(({ dialogEntered, routeDataList, routeSelectSwitchHandler, selectedRoute, closeHandler }: ILoadRouteFullMapDialogContent) => {
  useEffect(additionalDataDownloadEffect(selectedRoute), [selectedRoute]);

  return (
    <>
      <Hidden mdUp>
        <LoadRouteFullMapDialogContentMobile
          routeData={selectedRoute}
          closeHandler={closeHandler}
          dialogEntered={dialogEntered}
        />
      </Hidden>
      <Hidden smDown>
        <LoadRouteFullMapDialogContentDesktop
          routeSelectSwitchHandler={routeSelectSwitchHandler}
          routeDataList={routeDataList}
          routeData={selectedRoute}
          closeHandler={closeHandler}
          dialogEntered={dialogEntered}
        />
      </Hidden>
    </>
  );
});

export default LoadRouteFullMapDialogContent;
