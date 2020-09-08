import React, { memo } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Grid, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import FlatbedGreen from 'assets/images/png/FlatbedGreen.png';
import { ITheme } from 'theme/ITheme';

interface ILoadCardPickupDropoffProps {
  equipmentTypeFormatted?: string;
  loading?: boolean;
}

const LoadCardPickupDropoff = memo(({ loading, equipmentTypeFormatted }: ILoadCardPickupDropoffProps) => {
  const theme: ITheme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box fontSize={11} color={theme.palette.text.secondary}>
          {equipmentTypeFormatted ? equipmentTypeFormatted.split(',')[0] : ''}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box fontSize={12} whiteSpace='normal'>
          {loading ? (
            <Skeleton width={40} height={40} />
          ) : (
            <img src={FlatbedGreen} alt='Equipment type' />
          )}
        </Box>
      </Grid>
    </Grid>
  );
});

export default LoadCardPickupDropoff;
