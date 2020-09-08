import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Typography, Box } from '@material-ui/core';
import FOInfiniteLoader from 'components/FOInfiniteLoader';
import Match from 'models/dataStructures/Match';
import NoLoads from 'components/v3/FONoResults/NoLoads';
import LoadSkeleton from 'components/v3/LoadSkeleton';
import LoadCard from 'components/v3/LoadCardV3';
import { CollectionsStore } from 'DriverApp/store/CollectionsStore';

interface IActiveMatchesView {
  activeLoads: CollectionsStore;
  routeToRALPage: () => void;
}

const ActiveMatchesView = observer(({
  activeLoads: {
    downloadResults,
    loading,
    error,
    results,
    downloadNextResults,
    pagination,
  },
  routeToRALPage,
}: IActiveMatchesView) => {
  const NoResultsComponent = () => (
    <NoLoads
      message={(
        <Typography variant='subtitle1' align='center'>
          Your Active Tab is currently empty.
          <br />
          It's time to start searching for high-quality freight.
          <br />
          You can also post your capacity through 'Request a Load' and be automatically matched with freight.
        </Typography>
      )}
      routeToRAL={routeToRALPage}
    />
  );

  const ResultsComponent = () => (
    <Grid container spacing={1}>
      {results.map((result: Match) => (
        <Grid item xs={12}>
          <Box py={1}>
            <LoadCard
              load={result.parentLoad}
              showMap
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <FOInfiniteLoader
      downloadResults={downloadResults}
      loading={loading}
      error={error}
      resultsCount={results.length}
      getMoreResults={downloadNextResults}
      ErrorComponent={<div />}
      LoadingMockComponent={(
        <LoadSkeleton />
      )}
      NoResultsComponent={(
        <NoResultsComponent />
      )}
      ResultsComponent={(
        <ResultsComponent />
      )}
      pagination={pagination}
    />
  );
});

export default ActiveMatchesView;
