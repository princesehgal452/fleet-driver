import React, { useEffect, ReactNode } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import {
  CardActionArea,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { ILoadAddress } from '../../../models/interfaces/shared/ILoadAddress';
import { ICoordinate } from '../../../models/interfaces/shared/ICoordinate';
import LoadCardPickupDropoff from './LoadCardPickupDropoff';
import LoadCardEquipment from './LoadCardEquipment';
import LoadCardDistanceDeadhead from './LoadCardDistanceDeadhead';
import LoadCardPrice from './LoadCardPrice';
import LoadCardButtons from './LoadCardButtons';
import LoadCardDetails from './LoadCardDetails';
import LoadCardDates from './LoadCardDates';
import LoadCardCompany from './LoadCardCompany';
import LoadCardShipmentContact from './LoadCardShipmentContact';
import LoadCardTrackingToggle from './LoadCardTrackingToggle';
import Load from '../../../models/dataStructures/Load';
import TrackingSession from '../../../models/dataStructures/TrackingSession';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  paper: {
    padding: 8,
  },
  companyLogo: (props) => ({
    position: 'absolute',
    top: props.isDetailsView ? -16 : -8,
    left: 14,
    zIndex: 20
  }),
  cardDates: {
    padding: '4px 8px',
  },
  expansionPanelContainerPaper: (props) => ({
    position: props.isDetailsView ? 'absolute' : 'relative',
    top: props.isDetailsView && 80,
    margin: props.isDetailsView && theme.spacing(0, 1),
  }),
  expansionPanelContent: {
    margin: 'inherit !important',
  },
  expansionPanelRoot: {
    padding: 0,
  },
  expansionPanelDetails: {
    padding: 8,
  },
}));

interface ILoadCardProps {
  load?: Load;
  equipmentTypeFormatted?: string;
  distanceInMiles?: string;
  distanceInKilometers?: number;
  deadhead?: string;
  flatRate?: number;
  perMileRate?: number;
  rateCurrency?: string;
  certifiedLoad?: boolean;
  loading?: boolean;
  disableExpansion?: boolean;
  companyLogo?: string;
  freightType?: string;
  weightWithUnits?: string;
  shippingNotes?: string;
  pickup?: ILoadAddress;
  dropoff?: ILoadAddress;
  currentCoordinates?: ICoordinate;
  contactDetails?: any;
  downloadDistance?: () => Promise<void>;
  downloadDeadhead?: (coordinates?: ICoordinate) => Promise<void>;
  isDetailsView?: boolean;
  loadCardButtons: ReactNode;
  loadId?: string;
  matchId?: string;
  trackingDetailsButtonText?: string;
  trackingSession?: TrackingSession;
}

const CardDatesBlock = (classes, pickup, dropoff, loading) => (
  <>
    <Divider />
    <Grid container className={classes.cardDates}>
      <Grid item xs={12}>
        <LoadCardDates pickup={pickup} dropoff={dropoff} loading={loading} />
      </Grid>
    </Grid>
  </>
)

const LoadCard = observer(({
    load, equipmentTypeFormatted, distanceInMiles, distanceInKilometers, deadhead, flatRate, perMileRate, certifiedLoad, loading, shippingNotes,
    rateCurrency, companyLogo, pickup, dropoff, currentCoordinates, contactDetails, downloadDistance, downloadDeadhead, freightType, weightWithUnits, disableExpansion,
    isDetailsView, loadCardButtons, loadId, matchId, trackingDetailsButtonText, trackingSession }: ILoadCardProps) => {
    const classes = useStyles({ isDetailsView });

  useEffect(() => {
    async function initiateDeadheadDownload() {
      if (!deadhead && downloadDeadhead) {
        await downloadDeadhead();
      }
    }

    initiateDeadheadDownload();
  }, []);
  useEffect(() => {
    async function initiateDistanceDownload() {
      if (!distanceInMiles && downloadDistance) {
        await downloadDistance();
      }
    }

    initiateDistanceDownload();
  }, []);

  let otherProps = {};
  if (isDetailsView) {
    otherProps = { expanded: true };
  }

  return (
    <>
      <Paper className={clsx(classes.root)} elevation={0}>
        <div className={classes.companyLogo}>
          <LoadCardCompany companyLogo={companyLogo} loading={loading} />
        </div>
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <LoadCardPickupDropoff loading={loading} pickup={pickup} dropoff={dropoff} isDetailsView={isDetailsView} loadId={loadId} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper variant='outlined' className={classes.expansionPanelContainerPaper}>
              <ExpansionPanel elevation={0} {...otherProps}>
                <ExpansionPanelSummary
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  classes={{
                    root: classes.expansionPanelRoot,
                    content: classes.expansionPanelContent,
                  }}
                  disabled={disableExpansion || loading}
                >
                  <CardActionArea>
                    <Grid container spacing={1} className={classes.paper}>
                      <Grid item xs={12}>
                        <LoadCardDistanceDeadhead
                          loading={loading}
                          distanceInMiles={distanceInMiles}
                          distanceInKilometers={distanceInKilometers}
                          deadhead={deadhead}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1} justify='space-between' wrap='nowrap'>
                          <Grid item>
                            <LoadCardEquipment loading={loading} equipmentTypeFormatted={equipmentTypeFormatted} />
                          </Grid>
                          <Grid item>
                            <LoadCardPrice
                              loading={loading}
                              flatRate={flatRate}
                              perMileRate={perMileRate}
                              rateCurrency={rateCurrency}
                            />
                          </Grid>
                          <Grid item>
                            {
                              loadCardButtons || <LoadCardButtons loading={loading} load={load} />
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {!isDetailsView && CardDatesBlock(classes, pickup, dropoff, loading)}
                  </CardActionArea>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                  <LoadCardDetails
                    freightType={freightType}
                    weightWithUnits={weightWithUnits}
                    shippingNotes={shippingNotes}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              {
                isDetailsView && (
                <>
                  {CardDatesBlock(classes, pickup, dropoff, loading)}
                  <Divider />
                  <LoadCardTrackingToggle />
                  <Divider />
                  <LoadCardShipmentContact contactDetails={contactDetails} />
                </>
                )
              }

              {
                trackingDetailsButtonText && (
                <>
                  <Divider />
                  <LoadCardTrackingToggle trackingDetailsButtonText={trackingDetailsButtonText} trackingSession={trackingSession} />
                </>
                )
              }
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
});

export default LoadCard;
