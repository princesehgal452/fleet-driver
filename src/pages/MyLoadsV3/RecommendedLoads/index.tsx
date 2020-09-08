import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Grid, Typography, Box } from '@material-ui/core';

import Match from 'models/dataStructures/Match';
import CollectionsStore from 'DriverApp/store/CollectionsStore';
import FOInfiniteLoader from 'components/v3/FOInfiniteLoader';
import NoLoads from 'components/v3/FONoResults/NoLoads';
import LoadCard from 'components/v3/LoadCardV3';
import LoadSkeleton from 'components/v3/LoadSkeleton';
import PageSubtitle from 'components/v3/PageSubtitle';

interface IRecommendedLoads {
  title?: string | ReactNode;
  recommendedMatches: CollectionsStore;
}

const RecommendedLoads = observer(({
  recommendedMatches: { downloadResults, loading, error, results, downloadNextResults, pagination }, title }: IRecommendedLoads) => {
  const NoResultsComponent = () => (
    <NoLoads
      message={(
        <Typography variant='subtitle1' align='center'>
          <div>
            We are generating recommendations for you, stay tuned for high-quality freight matches.
          </div>
          <div>
            Try requesting a load and you'll be notified when we find you a match.
          </div>
        </Typography>
      )}
    />
  );

  const ResultsComponent = () => (
    <Grid container spacing={1}>
      {
        results.map((result: Match) => (
          <Grid item xs={12}>
            <Box py={1}>
              <LoadCard load={result.parentLoad} showMap />
            </Box>
          </Grid>
        ))
      }
    </Grid>
  );

  return (
    <Box marginBottom={6}>
      {
        title && (
          <PageSubtitle title={title} mb={1} />
        )
      }
      <FOInfiniteLoader
        downloadResults={downloadResults}
        loading={loading}
        error={error}
        resultsCount={results.length}
        getMoreResults={downloadNextResults}
        ErrorComponent={<div />}
        LoadingMockComponent={<LoadSkeleton />}
        NoResultsComponent={<NoResultsComponent />}
        ResultsComponent={<ResultsComponent />}
        pagination={pagination}
      />
    </Box>
  );
});

export default RecommendedLoads;
