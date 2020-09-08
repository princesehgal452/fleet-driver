import React, { Dispatch, SetStateAction, useState } from 'react';
import { CardActionArea, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import FOGrid from '../../../components/FOGrid';
import LoadRouteItem from './LoadRouteItem';
import AisinRouteData from '../../../models/dataStructures/Aisin/AisinRouteData';
import LoadRouteFullMapDialog from './LoadRouteFullMapDialog';
import Aisin from '../../../models/dataStructures/Aisin';


const routeSelectHandler = (setShowFullMap: Dispatch<SetStateAction<boolean>>,
  setSelectedRoute: Dispatch<SetStateAction<any>>,
  selectedRoute: (AisinRouteData | null)) => () => {
  setSelectedRoute(selectedRoute);
  setShowFullMap(true);
};

const routeSelectSwitchHandler = (setSelectedRoute: Dispatch<SetStateAction<any>>) => (selectedRoute: (AisinRouteData | null)) => () => setSelectedRoute(selectedRoute);

const closeFullMap = (setShowFullMap: Dispatch<SetStateAction<boolean>>) => () => (setShowFullMap(false));

interface ILoadRouteSection {
  aisin: Aisin;
}

const LoadRouteSection = observer(({ aisin: { loading, aisinRouteSearchList } }: ILoadRouteSection) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showFullMap, setShowFullMap] = useState(false);

  return (
    <Paper>
      <FOGrid item xs={12}>
        <Typography variant='h6'>Route Options</Typography>
      </FOGrid>
      <Divider />
      {loading && !aisinRouteSearchList
        ? (
          <FOGrid>
            <Grid item xs={12}>
              <LoadRouteItem loading={loading} />
            </Grid>
          </FOGrid>
        ) : (
          aisinRouteSearchList && (aisinRouteSearchList.map((routeData) => (
            <CardActionArea
              key={routeData.routeSearchType}
              onClick={routeSelectHandler(setShowFullMap, setSelectedRoute, routeData)}
            >
              <FOGrid>
                <Grid item xs={12}>
                  <LoadRouteItem routeData={routeData} loading={loading} />
                </Grid>
              </FOGrid>
              <Divider />
            </CardActionArea>
          ))))}
      {aisinRouteSearchList && selectedRoute && (
        <LoadRouteFullMapDialog
          open={showFullMap}
          selectedRoute={selectedRoute}
          routeDataList={aisinRouteSearchList}
          routeSelectSwitchHandler={routeSelectSwitchHandler(setSelectedRoute)}
          closeHandler={closeFullMap(setShowFullMap)}
        />
      )}
    </Paper>
  );
});

export default LoadRouteSection;
