import React from 'react';
import { observer } from 'mobx-react';
import { Grid, CircularProgress } from '@material-ui/core';
import FOInfiniteLoader from 'components/v3/FOInfiniteLoader';
import TrackingSessionsStore from 'DriverApp/store/TrackingSessionsStore';
import LoadCard from 'components/v3/LoadsHorizontalListV3/LoadCard';
import TrackingNoSessions from '../TrackingNoSessions';
import PageSubtitle from 'components/v3/PageSubtitle';

interface IUpcomingTrackingLoadsProps {
  title: string;
  personId: string;
  trackingSessionsStore: TrackingSessionsStore;
}

const UpcomingTrackingLoads = observer(({
  title,
  personId,
  trackingSessionsStore: {
    pendingSessions,
    downloadResults,
    downloadNextResults,
    pagination,
    loading,
    results,
  },
}: IUpcomingTrackingLoadsProps) => {
  const LoadingMockComponent = () => (
    <Grid container justify='center'>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );

  const ResultsComponent = () => (
    pendingSessions.map((session) => (
      <LoadCard
        pickup={session.pickup}
        dropoff={session.dropoff}
        id={session?.id}
      />
    ))
  );

  return (
    <Grid container>
      <PageSubtitle title={title} mb={1.5} />
      <FOInfiniteLoader
        downloadResults={downloadResults}
        getMoreResults={downloadNextResults}
        pagination={pagination}
        error={null}
        ErrorComponent={null}
        loading={loading}
        LoadingMockComponent={(LoadingMockComponent())}
        NoResultsComponent={<TrackingNoSessions noSessionText='There are currently no upcoming sessions' />}
        ResultsComponent={(ResultsComponent())}
        resultsCount={results.length}
        downloadResultArgs={{ personId }}
        isHorizontalScroll
      />
    </Grid>
  );
});

export default UpcomingTrackingLoads;
