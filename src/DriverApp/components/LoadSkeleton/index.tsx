import React from 'react';
import { Grid, makeStyles, Theme, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
  skeletonContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const LoadSkeleton = () => {
  
    const classes = useStyles();

    return (
      <div>
        <Paper elevation={1} className={classes.skeletonContainer}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Skeleton variant='text' width='60%' />
              <Skeleton variant='text' width='40%' />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='80%' />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Skeleton variant='text' width='60%' />
              <Skeleton variant='text' width='40%' />
            </Grid>
          </Grid>
          <br />
          <Skeleton variant='rect' height={40} />
        </Paper>
      </div>
    );
}

export default LoadSkeleton;
