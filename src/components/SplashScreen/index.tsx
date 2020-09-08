import React from 'react';
import Grid from '@material-ui/core/Grid';

import brfLogo from '../../assets/images/BigRoadFreight-Logo-StackedKnockout.png';

import './SplashScreen.scss';

const SplashScreen = () => (
  <Grid container direction='column' className='splashScreen' justify='center' alignItems='center'>
    <Grid item>
      <img src={brfLogo} alt='Bigroad Freight' />
    </Grid>
  </Grid>
);

export default SplashScreen;
