import React, { memo, useState, useCallback, useEffect } from 'react';
import { Grid, Box, Switch, Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelActions, Divider, ButtonGroup } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';
import TrackingSession from 'models/dataStructures/TrackingSession';
import { TrackingSessionStatus } from 'services/constants';
import OtherOptionsPrompt from './OtherOptionsPrompt';
import TrackingStatusStepper from './TrackingStatusStepper';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0,
    margin: '0 !important',
    marginTop: '4px !important',
    '&:before': {
      opacity: '0 !important',
    },
  },
  accordianActions: {
    padding: 0,
  },
  accordianDescription: {
    padding: theme.spacing(1),
  },
  gridContainer: {
    padding: theme.spacing(1),
  },
  actionButton: {
    borderRadius: 0,
    borderColor: 'transparent !important',
    textTransform: 'capitalize',
    fontSize: theme.typography.pxToRem(10),
  },
  viewTrackingBtn: {
    background: '#EDEDED',
    textTransform: 'capitalize',
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

interface ILoadCardTrackingToggleProps {
  trackingDetailsButtonText?: string;
  trackingSession?: TrackingSession;
}

const LoadCardTrackingToggle = memo(({ trackingDetailsButtonText, trackingSession }: ILoadCardTrackingToggleProps) => {
  const classes = useStyles();
  const trackingStatusKeys = Object.keys(TrackingSessionStatus);
  const [checked, setChecked] = useState(false);
  const [viewTrackingOptions, setViewTrackingOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [activeStepIndex, setactiveStepIndex] = useState(0);

  useEffect(() => {
    const currentStep = trackingSession?.details.tripStatus;
    if (currentStep) {
      const currentStepIndex = trackingStatusKeys.indexOf(currentStep);
      const newStepIndex = (currentStepIndex + 1) < trackingStatusKeys.length ? (currentStepIndex + 1) : currentStepIndex;
      setactiveStepIndex(newStepIndex);
    }
  }, [activeStepIndex]);

  const toggleChecked = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  const viewTracking = useCallback((flag: boolean) => () => {
    setViewTrackingOptions(flag);
  }, []);

  const viewTrackingMore = useCallback((flag: boolean) => () => {
    setShowMoreOptions(flag);
  }, []);

  const statusChangeHandler = useCallback((newStatus) => async () => {
    await trackingSession?.updateTrackingTripStatus(newStatus);
    viewTrackingMore(false)();
  }, [trackingSession?.details?.tripStatus]);

  return (
    <>
      <ExpansionPanel expanded={viewTrackingOptions} className={classes.root} elevation={0}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          spacing={1}
          className={classes.gridContainer}
        >
          <Grid item xs={8}>
            <Box fontSize={12} fontWeight={500}>
              Tracking
              <Switch color='primary' size='small' checked={checked} onChange={toggleChecked} />
            </Box>
          </Grid>
          {
            trackingDetailsButtonText && (
            <Grid item xs={4}>
              <Button fullWidth size='small' onClick={viewTracking(true)} className={classes.viewTrackingBtn} variant='contained' disableElevation>{trackingDetailsButtonText}</Button>
            </Grid>
            )
          }
        </Grid>
        <ExpansionPanelDetails className={classes.accordianDescription}>
          <TrackingStatusStepper activeStep={activeStepIndex} />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions className={classes.accordianActions}>
          <ButtonGroup fullWidth size='large'>
            <Button color='primary' className={classes.actionButton} disableElevation onClick={viewTrackingMore(true)}>
              Other Options
            </Button>
            <Button color='primary' variant='contained' className={classes.actionButton} disableElevation onClick={statusChangeHandler(trackingStatusKeys[activeStepIndex])}>
              {`Confirm ${TrackingSessionStatus[trackingStatusKeys[activeStepIndex]]}`}
            </Button>
          </ButtonGroup>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <FOSwipeableBottomDrawer maxHeight={160} isDrawerOpen={showMoreOptions} variant='temporary'>
        <OtherOptionsPrompt statusChangeHandler={statusChangeHandler} handleClose={viewTrackingMore} />
      </FOSwipeableBottomDrawer>
    </>
  );
});

export default LoadCardTrackingToggle;
