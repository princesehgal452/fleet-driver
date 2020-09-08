import React from 'react';
import { Grid } from '@material-ui/core';
import { LocationOn, SwapHoriz, SyncAlt } from '@material-ui/icons';
import { WrappedFieldProps } from 'redux-form';
import DistanceFilterChip from './DistanceFilterChip';


interface IProps {
  invertColors?: boolean;
}

type IDistanceFiltersProps = WrappedFieldProps & IProps;

const DistanceFilters = ({ input, invertColors }: IDistanceFiltersProps) => {
  return (
    <Grid container spacing={1} justify='center'>
      <Grid container item xs sm={3} md={2} justify='center'>
        <DistanceFilterChip
          label='Local'
          value='LocalHaul'
          icon={<LocationOn />}
          input={input}
          invertColors={invertColors}
        />
      </Grid>
      <Grid container item xs sm={3} md={2} justify='center'>
        <DistanceFilterChip
          label='Short'
          value='ShortHaul'
          icon={<SwapHoriz />}
          input={input}
          invertColors={invertColors}
        />
      </Grid>
      <Grid container item xs sm={3} md={2} justify='center'>
        <DistanceFilterChip
          label='Long'
          value='LongHaul'
          icon={<SyncAlt />}
          input={input}
          invertColors={invertColors}
        />
      </Grid>
    </Grid>
  );
};

export default DistanceFilters;
