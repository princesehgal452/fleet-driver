import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ILoadAddress } from '../../../../models/interfaces/shared/ILoadAddress';


const useStyles = makeStyles((theme: Theme) => ({
  typography: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: 400,
  },
}));

interface ILoadCardDatesProps {
  pickup?: ILoadAddress;
  dropoff?: ILoadAddress;
  loading?: boolean;
}

const LoadCardDates = observer(({ pickup, dropoff, loading }: ILoadCardDatesProps) => {
  const classes = useStyles();
  const momentFormat = useCallback((date) => moment(date).format('MMM D, h:mm A'), []);

  const getFormattedDate = useCallback((date: Moment) => {
    if ((date instanceof moment)) {
      return moment(date).isValid()
        ? moment(date).format('MMM D, Y')
        : 'Pending';
    }
    if ((date === undefined) || !(date instanceof Date)) {
      return 'N/A';
    }
    return momentFormat(date);
  }, []);

  const pickupDate = useMemo(() => {
    if (pickup?.startDateTime) {
      return getFormattedDate(pickup.startDateTime);
    }
    return 'N/A';
  }, [pickup]);

  const dropoffDate = useMemo(() => {
    if (dropoff?.startDateTime) {
      return getFormattedDate(dropoff.startDateTime);
    }
    return 'N/A';
  }, [dropoff]);

  if (loading) {
    return (
      <div>
        <Typography variant='subtitle2' display='inline' className={classes.typography}>
          <Skeleton width={40} />
        </Typography>
        <Typography variant='subtitle2' display='inline' className={classes.typography}>
          <Skeleton width={40} />
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant='subtitle2' display='inline' className={classes.typography}>
        Pickup date {pickupDate}
      </Typography>
      <Typography variant='subtitle2' display='inline' className={classes.typography}>&nbsp;&nbsp;|&nbsp;&nbsp;</Typography>
      <Typography variant='subtitle2' display='inline' className={classes.typography}>
        Drop-off on {dropoffDate}
      </Typography>
    </div>
  );
});

export default LoadCardDates;
