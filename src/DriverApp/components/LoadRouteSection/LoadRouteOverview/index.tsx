import React, { memo } from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import FOGrid from '../../../../components/FOGrid';
import LoadRouteItem from '../LoadRouteItem';
import AisinRouteData from '../../../../models/dataStructures/Aisin/AisinRouteData';


interface ILoadRouteOverview {
  routeData: AisinRouteData;
  buttonClickAction: () => void;
  buttonText: string;
}

const LoadRouteOverview = memo(({ routeData, buttonClickAction, buttonText }: ILoadRouteOverview) => (
  <Paper elevation={3}>
    <FOGrid>
      <Grid item xs={12}>
        <LoadRouteItem routeData={routeData} />
      </Grid>
      <Grid item xs={12} container justify='flex-end'>
        <Button variant='contained' color='primary' onClick={buttonClickAction}>
          {buttonText}
        </Button>
      </Grid>
    </FOGrid>
  </Paper>
));

export default LoadRouteOverview;
