import React from 'react';
import { observer } from 'mobx-react';
import { Grid, LinearProgress } from '@material-ui/core';
import RouteGuidanceItem from './RouteGuidanceItem';
import AisinRouteData from '../../../../models/dataStructures/Aisin/AisinRouteData';


interface ILoadRouteNavigation {
  routeData: AisinRouteData;
  loading?: boolean;
}

const LoadRouteNavigation = observer(({ routeData }: ILoadRouteNavigation) => {
  const routeDataFirstIndex = 0;
  const routeDataLastIndex = routeData.routeGuidance && routeData.routeGuidance.length - 1;

  return (
    <Grid container>
      {routeData.loading
        ? <Grid item xs={12}><LinearProgress /></Grid>
        : (routeData.routeGuidance?.map(((routeGuidance, index) => (
          <RouteGuidanceItem
            key={routeGuidance.entry.coordinatesIndex}
            routeGuidance={routeGuidance}
            entryCoordinatesIndex={routeGuidance.entry.coordinatesIndex}
            exitCoordinatesIndex={routeGuidance.exit.coordinatesIndex}
            routeIndex={index}
            routeDataFirstIndex={routeDataFirstIndex}
            routeDataLastIndex={routeDataLastIndex}
          />
        ))))}
    </Grid>
  );
});

export default LoadRouteNavigation;
