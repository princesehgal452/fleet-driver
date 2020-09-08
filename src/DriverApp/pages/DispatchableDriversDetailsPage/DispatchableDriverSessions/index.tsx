import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import FOGrid from '../../../../components/FOGrid';
import TrackingActive from '../../TrackingSessionsPage/TrackingActive';
import { TrackingSessionTabStates } from '../../../../services/constants';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';


interface IDispatchableDriverSessionsOwnProps {
  driver?: DriverTruck;
}

type IDispatchableDriverSessionsProps = IDispatchableDriverSessionsOwnProps & RouteComponentProps;

const DispatchableDriverSessions = observer(({ driver, history }: IDispatchableDriverSessionsProps) => {
  if (!driver) {
    return null;
  }

  const { personId, trackingSessionsStore, driverCoordinates } = driver;

  useEffect(() => {
    async function initiateDownload() {
      if (personId && trackingSessionsStore) {
        if (trackingSessionsStore.results.length === 0) {
          await trackingSessionsStore.downloadResults(1, { personId: trackingSessionsStore.personId });
        }
      }
    }

    initiateDownload();
  }, []);

  const routeToActiveSession = useCallback(() => history.push(`/driver/trackingSessions/${TrackingSessionTabStates.CURRENT}/${personId}`), []);
  const routeToPendingSessions = useCallback(() => history.push(`/driver/trackingSessions/${TrackingSessionTabStates.UPCOMING}/${personId}`), []);

  const { activeSession, pendingSessions } = trackingSessionsStore;
  return (
    <FOGrid>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify='space-between'>
                <Grid item>
                  <Typography variant='h6'>
                    Current Shipment
                  </Typography>
                </Grid>
                <Grid item>
                  {activeSession && (
                    <Button color='primary' onClick={routeToActiveSession}>Check Details</Button>
                  )}
                  {!activeSession && (pendingSessions.length > 0) && (
                    <Button color='primary' onClick={routeToPendingSessions}>Track Shipments</Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {activeSession && (
                <TrackingActive trackingSessionsStore={trackingSessionsStore} coordinates={driverCoordinates} />
              )}
              {!activeSession && (pendingSessions.length > 0) && (
                <Typography>
                  {`${pendingSessions.length} shipments coming up`}
                </Typography>
              )}
              {!activeSession && (pendingSessions.length === 0) && (
                <Typography>
                  None available
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FOGrid>
  );
});

export default withRouter(DispatchableDriverSessions);
