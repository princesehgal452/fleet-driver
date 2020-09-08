import React from 'react';
import { observer } from 'mobx-react';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FODistance from '../../../../components/FODistance';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(12)
  },
}));

interface ILoadCardDistanceDeadheadProps {
  distanceInMiles?: string;
  distanceInKilometers?: number;
  deadhead?: string;
  loading?: boolean;
}

const LoadCardDistanceDeadhead = observer(({ loading, distanceInMiles, distanceInKilometers, deadhead }: ILoadCardDistanceDeadheadProps) => {
  const classes = useStyles();

  if (loading) {
    return (
      <Typography variant='subtitle2'>
        <Skeleton width={200} />
      </Typography>
    );
  }

  if (!distanceInMiles && !distanceInKilometers) {
    return null;
  }

  return (
    <Typography variant='subtitle2' color='primary' className={classes.root}>
      Total distance:
      {' '}
      {distanceInMiles}
      {' '}
      or
      {' '}
      {distanceInKilometers && (
        <FODistance distance={distanceInKilometers} unit='km' />
      )}
    </Typography>
  );
});

export default LoadCardDistanceDeadhead;
