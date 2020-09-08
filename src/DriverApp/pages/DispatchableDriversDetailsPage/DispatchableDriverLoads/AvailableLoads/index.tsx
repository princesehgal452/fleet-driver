import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { observer } from 'mobx-react';
import Match from '../../../../../models/dataStructures/Match';
import DispatchableDriverLoadCard from '../DispatchableDriverLoadCard';
import FOInfiniteLoader from '../../../../../components/FOInfiniteLoader';
import { DriverTruck } from '../../../../../models/dataStructures/DriverTruck';
import FOGrid from '../../../../../components/FOGrid';
import Load from '../../../../../models/dataStructures/Load';


interface IAvailableLoadsProps {
  driver: DriverTruck;
  routeToLoadDetailsPage: (load: Load) => void;
}

const AvailableLoads = observer((({
  driver: {
    driverCoordinates, personId, RALMatches: { loading, downloadResults, downloadNextResults, results, pagination },
  }, routeToLoadDetailsPage,
}: IAvailableLoadsProps) => (
  <FOInfiniteLoader
    ResultsComponent={results && results.length > 0 && (
    <Grid container spacing={1}>
      {results.map(({ parentLoad }: Match) => parentLoad && (
      <Grid item xs={12}>
        <DispatchableDriverLoadCard
          load={parentLoad}
          driverCoordinates={driverCoordinates}
          routeToLoadDetailsPage={routeToLoadDetailsPage}
        />
      </Grid>
      ))}
    </Grid>
    )}
    LoadingMockComponent={<FOGrid justify='center'><Grid item><CircularProgress /></Grid></FOGrid>}
    downloadResults={downloadResults}
    loading={loading}
    ErrorComponent={<div />}
    NoResultsComponent={<Typography>No available loads received yet</Typography>}
    resultsCount={results.length}
    pagination={pagination}
    getMoreResults={downloadNextResults}
    downloadResultArgs={{ personId }}
    error={false}
  />
)));

export default AvailableLoads;
