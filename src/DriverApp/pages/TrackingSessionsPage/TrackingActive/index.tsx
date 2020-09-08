import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import GoogleMapsDirectionsRender from '../../../components/Maps/GoogleMapsDirectionsRender';
import TrackingCard from '../TrackingCard';
import TrackingSessionsStore from '../../../store/TrackingSessionsStore';
import LoadDetailSection from '../../../components/LoadDetailSection';
import TrackingNoSessions from '../TrackingNoSessions';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';


const mapHeight = '200px';

interface ITrackingActive {
  trackingSessionsStore: TrackingSessionsStore;
  coordinates: ICoordinate;
}

const TrackingActive = observer(({ trackingSessionsStore: { activeSession, loading, activeSessionLoad }, coordinates }: ITrackingActive) => {
  if (!activeSession && loading) {
    return (
      <Grid container justify='center'>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  if (!activeSession) {
    return (
      <Grid container>
        <Grid item xs={12} className='driver-page-content'>
          <TrackingNoSessions noSessionText='There is currently no Active Session' />
        </Grid>
      </Grid>
    );
  }
  if (activeSession) {
    return (
      <>
        <Grid item xs={12}>
          <GoogleMapsDirectionsRender
            mapHeight={mapHeight}
            origin={activeSession.pickupCoordinates}
            destination={activeSession.dropoffCoordinates}
          />
        </Grid>
        <Grid container item xs={12} md={6} spacing={1} className='driver-page-content' justify='center'>
          <Grid item xs={12}>
            <TrackingCard trackingSession={activeSession} showStatusControl coordinates={coordinates} />
          </Grid>
          {activeSessionLoad && (
            <Grid item xs={12}>
              <LoadDetailSection
                equipmentTypeFormatted={activeSessionLoad.equipmentTypeFormatted}
                weightWithUnits={activeSessionLoad.weightWithUnits}
                freightType={activeSessionLoad.freightType}
                isMultipleDropOffPickup={activeSessionLoad.isMultipleDropOffPickup}
                pickupQty={activeSessionLoad.pickups.length}
                dropoffQty={activeSessionLoad.dropoffs.length}
                loadContentDetails={activeSessionLoad.contentDetails}
              />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
  return null;
});

export default TrackingActive;
