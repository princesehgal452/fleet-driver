import React from 'react';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import { ITheme } from 'theme/ITheme';

import FODistance from 'components/v3/FODistance';

interface ILoadCardDistanceProps {
  distanceInMiles?: string;
  distanceInKilometers?: number;
  loading?: boolean;
}

const LoadCardDistance = observer(({ loading, distanceInMiles, distanceInKilometers }: ILoadCardDistanceProps) => {
  const theme: ITheme = useTheme();

  if (loading) {
    return (
      <Skeleton width={200} />
    );
  }

  if (!distanceInMiles && !distanceInKilometers) {
    return null;
  }

  return (
    <Box fontSize={9} color={theme.palette.text.secondary}>
      Total distance:
      {' '}
      {distanceInMiles}
      {' '}
      or
      {' '}
      {distanceInKilometers && (
        <FODistance distance={distanceInKilometers} unit='km' />
      )}
    </Box>
  );
});

export default LoadCardDistance;
