import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Grid, Typography } from '@material-ui/core';
import FOGrid from '../../../components/FOGrid';


@observer
class EmphasizedDates extends React.Component {
  static propTypes = {
    availableDate: PropTypes.string,
    expiresOn: PropTypes.string,
  };

  render() {
    const { availableDate, expiresOn } = this.props;
    return (
      <FOGrid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='subtitle1'>
                Available Date
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='subtitle1'>
                Expires On
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='subtitle2'>
                {availableDate || '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='subtitle2'>
                {expiresOn || '-'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </FOGrid>
    );
  }
}

export default EmphasizedDates;
