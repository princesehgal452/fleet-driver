import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import FOGrid from '../../../../../components/FOGrid';
import TrackingSession from '../../../../../models/dataStructures/TrackingSession';
import TrackingCardStatusDialogContent from './TrackingCardStatusDialogContent';
import { TrackingSessionStatus } from '../../../../../services/constants';
import FOBottomSheet from '../../../../../components/FOBottomSheet';


const useStyles = makeStyles((theme: Theme) => ({
  statusText: {
    fontSize: theme.typography.pxToRem(15),
    textTransform: 'uppercase',
  },
}));

interface ITrackingCardStatusProps {
  trackingSession: TrackingSession;
}

const TrackingCardStatus = observer(({ trackingSession }: ITrackingCardStatusProps) => {
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);

  const dialogCloseHandler = useCallback(() => !trackingSession.loading && setShowDialog(false), []);
  const dialogOpenHandler = useCallback(() => setShowDialog(true), []);

  const statusChangeHandler = useCallback((newStatus) => async () => {
    try {
      await trackingSession.updateTrackingTripStatus(newStatus);
      dialogCloseHandler();
    } catch (e) {
    }
  }, [trackingSession.details.tripStatus]);

  const { details } = trackingSession;
  return (
    <FOGrid justify='space-between' alignItems='center'>
      <Grid item xs={6}>
        <Typography variant='h6' className={classes.statusText}>
          {`Status: ${TrackingSessionStatus[details.tripStatus]}`}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={dialogOpenHandler} fullWidth color='primary' variant='contained' disableElevation>
          Update Status
        </Button>
      </Grid>
      <FOBottomSheet open={showDialog} closeHandler={dialogCloseHandler}>
        <TrackingCardStatusDialogContent
          trackingSession={trackingSession}
          statusChangeHandler={statusChangeHandler}
          dialogCloseHandler={dialogCloseHandler}
        />
      </FOBottomSheet>
    </FOGrid>
  );
});

export default TrackingCardStatus;
