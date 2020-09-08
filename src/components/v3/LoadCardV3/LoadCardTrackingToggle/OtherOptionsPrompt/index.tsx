import React from 'react';
import { Grid, Typography, Box, Chip } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import clsx from 'clsx';
import { TrackingSessionStatus, TrackingTripStatus } from 'services/constants';
import MovingTruck from 'assets/images/png/MovingTruck.png';
import useStyles from './styles';

interface IOtherOptionsPromptOwnProps {
  statusChangeHandler: (newStatus: TrackingTripStatus) => () => Promise<void>;
  handleClose: (flag: boolean) => () => void;
}

type IOtherOptionsPromptProps = IOtherOptionsPromptOwnProps;

const OtherOptionsPrompt = ({ statusChangeHandler, handleClose }: IOtherOptionsPromptProps) => {
  const classes = useStyles();

  const RenderTrackingRadio = () => (
    Object.keys(TrackingSessionStatus).map((key) => (
      <Grid item>
        <Chip
          className={clsx(classes.chip, {
            [classes.delayedChip]: key === 'DELAYED',
          })}
          key={key}
          label={TrackingSessionStatus[key]}
          variant='outlined'
          clickable
          onClick={statusChangeHandler(key as TrackingTripStatus)}
        />
      </Grid>
    ))
  );

  return (
    <Box p={2}>
      <Box mb={2}>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='subtitle2'>
              OTHER OPTIONS
            </Typography>
          </Grid>
          <Grid item>
            <CloseOutlinedIcon fontSize='small' onClick={handleClose(false)} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={1} alignItems='flex-end'>
        {RenderTrackingRadio()}
        <Grid item>
          <img src={MovingTruck} alt='Moving truck' />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OtherOptionsPrompt;
