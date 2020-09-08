import React, { memo } from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import FOAppbar from '../../../../../components/FOAppBar';


interface ILoadRouteDialogHeader {
  closeHandler: () => void;
}

const LoadRouteDialogHeader = memo(({ closeHandler }: ILoadRouteDialogHeader) => (
  <FOAppbar position='static'>
    <Grid container alignItems='center'>
      <Grid item>
        <IconButton onClick={closeHandler} color='inherit'>
          <Clear />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant='h5' color='inherit'>
          Load Route
        </Typography>
      </Grid>
    </Grid>
  </FOAppbar>
));

export default LoadRouteDialogHeader;
