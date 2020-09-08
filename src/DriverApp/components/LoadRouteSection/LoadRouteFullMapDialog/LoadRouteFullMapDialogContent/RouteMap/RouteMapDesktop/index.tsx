import React, { memo } from 'react';
import useResizeObserver from 'use-resize-observer';
import { Grid, Grow, makeStyles } from '@material-ui/core';
import { growFromTopStyle } from '../../../../../../../utils/utility';
import AisinDirectionsRender from '../../../../../Maps/AisinDirectionsRender';
import AisinRouteData from '../../../../../../../models/dataStructures/Aisin/AisinRouteData';


const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  flexStretch: {
    flex: 1,
  },
});

interface IRouteMapDesktopOwnProps {
  dialogEntered: boolean;
  routeData: AisinRouteData;
}

type IRouteMapDesktopProps = IRouteMapDesktopOwnProps;

const RouteMapDesktop = memo(({ routeData, dialogEntered }: IRouteMapDesktopProps) => {
  const classes = useStyles();
  const [ref, width, height] = useResizeObserver();

  return (
    <Grid container direction='column' className={classes.root}>
      <div className={classes.flexStretch} ref={ref}>
        <Grow
          in={dialogEntered}
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
  );
});

export default RouteMapDesktop;
