import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Button, Fade, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: '1px 3px 7px 0px rgba(0,0,0,0.75)',
    backgroundColor: theme.palette.common.white,
    height: 40,
  },
  button: {
    borderRadius: 0,
    fontWeight: 300,
    height: '100%',
    '& .MuiButton-label': {
      paddingTop: 4,
    },
    '& span': {
      height: '100%',
    },
  },
}));

interface ILoadFilterAcceptCancelButtonsProps {
  show: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

const LoadFilterAcceptCancelButtons = ({ show, onAccept, onCancel }: ILoadFilterAcceptCancelButtonsProps) => {
  const classes = useStyles();

  const fadeStyle = useMemo(() => ({
    transitionDelay: '300ms',
  }), []);

  return (
    <Fade in={show} style={fadeStyle}>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Button fullWidth className={clsx(classes.button)} onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth className={clsx(classes.button)} onClick={onAccept} color='primary' variant='contained' disableElevation>
            Apply
          </Button>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default LoadFilterAcceptCancelButtons;
