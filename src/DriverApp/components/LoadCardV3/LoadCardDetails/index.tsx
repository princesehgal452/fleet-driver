import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Box } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import LoadCardInfoColumn from '../LoadCardInfoColumn';
import ActiveLoads from '../../../../assets/images/png/ActiveLoads.png';


interface ILoadCardDetails {
  freightType?: string;
  weightWithUnits?: string;
  shippingNotes?: string;
}

const LoadCardDetails = observer(({ freightType, weightWithUnits, shippingNotes }: ILoadCardDetails) => (
  <Grid container spacing={1}>
    <Grid item xs={12}>
      <Box fontSize={12} fontWeight={500}>
        Load Details
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <img src={ActiveLoads} />
            </Grid>
            <Grid item xs={10}>
              <Grid container>
                <Grid item xs={6}>
                  <LoadCardInfoColumn title='Freight Type' value={freightType || '-'} />
                </Grid>
                <Grid item xs={6}>
                  <LoadCardInfoColumn title='Total Weight' value={weightWithUnits || '-'} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <img src={ActiveLoads} />
            </Grid>
            <Grid item xs={10}>
              <LoadCardInfoColumn
                title='Shipping Notes'
                value={shippingNotes || '-'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
));

export default LoadCardDetails;
