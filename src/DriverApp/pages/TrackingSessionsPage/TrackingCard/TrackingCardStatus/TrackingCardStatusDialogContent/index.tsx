import React from 'react';
import { observer } from 'mobx-react';
import { Button, Chip, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { TrackingSessionStatus, TrackingTripStatus } from '../../../../../../services/constants';
import TrackingSession from '../../../../../../models/dataStructures/TrackingSession';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    fontSize: theme.typography.pxToRem(17),
  },
}));

interface ITrackingCardStatusDialogContent {
  trackingSession: TrackingSession;
  statusChangeHandler: (newStatus: TrackingTripStatus) => () => Promise<void>;
  dialogCloseHandler: () => void;
}

const TrackingCardStatusDialogContent = observer(({ trackingSession, statusChangeHandler, dialogCloseHandler }: ITrackingCardStatusDialogContent) => {
  const classes = useStyles();

  return (
    <>
      <DialogTitle>
        Update Status
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.keys(TrackingSessionStatus).map((key) => (
            <Grid item>
              <Chip
                className={classes.chip}
                key={key}
                label={TrackingSessionStatus[key]}
                variant='outlined'
                clickable
                onClick={statusChangeHandler(key as TrackingTripStatus)}
                disabled={trackingSession.loading}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogCloseHandler} disabled={trackingSession.loading}>Cancel</Button>
      </DialogActions>
    </>
  );
});

export default TrackingCardStatusDialogContent;
