import React, { memo, useCallback, useState } from 'react';
import { Button, Grid, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';
import Load from 'models/dataStructures/Load';
import RequestACallForm from './RequestACallForm';


const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '@media (max-width:320px)': {
      fontSize: theme.typography.pxToRem(9.5),
    },
  },
}));

interface ILoadCardButtonsProps {
  load?: Load;
  loading?: boolean;
}

const LoadCardButtons = memo(({ loading, load }: ILoadCardButtonsProps) => {
  const classes = useStyles();
  const [isRequestCall, setIsRequestCall] = useState(false);
  
  const toggleRequestCall = useCallback((flag) => (e) => {
    e?.stopPropagation()
    setIsRequestCall(flag)
  })
  
  return (
    <Grid container wrap='nowrap' spacing={1}>
      <Grid item xs={6}>
        {loading
          ? (
            <Skeleton width={50} height={40} variant='rect' />
          ) : (
            <Button fullWidth variant='outlined' color='primary' size='small' className={classes.button} onClick={toggleRequestCall(true)}>
              Request
              <br />
              Call
            </Button>
          )}
      </Grid>
      <Grid item xs={6}>
        {loading
          ? (
            <Skeleton width={50} height={40} variant='rect' />
          ) : (
            <Button fullWidth variant='contained' color='primary' size='small' disableElevation className={classes.button}>
              Book
              <br />
              Now
            </Button>
          )}
      </Grid>

      <FOSwipeableBottomDrawer
        maxHeight={470}
        isDrawerOpen={isRequestCall}
        variant='temporary'
      >
        <RequestACallForm cancelRequestCall={toggleRequestCall} load={load}/>
      </FOSwipeableBottomDrawer>
    </Grid>
  );
});

export default LoadCardButtons;
