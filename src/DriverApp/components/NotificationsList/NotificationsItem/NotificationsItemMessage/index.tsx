import React, { memo } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { notificationTypes } from '../../../../../services/constants';
import { INotificationData } from '../../../../../models/interfaces/shared/INotificationData';


const styles = (theme: Theme) => ({
  root: {
    fontWeight: 'bold' as 'bold',
  },
});

interface INotificationsItemMessageOwnProps {
  notification: INotificationData;
  loading?: boolean;
}

type NotificationsItemMessageProps = INotificationsItemMessageOwnProps & WithStyles<typeof styles>;

const NotificationsItemMessage = memo((
  { notification: { type, postedBy: { displayName }, data: { match: { load } } }, loading, classes }
    : NotificationsItemMessageProps) => {
  if (loading) {
    return (
      <Typography variant='subtitle2'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Typography>
    );
  }
  switch (type) {
    case notificationTypes.USER_CONFIRMED_MATCH:
      return (
        <Typography variant='subtitle2'>
          <span className={classes.root}>{displayName}</span> has accepted the load
          <br />
          <span className={classes.root}>{` ${load.payload.tripDetails.pickupLocation}`}</span>
          {load.payload.tripDetails.dropoffs[0].dropoffLocation && (
            <> to <span className={classes.root}>{load.payload.tripDetails.dropoffs[0].dropoffLocation}</span></>
          )}
        </Typography>
      );
    case notificationTypes.USER_DECLINED_MATCH:
      return (
        <Typography variant='subtitle2'>
          <span className={classes.root}>{displayName}</span> has declined the load
          <br />
          <span className={classes.root}>{` ${load.payload.tripDetails.pickupLocation}`}</span>
          {load.payload.tripDetails.dropoffs[0].dropoffLocation && (
            <> to <span className={classes.root}>{load.payload.tripDetails.dropoffs[0].dropoffLocation}</span></>
          )}
        </Typography>
      );
    case notificationTypes.RAL_FOUND_MATCH:
      return (
        <Typography variant='subtitle2'>
          You have a new load match
          <br />
          <span className={classes.root}>{` ${load.payload.tripDetails.pickupLocation}`}</span>
          {load.payload.tripDetails.dropoffs[0].dropoffLocation && (
            <> to <span className={classes.root}>{load.payload.tripDetails.dropoffs[0].dropoffLocation}</span></>
          )}
        </Typography>
      );
  }
});

export default withStyles(styles)(NotificationsItemMessage);
