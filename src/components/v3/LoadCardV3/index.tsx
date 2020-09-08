import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Box, Card, Divider, Grid, Paper } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Load from 'models/dataStructures/Load';
import TrackingSession from 'models/dataStructures/TrackingSession';
import BRFExpanded from 'assets/images/png/partners/BRFExpanded.png';
import BRFSmall from 'assets/images/png/partners/BRFSmall.png';
import BestPerMile from 'assets/images/png/loadCard/BestPerMile.png';
import BestPrice from 'assets/images/png/loadCard/BestPrice.png';
import LowestDeadhead from 'assets/images/png/loadCard/LowestDeadhead.png';
import LoadCardPickupDropoff from './LoadCardPickupDropoff';
import LoadCardEquipment from './LoadCardEquipment';
import LoadCardDistance from './LoadCardDistance';
import LoadCardPrice from './LoadCardPrice';
import LoadCardButtons from './LoadCardButtons';
import LoadCardDetails from './LoadCardDetails';
import LoadCardDates from './LoadCardDates';
import LoadCardShipmentContact from './LoadCardShipmentContact';
import LoadCardTrackingToggle from './LoadCardTrackingToggle';
import LoadCardMap from './LoadCardMap';
import LoadCardInfoColumn from './LoadCardInfoColumn';
import LoadCardPickupDate from './LoadCardPickupDate';
import useStyles from './styles';
import DocumentsPanel from './DocumentsPanel';
import LoadCompanyLogo from './LoadCompanyLogo';

interface ILoadCardProps {
  load?: Load;
  loading?: boolean;
  showMap?: boolean;
  isDetailsView?: boolean;
  trackingSession?: TrackingSession;
}

const LoadCard = observer(({
  load,
  loading,
  showMap,
  isDetailsView,
  trackingSession,
  location,
  history,
}: ILoadCardProps & RouteComponentProps) => {
  const classes = useStyles({ showMap, isDetailsView });
  const loadDetailsBase = '/driver/loadV3/';
  const matchDetailsBase = '/driver/matchV3/';
  const pickup = (load?.pickups && load?.pickups[0]) || load?.pickup; // load.pickup - TrackingSessionLoad
  const dropoff = (load?.dropoffs && load?.dropoffs[0]) || load?.dropoff; // load.dropoff - TrackingSessionLoad
  const equipmentTypeFormatted = load?.equipmentTypeFormatted;
  const distanceInMiles = load?.distanceInMiles;
  const distanceInKilometers = load?.distanceInKilometers;
  const deadhead = load?.deadheadInMiles || load?.deadhead;
  const flatRate = load?.payload?.loadPay?.amount;
  const perMileRate = load?.payload?.loadPay?.perMileRate;
  const rateCurrency = load?.payload?.loadPay?.rateCurrency;
  const bestPrice = load?.payload?.bestPrice;
  const bestPerMileRate = load?.payload?.bestPerMileRate;
  const deadheadRate = load?.payload?.deadheadRate;
  const certifiedLoad = load?.certfiedLoad;
  const shippingNotes = load?.shippingNotes;
  const contactDetails = load?.contact;
  const freightType = load?.freightType;
  const weight = load?.weight;
  const dimensions = load?.dimensions;
  const careInstructions = load?.careInstructions;
  const hazardous = load?.hazardous;
  const downloadDistance = load?.downloadLoadWithDistanceInMiles;
  /*
  Might be needed for dispatcher
  useEffect(() => {
    async function initiateDeadheadDownload() {
      if (!deadhead && downloadDeadhead) {
        await downloadDeadhead();
      }
    }

    initiateDeadheadDownload();
  }, []);
  */
  useEffect(() => {
    async function initiateDistanceDownload() {
      if (!distanceInMiles && downloadDistance) {
        await downloadDistance();
      }
    }

    initiateDistanceDownload();
  }, []);

  const allowRedirect = (!isDetailsView && (load?.loadId || load?.matchId || load?.matchReferenceId));

  const redirectWithRouteState = (route, redirectFrom) => {
    const routeState = {
      redirectFrom,
    };
    history.push(route, routeState);
  };


  const redirectToDetails = useCallback(() => {
    const matchId = load?.matchId || load?.matchReferenceId;
    if (location.pathname.includes('search')) {
      return redirectWithRouteState(`${loadDetailsBase}${load?.loadId}/detail`, 'search');
    }
    if (location.pathname.includes('requestLoad') && !location.pathname.includes('requestLoadDetails')) {
      return redirectWithRouteState(`${matchDetailsBase}${matchId}/detail`, 'requestLoad');
    }
    return history.push(`${matchDetailsBase}${matchId}/detail`);
  }, []);

  const SortByItem = (imgSrc, altText) => (
    <Grid item>
      <img src={imgSrc} alt={altText} />
    </Grid>
  );

  const SortByBlock = () => (
    <Grid
      container
      direction='column'
      alignItems='flex-end'
      className={classes.sortByBlock}
    >
      {
        bestPerMileRate && (SortByItem(BestPerMile, 'Best Per Mile'))
      }
      {
        bestPrice && (SortByItem(BestPrice, 'Best Price'))
      }
      {
        deadheadRate && (SortByItem(LowestDeadhead, 'Lowest Deadhead'))
      }
    </Grid>
  );

  const PickupDropoffAndDistance = () => (
    <Grid container direction='column' justify='space-between' className={classes.fullHeight}>
      <Grid item className={classes.fullWidth}>
        <LoadCardPickupDropoff loading={loading} pickup={pickup} dropoff={dropoff} />
      </Grid>
      <Grid item>
        <LoadCardDistance
          loading={loading}
          distanceInMiles={distanceInMiles}
          distanceInKilometers={distanceInKilometers}
        />
      </Grid>
    </Grid>
  );
  return (
    <>
      <Paper className={classes.root} elevation={0} onClick={allowRedirect ? redirectToDetails : undefined}>
        {
          showMap && !isDetailsView && (
            <LoadCompanyLogo load={load} className={classes.logoExpanded} />
          )
        }
        {
          showMap && !isDetailsView && (
            <SortByBlock />
          )
        }
        {
          showMap && (
            <LoadCardMap load={load} />
          )
        }
        <Box className={classes.loadContent}>
          <Card className={classes.loadBasicDetails}>
            <Grid
              container
              spacing={1}
              justify='space-evenly'
            >
              {
                (!showMap && !isDetailsView && certifiedLoad) && (
                  <Grid item xs={2}>
                    <LoadCompanyLogo load={load} className={classes.logoSmall} />
                  </Grid>
                )
              }
              <Grid item xs={(!showMap && !isDetailsView) ? 5 : 7}>
                <PickupDropoffAndDistance />
              </Grid>
              <Grid item>
                <Divider orientation='vertical' />
              </Grid>
              <Grid item xs={4}>
                <LoadCardPrice
                  loading={loading}
                  flatRate={flatRate}
                  perMileRate={perMileRate}
                  rateCurrency={rateCurrency}
                />
              </Grid>
            </Grid>
          </Card>
          <Box className={classes.loadDetails}>
            <Box p={1}>
              <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={7}>
                  <Grid container>
                    <Grid item xs={4}>
                      <LoadCardPickupDate pickup={pickup} dropoff={dropoff} loading={loading} />
                    </Grid>
                    <Grid item xs={3}>
                      {
                        equipmentTypeFormatted && (
                          <LoadCardEquipment loading={loading} equipmentTypeFormatted={equipmentTypeFormatted} />
                        )
                      }
                    </Grid>
                    <Grid item xs={3}>
                      <LoadCardInfoColumn title='Weight' value={weight} usedInHeader />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <LoadCardButtons loading={loading} load={load} />
                </Grid>
              </Grid>
            </Box>
            {
              isDetailsView && (
                <Box>
                  <Divider />
                  <Box p={1}>
                    <LoadCardDetails
                      equipmentTypeFormatted={load?.equipmentTypeFormatted}
                      freightType={freightType}
                      shippingNotes={shippingNotes}
                      deadhead={deadhead}
                      dimensions={dimensions}
                      careInstructions={careInstructions}
                      hazardous={hazardous}
                    />
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <LoadCardDates pickup={pickup} dropoff={dropoff} loading={loading} />
                  </Box>
                  <Divider />
                  <LoadCardTrackingToggle
                    load={load}
                    trackingSession={trackingSession}
                  />
                  <Divider />
                  <DocumentsPanel
                    load={load}
                  />
                  <Divider />
                  <LoadCardShipmentContact contactDetails={contactDetails} />
                </Box>
              )
            }
          </Box>
        </Box>
      </Paper>
    </>
  );
});

export default withRouter(LoadCard);
