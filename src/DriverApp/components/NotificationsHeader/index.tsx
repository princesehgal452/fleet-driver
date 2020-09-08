import React from 'react';
import { inject, observer } from 'mobx-react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import { DriverAppStore } from '../../store/DriverAppStore';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import classNames from 'classnames';


const styles = (theme: Theme) => ({
  rotate: {
    animation: `$rotate 400ms`,
  },
  '@keyframes rotate': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
});

type INotificationsHeaderProps = IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class NotificationsHeader extends React.Component<INotificationsHeaderProps> {
  state = {
    rotate: false,
  };

  refreshNotificationsHandler = () => {
    const { driverAppStore } = this.props;
    const { notificationsStore: { refreshNotifications } } = driverAppStore as DriverAppStore;
    refreshNotifications();
    this.setRotate(true)();
  };

  setRotate = (rotateState: boolean) => () => {
    this.setState({
      rotate: rotateState,
    });
  };

  render() {
    const { rotate } = this.state;
    const { classes, driverAppStore } = this.props;
    const { userStore: { hideTracking, trackedMatchID } } = driverAppStore as DriverAppStore;
    return (
      <FOAppBarPage
        pageTitle='Notifications'
        renderTracking={Boolean(trackedMatchID && !hideTracking)}
        showBackButton
        actionButtons={(
          <div onAnimationEnd={this.setRotate(false)}>
            <IconButton
              color='inherit'
              onClick={this.refreshNotificationsHandler}
              className={classNames({ [classes.rotate]: rotate })}
            >
              <Refresh />
            </IconButton>
          </div>)}
      />
    );
  }
}

export default withStyles(styles)(NotificationsHeader);
