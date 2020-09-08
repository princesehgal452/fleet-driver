import React, { memo } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import FTLogo from '../../assets/images/png/FTLogo.png';


const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  logo: {
    height: 150,
    animation: `$splash 1.5s infinite`,
  },
  '@keyframes splash': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});

const FOGeotabSplash = memo(() => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} direction='column' alignItems='center' justify='center'>
      <Grid item>
        <img src={FTLogo} alt='Logo' className={classes.logo} />
      </Grid>
    </Grid>
  );
});

export default FOGeotabSplash;
