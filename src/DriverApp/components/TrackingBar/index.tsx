import React from 'react';
import { inject, observer } from 'mobx-react';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';
import { Grid, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed' as 'fixed',
    backgroundColor: theme.palette.secondary.main,
    marginLeft: -10,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  done: {
    color: theme.palette.primary.main,
  },
  containerHeight: {
    height: 20,
  },
  viewDetails: {
    cursor: 'pointer',
  },
}));

const routeToMatch = (matchId: string, history: History) => () => {
  history.push(`/driver/match/${matchId}/detail`);
};

const handleDoneClick = (setHideTracking: (state: boolean) => void) => () => {
  setHideTracking(true);
};

type ITrackingBarProps = IDriverAppStore & RouteComponentProps;

const TrackingBar = inject('driverAppStore')(observer(({ driverAppStore, history }: ITrackingBarProps) => {
  const { userStore: { trackedMatchID, setHideTracking, hideTracking } } = driverAppStore as DriverAppStore;
  const classes = useStyles();

  return (
    <>
      {trackedMatchID && (
        <>
          {!hideTracking && (
            <div className={classes.root}>
              <Grid container justify='space-between'>
                <Grid item onClick={routeToMatch(trackedMatchID, history)}>
                  Tracking has been initiated. <u className={classes.viewDetails}>View details.</u>
                </Grid>
                <Grid item onClick={handleDoneClick(setHideTracking)}>
                  <p className={classes.done}>Dismiss</p>
                </Grid>
              </Grid>
            </div>
          )}
          <div className={classes.containerHeight} />
        </>
      )}
    </>
  );
}));

export default withRouter(TrackingBar);
