import React, { memo, useState, useCallback, useEffect } from 'react';
import { Grid, Box, Switch, Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelActions, Divider, ButtonGroup } from '@material-ui/core';

import { TrackingSessionStatus } from 'services/constants';
import TrackingSession from 'models/dataStructures/TrackingSession';
import Load from 'models/dataStructures/Load';

import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';

import OtherOptionsPrompt from './OtherOptionsPrompt';
import TrackingStatusStepper from './TrackingStatusStepper';

import useStyles from './styles';

interface ILoadCardTrackingToggleProps {
  load?: Load;
  trackingSession?: TrackingSession;
}

const LoadCardTrackingToggle = memo(({ load, trackingSession }: ILoadCardTrackingToggleProps) => {
  const classes = useStyles();
  const trackingStatusKeys = Object.keys(TrackingSessionStatus);
  const [checked, setChecked] = useState(Boolean(load?.anyMatchAutomatedTrackingAssigned || trackingSession));
  const [viewTrackingOptions, setViewTrackingOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const currentStep = trackingSession?.details.tripStatus;
    if (currentStep) {
      const currentStepIndex = trackingStatusKeys.indexOf(currentStep);
      const newStepIndex = (currentStepIndex + 1) < trackingStatusKeys.length ? (currentStepIndex + 1) : currentStepIndex;
      setActiveStepIndex(newStepIndex);
    }
  }, [activeStepIndex]);

  /**
   * ADD onChange if required to toggle on/off tracking. Currently tracking switch is only set to show value and not update it.
    const toggleChecked = useCallback(() => {
      setChecked((prev) => !prev);
    }, []);
   */

  const viewTracking = useCallback((flag: boolean) => (e) => {
    setViewTrackingOptions(flag);
  }, []);

  const viewTrackingMore = useCallback((flag: boolean) => (e) => {
    setShowMoreOptions(flag);
  }, []);

  const statusChangeHandler = useCallback((newStatus) => async (e) => {
    await trackingSession?.updateTrackingTripStatus(newStatus);
    viewTrackingMore(false)(e);
  }, [trackingSession?.details?.tripStatus]);
  return (
    <>
      <ExpansionPanel expanded={viewTrackingOptions} className={classes.root} elevation={0}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          className={classes.gridContainer}
        >
          <Grid item xs={8}>
            <Box fontSize={12} fontWeight={500}>
              Tracking
              <Switch color='primary' size='small' checked={checked} />
            </Box>
          </Grid>
          {
            checked && (
            <Grid item xs={4}>
              <Button
                fullWidth
                size='small'
                onClick={viewTracking(!viewTrackingOptions)}
                className={classes.viewTrackingBtn}
                variant='outlined'
                color='secondary'
                disableElevation
              >
                View Tracking
              </Button>
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
            <Button
              color='primary'
              variant='contained'
              className={classes.actionButton}
              disableElevation
              onClick={statusChangeHandler(trackingStatusKeys[activeStepIndex])}
            >
              {`Confirm ${TrackingSessionStatus[trackingStatusKeys[activeStepIndex]]}`}
            </Button>
          </ButtonGroup>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <FOSwipeableBottomDrawer maxHeight='auto' isDrawerOpen={showMoreOptions} variant='temporary'>
        <OtherOptionsPrompt statusChangeHandler={statusChangeHandler} handleClose={viewTrackingMore} />
      </FOSwipeableBottomDrawer>
    </>
  );
});

export default LoadCardTrackingToggle;
