import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Box } from '@material-ui/core';
import FreightType from 'assets/images/png/loadCard/FreightType.png';
import Weight from 'assets/images/png/loadCard/Weight.png';
import Deadhead from 'assets/images/png/loadCard/Deadhead.png';
import Commodity from 'assets/images/png/loadCard/Commodity.png';
import Dimension from 'assets/images/png/loadCard/Dimension.png';
import ShippingNotes from 'assets/images/png/loadCard/ShippingNotes.png';

import LoadCardInfoColumn from '../LoadCardInfoColumn';


interface ILoadCardDetails {
  equipmentTypeFormatted?: string;
  freightType?: string;
  weightWithUnits?: string;
  shippingNotes?: string;
  deadhead?: string;
  dimensions?: string;
  careInstructions?: string;
  hazardous?: string;
}

const LoadCardDetails = observer(({
  equipmentTypeFormatted,
  freightType,
  weightWithUnits,
  shippingNotes,
  deadhead,
  dimensions,
  careInstructions,
  hazardous,
}: ILoadCardDetails) => {
  const RenderItems = (icon, title, value) => (
    <Grid container alignItems='center'>
      <Grid item>
        <Box mr={2}>
          <img src={icon} alt={title} />
        </Box>
      </Grid>
      <Grid item>
        <LoadCardInfoColumn title={title} value={value || '-'} />
      </Grid>
    </Grid>
  );
  const showDimensions = equipmentTypeFormatted?.includes('Flatbed')
  || equipmentTypeFormatted?.includes('Stepdeck')
  || equipmentTypeFormatted?.includes('Lowboy');

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box fontSize={12} fontWeight={500}>
          Load Details
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {RenderItems(FreightType, 'Freight Type', freightType)}
          </Grid>
          <Grid item xs={6}>
            {RenderItems(Weight, 'Weight', weightWithUnits)}
          </Grid>
          <Grid item xs={6}>
            {RenderItems(Deadhead, 'Deadhead', deadhead)}
          </Grid>
          {
            showDimensions && (
              <Grid item xs={6}>
                {RenderItems(Dimension, 'Dimension', dimensions)}
              </Grid>
            )
          }
          {
            !showDimensions && (
              <Grid item xs={6}>
                {RenderItems(Commodity, 'Commodity', hazardous)}
              </Grid>
            )
          }
          <Grid item xs={12}>
            {RenderItems(ShippingNotes, 'Shipping Notes', shippingNotes)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default LoadCardDetails;
