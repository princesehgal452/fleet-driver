import React, { Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react';
import { Divider, Grid, Grow, makeStyles } from '@material-ui/core';
import LoadRouteDialogHeader from '../../../LoadRouteDialogHeader';
import LoadRouteOverview from '../../../../LoadRouteOverview';
import LoadRouteNavigation from '../../../../LoadRouteNavigation';
import { growFromTopStyle } from '../../../../../../../utils/utility';
import AisinRouteData from '../../../../../../../models/dataStructures/Aisin/AisinRouteData';


const useStyles = makeStyles({
  root: {
    flex: 1,
    overflowY: 'auto' as 'auto',
  },
});

interface IRouteGuidance {
  closeHandler: () => void;
  routeData: AisinRouteData;
  showGuidance: boolean;
  mapSlidingAnimation: boolean;
  setGuidanceSlidingAnimation: Dispatch<SetStateAction<boolean>>;
  setShowGuidance: Dispatch<SetStateAction<boolean>>;
  showGuidanceHandler: (setShowGuidance: Dispatch<SetStateAction<boolean>>,
                        guidanceState: boolean,
                        setAnimation: Dispatch<SetStateAction<boolean>>) => () => void;
  setAnimationHandler: (setAnimation: Dispatch<SetStateAction<boolean>>, animationState: boolean) => () => void;
}

const RouteGuidanceMobile = observer(({
                               closeHandler, routeData, showGuidance, mapSlidingAnimation, setGuidanceSlidingAnimation,
                               setShowGuidance, showGuidanceHandler, setAnimationHandler,
                             }: IRouteGuidance) => {
  const classes = useStyles();

  return (
    <Grid container direction='column'>
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
                  buttonClickAction={showGuidanceHandler(setShowGuidance, false, setGuidanceSlidingAnimation)}
                  buttonText='Show Map'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container justify='center'>
          <Grid item xs={12} sm={8} md={6}>
            <Grow
              in={showGuidance && !mapSlidingAnimation}
              style={growFromTopStyle}
              onExited={setAnimationHandler(setGuidanceSlidingAnimation, false)}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <LoadRouteNavigation routeData={routeData} />
              </div>
            </Grow>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
});

export default RouteGuidanceMobile;
