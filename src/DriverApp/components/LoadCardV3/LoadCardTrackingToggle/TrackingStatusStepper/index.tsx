import React from 'react';
import { Stepper, Step, StepLabel, Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { TrackingSessionStatus } from '../../../../../services/constants';

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    fontSize: theme.typography.pxToRem(14),
    borderRadius: 8,
    borderColor: theme.palette.primary.main,
  },
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
  },
  circleIconRoot: {
    color: '#BDBDBD',
    display: 'flex',
    height: 22,
  },
  circleIcon: {
    marginTop: '5px',
    fontSize: theme.typography.pxToRem(12),
  },
  circleIconActive: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(20),
    zIndex: 1,
  },
  circleIconCompleted: {
    color: theme.palette.primary.main,
    background: 'rgba(49, 185, 88, 0.25)',
    borderRadius: '50%',
    boxShadow: '0px 0px 2px 4px rgba(49,185,88,0.25)',
    MozBoxShadow: '0px 0px 2px 4px rgba(49,185,88,0.25)',
    WebkitBoxShadow: '0px 0px 2px 4px rgba(49,185,88,0.25)',
    zIndex: 1,
  },
  stepRoot: {
    '& .MuiStepLabel-label': {
      marginTop: theme.spacing(1),
      fontSize: theme.typography.pxToRem(8),
      textTransform: 'uppercase',
      color: '#A5A5A5',
      '&.MuiStepLabel-active': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiStepConnector-alternativeLabel': {
      top: '10px',
      left: 'calc(-50% + 5px)',
      right: 'calc(50% + 5px)',
    },
    '& .MuiStepConnector-lineHorizontal': {
      borderWidth: '2px',
    },
    '& .MuiStepConnector-completed': {
      '& .MuiStepConnector-lineHorizontal': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiStepConnector-active': {
      '& .MuiStepConnector-lineHorizontal': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

function StepIcon(props: { active: boolean; completed: boolean }) {
  const classes = useStyles();
  const { active, completed } = props;
  return (
    <div className={classes.circleIconRoot}>
      {active ? <CheckCircleIcon className={classes.circleIconActive} /> : <FiberManualRecordIcon className={clsx(classes.circleIcon, { [classes.circleIconCompleted]: completed })} />}
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
