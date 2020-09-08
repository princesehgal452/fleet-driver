import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import Match from '../../../../../models/dataStructures/Match';
import DispatchableDriverLoadCard from '../DispatchableDriverLoadCard';
import FOInfiniteLoader from '../../../../../components/FOInfiniteLoader';
import { DriverTruck } from '../../../../../models/dataStructures/DriverTruck';
import FOGrid from '../../../../../components/FOGrid';
import Load from '../../../../../models/dataStructures/Load';


interface IRecommendedLoadsProps {
  driver: DriverTruck;
  routeToLoadDetailsPage: (load: Load) => void;
}

const RecommendedLoads = observer((({
  driver: { driverCoordinates, personId, AUMatches: { loading, downloadResults, downloadNextResults, results, pagination } },
  routeToLoadDetailsPage,
}: IRecommendedLoadsProps) => (
  <FOInfiniteLoader
    ResultsComponent={results && results.length > 0 && (
    <Grid container spacing={1}>
      {results.map(({ parentLoad }: Match) => parentLoad && (
      <Grid item xs={12}>
        <Paper>
          <DispatchableDriverLoadCard
            load={parentLoad}
            driverCoordinates={driverCoordinates}
            routeToLoadDetailsPage={routeToLoadDetailsPage}
          />
        </Paper>
      </Grid>
      ))}
    </Grid>
    )}
    LoadingMockComponent={<FOGrid justify='center'><Grid item><CircularProgress /></Grid></FOGrid>}
    downloadResults={downloadResults}
    loading={loading}
    ErrorComponent={<div />}
    NoResultsComponent={<Typography>No recommendations received yet</Typography>}
    resultsCount={results.length}
    pagination={pagination}
    getMoreResults={downloadNextResults}
    downloadResultArgs={{ personId }}
    error={false}
  />
)));

export default RecommendedLoads;
