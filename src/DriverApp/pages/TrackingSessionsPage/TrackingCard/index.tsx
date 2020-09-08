import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Divider, Grid, Paper } from '@material-ui/core';
import CertifiedLoad from '../../../../components/CertfiedLoad';
import LocationPriceLoadInfo from '../../../components/LocationsPriceLoadInfo';
import TrackingSession from '../../../../models/dataStructures/TrackingSession';
import TrackingCardStatus from './TrackingCardStatus';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';
import TrackingCardContact from './TrackingCardContact';


interface ITrackingCard {
  trackingSession: TrackingSession;
  showStatusControl?: boolean;
  coordinates: ICoordinate;
}

const TrackingCard = observer(({ trackingSession, showStatusControl, coordinates }: ITrackingCard) => {
  useEffect(() => {
    if (trackingSession.deadhead === '-') {
      trackingSession.calculateDeadheadInMiles(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    if (trackingSession.distanceInMiles === '-') {
      trackingSession.downloadSessionDistanceInMiles();
    }
  }, []);

  return (
    <Grid container item>
      <Grid item xs={12}>
        <CertifiedLoad certfied preText='Providing Tracking For' logo={trackingSession.integration.partnerLogo} />
      </Grid>
      <Paper square>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <LocationPriceLoadInfo
              pickup={trackingSession.pickup}
              dropoff={trackingSession.dropoff}
              distance={trackingSession.distanceInMiles}
              radius={trackingSession.deadhead}
              equipmentTypeList={[trackingSession.load.equipmentType]}
              flatRate={0}
              perMileRate={0}
              distanceLoading={trackingSession.distanceStore.loading}
              noRateText=''
            />
          </Grid>
          {showStatusControl && (
            <>
              <Grid item xs={12}>
                <TrackingCardStatus trackingSession={trackingSession} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TrackingCardContact trackingSession={trackingSession} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
});

export default TrackingCard;
