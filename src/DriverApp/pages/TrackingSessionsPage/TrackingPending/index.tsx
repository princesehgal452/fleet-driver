import React from 'react';
import { observer } from 'mobx-react';
import { Grid, CircularProgress } from '@material-ui/core';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';
import FOInfiniteLoader from '../../../../components/FOInfiniteLoader';
import TrackingCard from '../TrackingCard';
import TrackingSessionsStore from '../../../store/TrackingSessionsStore';
import TrackingNoSessions from '../TrackingNoSessions';


interface ITrackingPendingProps {
  // pendingSessions: TrackingSession[];
  coordinates: ICoordinate;
  personId: string;
  trackingSessionsStore: TrackingSessionsStore;
}

const TrackingPending = observer(({ personId, coordinates, trackingSessionsStore: { pendingSessions, downloadResults, downloadNextResults, pagination, loading, results } }: ITrackingPendingProps) => (
  <FOInfiniteLoader
    downloadResults={downloadResults}
    getMoreResults={downloadNextResults}
    pagination={pagination}
    error={null}
    ErrorComponent={null}
    loading={loading}
    LoadingMockComponent={(
      <Grid container justify='center'>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )}
    NoResultsComponent={<TrackingNoSessions noSessionText='There are currently no Upcoming Sessions' />}
    ResultsComponent={(
      <Grid container spacing={1}>
        {pendingSessions.map((pendingSession) => (
          <Grid item xs={12}>
            <TrackingCard trackingSession={pendingSession} coordinates={coordinates} />
          </Grid>
        ))}
      </Grid>
    )}
    resultsCount={results.length}
    downloadResultArgs={{ personId }}
  />
));

export default TrackingPending;
