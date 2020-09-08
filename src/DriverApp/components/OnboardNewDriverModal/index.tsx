import React, { ReactEventHandler } from 'react';
import random from 'lodash/random';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Odometer from 'react-odometerjs';
import { History } from 'history';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import FOTransitionUp from '../../../components/FOTransitionUp';
import FiberIcon from '@material-ui/icons/FiberManualRecord';

import 'odometer/themes/odometer-theme-minimal.css';
import './OnboardNewDriverModal.scss';
import { getAppContainer } from '../../../utils/utility';

const styles = (theme: Theme) => ({
  dialogContent: {
    paddingBottom: theme.spacing(2.5)
  },
  listItemIcon: {
    minWidth: 20
  },
  listItemIconBullet: {
    fontSize: 10
  }
});

interface IOnboardNewDriverModalOwnProps {
  showNewDriverDialog: boolean;
  dismissHandler: ReactEventHandler;
  history: History;
  redirectPath: string;
}

type IOnboardNewDriverModalProp = IOnboardNewDriverModalOwnProps & RouteComponentProps & WithStyles<typeof styles>;

interface IOnboardNewDriverModalState {
  odometer: number;
}

class OnboardNewDriverModal extends React.PureComponent<IOnboardNewDriverModalProp, IOnboardNewDriverModalState> {
  constructor(props: IOnboardNewDriverModalProp) {
    super(props);
    this.state = {
      odometer: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { showNewDriverDialog: showNewDriverDialogCurrent } = this.props;
    const { showNewDriverDialog: showNewDriverDialogPrev } = prevProps;
    if (!showNewDriverDialogPrev && showNewDriverDialogCurrent) {
      this.updateOdometer(random(517, 594));
    }
    if (!showNewDriverDialogCurrent && showNewDriverDialogPrev) {
      this.updateOdometer(0);
    }
  }

  updateOdometer = (value) => {
    setTimeout(() => {
      this.setState({
        odometer: value,
      });
    }, 50);
  };

  redirectToRegistrationPage = () => {
    const { history, redirectPath } = this.props;
    history.push({ pathname: '/driver/register/check', state: { to: redirectPath } });
  };

  render() {
    const { showNewDriverDialog, dismissHandler, classes } = this.props;
    const { odometer } = this.state;
    
    return (
      <Dialog
        className='OnboardNewDriverModal'
        open={showNewDriverDialog}
        onClose={dismissHandler}
        TransitionComponent={FOTransitionUp} container={getAppContainer}
      >
        <DialogContent className={classes.dialogContent}>
          <Grid container direction='column' alignItems='center'>
            <Grid item>
              <Typography variant='subtitle1' align='center'>
                Set up your account in under 2 minutes.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' color='primary' align='center'>
                There are over
              </Typography>
            </Grid>
            <br />
            <Grid item>
              <Odometer value={odometer} format='d' />
            </Grid>
            <br />
            <Grid item>
              <Typography variant='subtitle1' color='primary' align='center'>
                loads near you
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h6' align='center'>
                BigRoad Freight is free!
              </Typography>
            </Grid>
            <Grid item>
              <List>
                <ListItem dense className='listItem'>
                  <ListItemIcon className={classes.listItemIcon}>
                    <FiberIcon color='primary' className={classes.listItemIconBullet} />
                  </ListItemIcon>
                  <ListItemText secondary='Search Loads' />
                </ListItem>
                <ListItem dense className='listItem'>
                  <ListItemIcon className={classes.listItemIcon}>
                    <FiberIcon color='primary' className={classes.listItemIconBullet} />
                  </ListItemIcon>
                  <ListItemText secondary='Request Loads' />
                </ListItem>
                <ListItem dense className='listItem'>
                  <ListItemIcon className={classes.listItemIcon}>
                    <FiberIcon color='primary' className={classes.listItemIconBullet} />
                  </ListItemIcon>
                  <ListItemText secondary='Receive personalized load recommendations' />
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' onClick={this.redirectToRegistrationPage}>
                GET STARTED
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withRouter(withStyles(styles)(OnboardNewDriverModal));
