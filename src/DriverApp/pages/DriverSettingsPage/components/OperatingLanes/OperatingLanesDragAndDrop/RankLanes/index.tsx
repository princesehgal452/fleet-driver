import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SwapVert } from '@material-ui/icons';


const RankLanes = memo(() => (
  <Grid item xs={12} md>
    <Grid container alignItems='center' wrap='nowrap'>
      <SwapVert color='disabled' />
      <Grid item>
        <Typography variant='caption'>
          You can rank your lanes by most frequently operated, we will recommend shipments
          based
          on this.
        </Typography>
      </Grid>
    </Grid>
  </Grid>
));

export default RankLanes;
