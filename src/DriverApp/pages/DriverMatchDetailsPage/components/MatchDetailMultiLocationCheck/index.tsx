import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CheckOrange from '../../../../../assets/images/check-orange.png';

import './MatchDetailMultiLocationCheck.scss';


export const MatchDetailMultiLocationCheck = ({ pickupQty, dropoffQty }) => (
  <Grid container className='multiple-drop'>
    <img src={CheckOrange} alt='check-orange' />
    <Typography variant='h6' className='location-text'>
      {`Pickups: ${pickupQty}, Dropoffs: ${dropoffQty}`}
    </Typography>
  </Grid>
);

MatchDetailMultiLocationCheck.propTypes = {
  pickupQty: PropTypes.number,
  dropoffQty: PropTypes.number,
};

export default MatchDetailMultiLocationCheck;
