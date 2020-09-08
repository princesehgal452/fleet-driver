import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import FOButtonTransparent from '../../../../components/Buttons/FOButtonTransparent';

import './SubmitClearLocation.scss';


class SubmitClearLocationComponent extends React.PureComponent {
  static propTypes = {
    clearValues: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    loading: PropTypes.bool,
    buttonLabel: PropTypes.string,
  };

  render() {
    const {
      clearValues, pristine, submitting, loading, buttonLabel,
    } = this.props;
    const disabled = pristine || submitting || loading;
    return (
      <Grid container className='submitClearLocation'>
        <Grid item xs={3}>
          <FOButtonTransparent
            className={`${!disabled && 'submitClearLocation__clearButton'}`}
            disabled={disabled}
            onClick={clearValues}
            fullWidth
          >
            Reset
          </FOButtonTransparent>
        </Grid>
        <Grid item xs={9}>
          <Button color='primary' variant='contained' fullWidth disabled={submitting || loading} type='submit'>
            {buttonLabel || 'Search'}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export const SubmitClearLocation = SubmitClearLocationComponent;
export default SubmitClearLocation;
