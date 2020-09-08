import React, { Dispatch, SetStateAction } from 'react';
import useResizeObserver from 'use-resize-observer';
import { Divider, Grid, Grow, makeStyles, Theme } from '@material-ui/core';
import LoadRouteDialogHeader from '../../../LoadRouteDialogHeader';
import LoadRouteOverview from '../../../../LoadRouteOverview';
import AisinDirectionsRender from '../../../../../Maps/AisinDirectionsRender';
import AisinRouteData from '../../../../../../../models/dataStructures/Aisin/AisinRouteData';
import { growFromTopStyle } from '../../../../../../../utils/utility';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  flexStretch: {
    flexGrow: 1,
  },
  swipeableView: {
    display: 'flex',
  },
  mapContainer: {
    position: 'relative' as 'relative',
  },
}));

interface IRouteMap {
  closeHandler: () => void;
  routeData: AisinRouteData;
  dialogEntered: boolean;
  showGuidance: boolean;
  guidanceSlidingAnimation: boolean;
  setMapSlidingAnimation: Dispatch<SetStateAction<boolean>>;
  setShowGuidance: Dispatch<SetStateAction<boolean>>;
  showGuidanceHandler: (setShowGuidance: Dispatch<SetStateAction<boolean>>,
                        guidanceState: boolean,
                        setAnimation: Dispatch<SetStateAction<boolean>>) => () => void;
  setAnimationHandler: (setAnimation: Dispatch<SetStateAction<boolean>>, animationState: boolean) => () => void;
}

const RouteMapMobile = ({
                    closeHandler, routeData, dialogEntered, showGuidance, guidanceSlidingAnimation,
                    setMapSlidingAnimation, setShowGuidance, showGuidanceHandler, setAnimationHandler,
                  }: IRouteMap) => {
  const classes = useStyles();
  const [ref, width, height] = useResizeObserver();

  return (
    <Grid container direction='column' className={classes.root}>
      <div>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <LoadRouteDialogHeader closeHandler={closeHandler} />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify='center'>
              <Grid item xs={12} sm={8} md={6}>
                <LoadRouteOverview
                  routeData={routeData}
                  buttonClickAction={showGuidanceHandler(setShowGuidance, true, setMapSlidingAnimation)}
                  buttonText='Show Steps'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </div>
      <div className={classes.flexStretch}>
        <Grid container direction='column' className={classes.root}>
          <div className={classes.flexStretch} ref={ref}>
            <Grow
              in={dialogEntered && !showGuidance && !guidanceSlidingAnimation}
              onExited={setAnimationHandler(setMapSlidingAnimation, false)}
              style={growFromTopStyle}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <AisinDirectionsRender id='aisen-fullmaps-directions' routeData={routeData} mapHeight={height} />
              </div>
            </Grow>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default RouteMapMobile;
