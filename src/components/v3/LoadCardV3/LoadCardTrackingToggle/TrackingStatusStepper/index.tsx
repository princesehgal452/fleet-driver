import React from 'react';
import clsx from 'clsx';
import { Stepper, Step, StepLabel, Box, Grid } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { TrackingSessionStatus } from 'services/constants';

import useStyles from './styles';

function StepIcon(props: { active: boolean; completed: boolean }) {
  const classes = useStyles();
  const { active, completed } = props;
  return (
    <div className={classes.circleIconRoot}>
      {
        active
          ? <CheckCircleIcon className={classes.circleIconActive} />
          : <FiberManualRecordIcon className={clsx(classes.circleIcon, { [classes.circleIconCompleted]: completed })} />
      }
    </div>
  );
}
interface ITrackingStatusStepperOwnProps {
  activeStep: number;
}

type ITrackingStatusStepperProps = ITrackingStatusStepperOwnProps;

const TrackingStatusStepper = ({ activeStep }: ITrackingStatusStepperProps) => {
  const classes = useStyles();
  // Do not show Delayed in stepper for now
  const trackingStatusKeys = Object.keys(TrackingSessionStatus).filter((key) => key !== 'DELAYED');

  return (
    <Grid direction='column' container>
      <Grid item>
        <Box fontSize={12} fontWeight={500} display='block'>
          Tracking Options
        </Box>
      </Grid>
      <Grid item>
        <Stepper alternativeLabel activeStep={activeStep}>
          {trackingStatusKeys.map((key, index) => (
            <Step key={index} className={classes.stepRoot}>
              <StepLabel StepIconComponent={StepIcon}>{TrackingSessionStatus[key]}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
};

export default TrackingStatusStepper;
