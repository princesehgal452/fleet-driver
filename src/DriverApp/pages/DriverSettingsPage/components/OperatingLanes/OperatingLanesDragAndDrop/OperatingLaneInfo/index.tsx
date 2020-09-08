import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { ILaneAddress } from '../../../../../../../models/interfaces/shared/IOperatingLanes';
import { getLocationText } from '../../../../../../../utils/utility';


interface IOperatingLaneInfoProps {
  laneType: 'pickup' | 'dropoff';
  laneAddress: ILaneAddress;
}


const OperatingLaneInfo = memo(({ laneType, laneAddress: { city, state, country } }: IOperatingLaneInfoProps) => (
  <Grid item xs={12} md>
    <Grid container alignItems='center' wrap='nowrap'>
      {laneType === 'pickup' && (
        <ArrowDropUp color='primary' />
      )}
      {laneType === 'dropoff' && (
        <ArrowDropDown color='secondary' />
      )}
      <Grid item>
        <Typography variant='subtitle2'>
          {getLocationText(city, state, country)}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
));

export default OperatingLaneInfo;
