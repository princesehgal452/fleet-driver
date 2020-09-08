import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { AisinGuidanceCode, AisinRouteType } from '../../../../../services/constants';
import AisinRouteGuidanceInfo from '../../../../../models/dataStructures/Aisin/AisinRouteData/AisinRouteGuidanceInfo';
import FOGrid from '../../../../../components/FOGrid';
import FODistance from '../../../../../components/FODistance';
import { IAisinEntryExitRouteDirectionsInfo } from '../../../../../models/interfaces/shared/IAisinEntryExitGuidance';


const routeTypeCopy = {
  [AisinRouteType.FREEWAY_CLASS_ROAD_1]: 'freeway',
  [AisinRouteType.FREEWAY_CLASS_ROAD_2]: 'freeway',
  [AisinRouteType.HIGHWAY_CLASS_ROAD]: 'highway',
  [AisinRouteType.THROUGHWAY_CLASS_ROAD]: 'throughway road',
  [AisinRouteType.LOCAL_CLASS_ROAD]: 'local road',
  [AisinRouteType.FRONTAGE_ROAD]: 'frontage street',
  [AisinRouteType.VERY_LOW_SPEED_ROAD]: 'very slow speed road',
  [AisinRouteType.PRIVATE_ROAD]: 'private road',
  [AisinRouteType.WALKWAY]: 'walkway',
  [AisinRouteType.NON_NAVIGABLE_ROAD]: 'non navigable road',
  [AisinRouteType.RERRY_ROAD]: 'ferry road',
  [AisinRouteType.CAR_TRAIN]: 'train road',
  [AisinRouteType.PUBLIC_VEHILE_ONLY_ROAD]: 'public vehicle only road',
  [AisinRouteType.CARPOOL_LANE]: 'carpool lane',
};

const guidanceCodeCopy = {
  [AisinGuidanceCode.STRAIGHT]: 'Keep going straight on',
  [AisinGuidanceCode.STRAIGHT_FORWARD]: 'Keep going forward on',
  [AisinGuidanceCode.SLIGHT_RIGHT]: 'Turn slight right onto',
  [AisinGuidanceCode.RIGHT]: 'Turn right onto',
  [AisinGuidanceCode.SHARP_RIGHT]: 'Make sharp right onto',
  [AisinGuidanceCode.U_TURN_RIGHT]: 'Make a right u-turn onto',
  [AisinGuidanceCode.BACK]: 'Go backwards on',
  [AisinGuidanceCode.U_TURN_LEFT]: 'Make a left u-turn onto',
  [AisinGuidanceCode.SHARP_LEFT]: 'Make sharp left onto',
  [AisinGuidanceCode.LEFT]: 'Turn left onto',
  [AisinGuidanceCode.SLIGHT_LEFT]: 'Turn slight left onto',
  [AisinGuidanceCode.SHARP_RIGHT_TOLL_ROUTE]: 'Make sharp right onto toll route',
  [AisinGuidanceCode.SHARP_LEFT_TOLL_ROUTE]: 'Make sharp left onto toll route',
  [AisinGuidanceCode.KEEP_RIGHT]: 'Keep right on',
  [AisinGuidanceCode.KEEP_LEFT]: 'Keep left on',
};

interface IRouteDirection {
  guidance: IAisinEntryExitRouteDirectionsInfo;
  streetName: string;
}

const RouteDirection = observer(({ guidance, streetName }: IRouteDirection) => (
  <Grid item xs={12}>
    <Typography variant='subtitle2'>
      {`${guidanceCodeCopy[guidance.guideCode]} ${streetName}`}
    </Typography>
  </Grid>
));

interface IRouteGuidanceItem {
  routeIndex: number;
  routeDataFirstIndex: number;
  routeDataLastIndex: number | undefined;
  routeGuidance: AisinRouteGuidanceInfo;
  entryCoordinatesIndex: number;
  exitCoordinatesIndex: number;
}

const RouteGuidanceItem = observer(({ routeGuidance, routeIndex, entryCoordinatesIndex, exitCoordinatesIndex, routeDataFirstIndex, routeDataLastIndex }: IRouteGuidanceItem) => {
  if (!routeGuidance.name) {
    return null;
  }
  return (
    <Grid item xs={12}>
      <Paper square>
        <FOGrid>
          {routeGuidance.entry.guidance && (
            <RouteDirection guidance={routeGuidance.entry.guidance} streetName={routeGuidance.name} />
          )}
          <Grid item xs={12}>
            <Typography variant='caption'>
              {`Continue on ${routeGuidance.name} for `}
              <FODistance distance={routeGuidance.routeGuideDistanceInMiles} />
            </Typography>
          </Grid>
          {(routeDataLastIndex === routeIndex) && (
            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                Reached destination
              </Typography>
            </Grid>
          )}
        </FOGrid>
      </Paper>
    </Grid>
  );
});

export default RouteGuidanceItem;
