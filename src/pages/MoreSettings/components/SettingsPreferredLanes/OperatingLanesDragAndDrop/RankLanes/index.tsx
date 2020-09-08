import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SwapVert } from '@material-ui/icons';
import useStyles from './styles';

const RankLanes = memo(() => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md>
      <Grid container alignItems='center' wrap='nowrap'>
        <SwapVert color='disabled' className={classes.icon} />
        <Grid item>
          <Typography variant='body2' className={classes.info}>
            You can rank your lanes by most frequently operated, we will recommend shipments based on this.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default RankLanes;
