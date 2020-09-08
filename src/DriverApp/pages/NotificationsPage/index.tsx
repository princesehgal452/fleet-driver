import React, { memo } from 'react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NotificationsHeader from '../../components/NotificationsHeader';
import NotificationsList from '../../components/NotificationsList';


const styles = (theme: Theme) => ({
  root: {
    // height: '100%',
  },
});

type INotificationsPage = WithStyles<typeof styles>;

const NotificationsPage = memo(({ classes }: INotificationsPage) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <NotificationsHeader />
    </Grid>
    <Grid item xs={12}>
      <NotificationsList />
    </Grid>
  </Grid>
));

export default withStyles(styles)(NotificationsPage);
