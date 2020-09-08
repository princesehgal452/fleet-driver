import React from 'react';
import moment from 'moment';
import { Skeleton } from '@material-ui/lab';
import { History } from 'history';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NotificationsItemIcon from './NotificationsItemIcon';
import NotificationsItemMessage from './NotificationsItemMessage';
import Match from '../../../../models/dataStructures/Match';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../store/DriverAppStore';
import { NotificationsStore } from '../../../store/NotificationsStore';
import { INotificationData } from '../../../../models/interfaces/shared/INotificationData';


const styles = (theme: Theme) => ({
  root: {
    cursor: 'pointer',
  },
  time: {
    color: theme.palette.grey['500'],
  },
});

const routeToLoad = (history: History, setSelectedMatch: ((match: Match) => void),
                     { updateNotification }: NotificationsStore,
                     notification: INotificationData) =>
  () => {
    const { data: { match } } = notification;
    setSelectedMatch(new Match(match));
    history.push(`/driver/match/${match.matchId}/detail`);
    if (!notification.read) {
      updateNotification(notification);
    }
  };

interface INotificationsItemOwnProps {
  notification: INotificationData;
  loading?: boolean;
}

type INotificationsItemProps =
  INotificationsItemOwnProps & IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

const NotificationsItem = inject('driverAppStore')(observer((
  { driverAppStore, notification, history, loading, classes }: INotificationsItemProps) => {
  const { notificationsStore, matchStore: { setSelectedMatch } } = driverAppStore as DriverAppStore;
  return (
    <Grid
      container
      alignItems='center'
      className={classes.root}
      onClick={routeToLoad(history, setSelectedMatch, notificationsStore, notification)}
    >
      <Grid item xs={2}>
        <NotificationsItemIcon notification={notification} loading={loading} />
      </Grid>
      <Grid item xs>
        <Grid container justify='flex-end'>
          <Grid item xs={12}>
            <NotificationsItemMessage notification={notification} loading={loading} />
          </Grid>
          <Grid item>
            <Typography className={classes.time} variant='caption' color='inherit'>
              {loading ? <Skeleton width={80} /> : moment(notification.updatedAt).fromNow()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}));

export default withRouter(withStyles(styles)(NotificationsItem));
