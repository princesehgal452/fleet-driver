import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import NoSessions from 'assets/images/png/CurrentLoadEmpty.png';


interface ITrackingNoSessionsProps {
  noSessionText: string;
}

const TrackingNoSessions = ({ noSessionText }: ITrackingNoSessionsProps) => (
  <Grid container direction='column' alignItems='center' spacing={3}>
    <Grid item>
      <img src={NoSessions} alt='No Sessions' />
    </Grid>
    <Grid item>
      <Typography variant='h6' align='center'>
        {noSessionText}
      </Typography>
    </Grid>
  </Grid>
);

export default TrackingNoSessions;
