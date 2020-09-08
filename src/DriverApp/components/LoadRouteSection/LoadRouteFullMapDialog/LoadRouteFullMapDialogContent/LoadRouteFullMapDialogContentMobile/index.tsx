import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import RouteGuidanceMobile from '../RouteGuidance/RouteGuidanceMobile';
import RouteMapMobile from '../RouteMap/RouteMapMobile';
import AisinRouteData from '../../../../../../models/dataStructures/Aisin/AisinRouteData';


const showGuidanceHandler = (
  setShowGuidance: Dispatch<SetStateAction<boolean>>,
  guidanceState: boolean,
  setAnimation: Dispatch<SetStateAction<boolean>>) => () => {
    setAnimationHandler(setAnimation, true)();
    setShowGuidance(guidanceState);
  };

const setAnimationHandler = (setAnimation: Dispatch<SetStateAction<boolean>>, animationState: boolean) => () => setAnimation(animationState);

interface ILoadRouteFullMapDialogContent {
  routeData: AisinRouteData;
  closeHandler: () => void;
  dialogEntered: boolean;
}

const LoadRouteFullMapDialogContentMobile = memo(({ routeData, closeHandler, dialogEntered }: ILoadRouteFullMapDialogContent) => {
  const [showGuidance, setShowGuidance] = useState(false);
  const [mapSlidingAnimation, setMapSlidingAnimation] = useState(false);
  const [guidanceSlidingAnimation, setGuidanceSlidingAnimation] = useState(false);

  const showRouteMap = !showGuidance || mapSlidingAnimation && !guidanceSlidingAnimation;
  const showRouteGuidance = showGuidance || guidanceSlidingAnimation && !mapSlidingAnimation;

  return (
    <>
      {showRouteMap && (
        <RouteMapMobile
          routeData={routeData}
          closeHandler={closeHandler}
          dialogEntered={dialogEntered}
          guidanceSlidingAnimation={guidanceSlidingAnimation}
          setAnimationHandler={setAnimationHandler}
          setMapSlidingAnimation={setMapSlidingAnimation}
          setShowGuidance={setShowGuidance}
          showGuidance={showGuidance}
          showGuidanceHandler={showGuidanceHandler}
        />
      )}
      {showRouteGuidance && (
        <RouteGuidanceMobile
          closeHandler={closeHandler}
          routeData={routeData}
          showGuidance={showGuidance}
          mapSlidingAnimation={mapSlidingAnimation}
          setGuidanceSlidingAnimation={setGuidanceSlidingAnimation}
          setShowGuidance={setShowGuidance}
          showGuidanceHandler={showGuidanceHandler}
          setAnimationHandler={setAnimationHandler}
        />
      )}
    </>
  );
});

export default LoadRouteFullMapDialogContentMobile;
