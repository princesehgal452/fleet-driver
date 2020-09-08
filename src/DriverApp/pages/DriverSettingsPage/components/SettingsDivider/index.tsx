import React, { memo } from 'react';
import { Divider, Grid } from '@material-ui/core';
import FOGrid from '../../../../../components/FOGrid';


const SettingsDivider = memo(() => (
  <FOGrid hSpacing={0}>
    <Grid item xs={12}>
      <Divider />
    </Grid>
  </FOGrid>
));

export default SettingsDivider;
