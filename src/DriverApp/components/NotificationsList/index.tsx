import React, { memo } from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Observer from '@researchgate/react-intersection-observer';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import NotificationsItem from './NotificationsItem';
import NotificationsListError from './NotificationsListError';
import NoNotifications from './NoNotifications';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';
import { INotificationData } from '../../../models/interfaces/shared/INotificationData';
import { ROUTES } from '../../../services/constants';


const styles = (theme: Theme) => ({
  noResultsOrError: {
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
  content: {
    padding: theme.spacing(1, 2),
  },
  unread: {
    backgroundColor: fade(theme.palette.primary.light, 0.2),
  },
});

const loadingNotificationsItemsMock = Array.from(Array(3), (x, index) => index + 1);

const LoadingMockNotification = withStyles(styles)(memo(({ classes }: WithStyles<typeof styles>) => {
  return (
    <>
      {loadingNotificationsItemsMock.map(dummyNotification => (
        <Grid item xs={12} sm={9} key={dummyNotification}>
          <Paper elevation={0}>
            <Grid item xs={12} className={classNames(classes.content)}>
              <NotificationsItem notification={new INotificationData()} loading />
            </Grid>
          </Paper>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      ))}
    </>
  );
}));

type INotificationsListProps = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class NotificationsList extends React.Component<INotificationsListProps> {
  componentDidMount() {
    const { driverAppStore } = this.props;
    const { notificationsStore: { results, downloadResults } } = driverAppStore as DriverAppStore;
    if (results.length === 0) {
      downloadResults();
    }
  }

  handleShowMore = (event: IntersectionObserverEntry) => {
    if (event.isIntersecting) {
      const { driverAppStore } = this.props;
      const { notificationsStore: { downloadResults, pagination: { page } } } = driverAppStore as DriverAppStore;
      downloadResults(page + 1);
    }
  };

  refreshNotifications = () => {
    const { driverAppStore } = this.props;
    const { notificationsStore: { refreshNotifications } } = driverAppStore as DriverAppStore;
    refreshNotifications();
  };

  routeToRALPage = () => {
    const { history } = this.props;
    history.push(`/${ROUTES.DRIVER_RAL}`);
  };

  render() {
    const { driverAppStore, classes } = this.props;
    const { notificationsStore: { results, loading, pagination, error } } = driverAppStore as DriverAppStore;
    return (
      <Grid container justify='center'>
        {error
          ? (
            <Grid item>
              <div className={classes.noResultsOrError}>
                <NotificationsListError refreshNotifications={this.refreshNotifications} />
              </div>
            </Grid>
          ) : (
            <>
              {!loading && (results.length === 0) && (
                <Grid item>
                  <div className={classes.noResultsOrError}>
                    <NoNotifications routeToRAL={this.routeToRALPage} />
                  </div>
                </Grid>
              )}
              {results.map(notification => (
                <Grid item xs={12} sm={9} key={notification.id}>
                  <Grid container>
                    <Paper elevation={0}>
                      <Grid
                        item
                        xs={12}
                        className={classNames(classes.content, { [classes.unread]: !notification.read })}
                      >
                        <NotificationsItem notification={notification} />
                      </Grid>
                    </Paper>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              {loading && (
                <LoadingMockNotification />
              )}
              {!loading && (pagination.page < pagination.totalPages) && (
                <Observer onChange={this.handleShowMore}>
                  <div>
                    <LoadingMockNotification />
                  </div>
                </Observer>
              )}
            </>
          )}
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(NotificationsList));
