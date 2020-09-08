import React, { memo } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import NewReleases from '@material-ui/icons/NewReleases';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { notificationTypes } from '../../../../../services/constants';
import { INotificationData } from '../../../../../models/interfaces/shared/INotificationData';


const styles = (theme: Theme) => ({
  root: {
    border: '1px solid',
  },
});

interface INotificationsItemIconOwnProps {
  notification: INotificationData;
  loading?: boolean;
}

type NotificationsItemIconProps = INotificationsItemIconOwnProps & WithStyles<typeof styles>;

const NotificationsItemIcon = memo(({ notification: { type }, loading, classes }
                                        : NotificationsItemIconProps) => {
  if (loading) {
    return (
      <Skeleton variant='circle' width={50} height={50} />
    );
  }
  switch (type) {
    case notificationTypes.USER_CONFIRMED_MATCH:
      return (
        <IconButton className={classes.root}>
          <Done />
        </IconButton>
      );
    case notificationTypes.USER_DECLINED_MATCH:
      return (
        <IconButton className={classes.root}>
          <ThumbDown />
        </IconButton>
      );
    case notificationTypes.RAL_FOUND_MATCH:
      return (
        <IconButton className={classes.root}>
          <NewReleases />
        </IconButton>
      );
  }
});

export default withStyles(styles)(NotificationsItemIcon);
