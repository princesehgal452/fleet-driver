import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Typography, Box, Badge } from '@material-ui/core';
import FOInfiniteLoader from 'components/FOInfiniteLoader';
import Match from 'models/dataStructures/Match';
import NoLoads from 'components/v3/FONoResults/NoLoads';
import LoadSkeleton from 'components/v3/LoadSkeleton';
import LoadCard from 'components/v3/LoadCardV3';
import { CollectionsStore } from 'DriverApp/store/CollectionsStore';
import PageSubtitle from 'components/v3/PageSubtitle';
import useStyles from './styles';

interface ILaneLoadsList {
  laneMatches: CollectionsStore;
  lane: string;
  pickupCity: string;
  dropoffCity: string;
}

const LaneLoadsList = observer(({
  lane,
  pickupCity,
  dropoffCity,
  laneMatches: {
    downloadResults,
    loading,
    error,
    results,
    lanes,
    downloadNextResults,
    pagination,
  },
}: ILaneLoadsList) => {
  const classes = useStyles();

  const NoResultsComponent = () => (
    <NoLoads
      message={(
        <Typography variant='subtitle1' align='center'>
          No Loads for this lane.
        </Typography>
      )}
    />
  );

  const ResultsComponent = () => (
    <Grid container spacing={1}>
      {results.map((result: Match) => (
        <Grid item xs={12}>
          <Box py={1}>
            <LoadCard load={result.parentLoad} showMap />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  const PageTitle = () => {
    const pickupCityFormatted = decodeURIComponent(pickupCity);
    const dropoffCityFormatted = decodeURIComponent(dropoffCity);
    return (
      <>
        {`${pickupCityFormatted} to ${dropoffCityFormatted}`}
        <Badge badgeContent={results.length} classes={{ badge: classes.countBadge }} />
      </>
    );
  };

  return (
    <>
      <PageSubtitle title={<PageTitle />} />
      <FOInfiniteLoader
        downloadResults={downloadResults}
        downloadResultArgs={{ lane }}
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
    </>
  );
});

export default LaneLoadsList;
