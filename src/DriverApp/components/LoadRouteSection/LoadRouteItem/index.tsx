import React, { memo, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';
import { LocalShippingOutlined } from '@material-ui/icons';
import { AisinRouteSearchType } from '../../../../services/constants';
import AisinRouteData from '../../../../models/dataStructures/Aisin/AisinRouteData';
import FODistance from '../../../../components/FODistance';


const routeTypeCopy = {
  [AisinRouteSearchType.QUICK]: 'Quickest Route',
  [AisinRouteSearchType.SHORT]: 'Shortest Route',
  [AisinRouteSearchType.ALTERNATIVE]: 'Alternative Route',
};

const getRouteType = (routeSearchType: AisinRouteSearchType | null) => () => {
  if (!routeSearchType || !routeTypeCopy[routeSearchType]) {
    return 'Route Path';
  }
  return routeTypeCopy[routeSearchType];
};

interface IRenderTime {
  hours?: number;
  minutes?: number;
}

const RenderTime = memo(({ hours, minutes }: IRenderTime) => (
  hours || minutes ? (
    <>
      {hours ? `${hours}h` : null}
      {minutes && hours ? ' ' : null}
      {minutes ? `${minutes}min` : null}
    </>
  ) : (
    <>-</>
  )));

interface ILoadRouteItem {
  routeData?: AisinRouteData;
  loading?: boolean;
}

const LoadRouteItem = observer(({ loading, routeData }: ILoadRouteItem) => {
  const routeType = useMemo(getRouteType(routeData ? routeData.routeSearchType : null),
    [routeData ? routeData.routeSearchType : null]);

  return (
    <Grid container>
      <Grid container item xs spacing={1} wrap='nowrap'>
        <Grid item>{loading ? <Skeleton width={25} height={25} variant='circle' /> : <LocalShippingOutlined />}</Grid>
        <Grid container item xs>
          {routeData?.longestGuidedRoute?.name && (
            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                Via
                {' '}
                {routeData.longestGuidedRoute.name}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant='body2'>
              {loading ? <Skeleton width={130} /> : routeType}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={4}>
        <Grid item xs={12}>
          <Typography color='primary' variant='subtitle1' align='right'>
            {loading ? (
              <Skeleton />
            ) : (
              <RenderTime
                hours={routeData && routeData.turnaroundHours}
                minutes={routeData && routeData.turnaroundMinutes}
              />
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' align='right'>
            {loading ? (
              <Skeleton />
            ) : (
              <FODistance distance={routeData && routeData.routeDistanceInMiles} />
            )}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default LoadRouteItem;
