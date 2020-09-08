import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import MatchDetailContact from '../MatchDetailContact';
import MatchHelperText from '../MatchHelperText';
import ActionButtons from '../../../../components/CardActions/ActionButtons';
import CertifiedLoad from '../../../../../components/CertfiedLoad';
import DocumentSendButton from '../../../../components/DocumentSendButton';
import LocationPriceLoadInfo from '../../../../components/LocationsPriceLoadInfo';
import LoadDetailSection from '../../../../components/LoadDetailSection';
import MatchCancelButton from '../../../../components/MatchCancelButton';
import LoadRouteSection from '../../../../components/LoadRouteSection';
import MatchDetailMap from '../MatchDetailMap';
import Match from '../../../../../models/dataStructures/Match';
import Load from '../../../../../models/dataStructures/Load';
import { DriverAppStore } from '../../../../store/DriverAppStore';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import { mixpanelLoadProperties, mixpanelTrack } from '../../../../../services/FOMixpanel';
import { MIXPANEL_EVENTS } from '../../../../../services/constants';

import './MatchDetailContent.scss';


const mapHeight = '200px';

const styles = (theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up('xs')]: {
      marginBottom: 35,
    },
  },
  loadOverview: {
    position: 'relative' as 'relative',
  },
  map: { height: mapHeight },
  mapLoading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverPageContent: {
    maxHeight: 'calc(100vh - 340px) !important'
  }
});

interface IMatchDetailContentOwnProps {
  matchProp?: Match; // Either match or load is needed.
  load?: Load; // Either match or load is needed.
  matchId: string;
  loadId: string;
}

type IMatchDetailContentProps = IMatchDetailContentOwnProps & RouteComponentProps &
  IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class MatchDetailContent extends React.Component<IMatchDetailContentProps> {
  state = {
    trackedLoadOpen: false,
  };

  get load() {
    const { matchProp, load: propLoad } = this.props;
    return matchProp ? matchProp.parentLoad : propLoad;
  }

  setTrackedLoadOpenTrue = () => {
    if (this.load) {
      this.setState({ trackedLoadOpen: true });
      mixpanelTrack(MIXPANEL_EVENTS.LOAD_DETAILS, {
        ...mixpanelLoadProperties(this.load),
      });
    }
  };

  render() {
    const { trackedLoadOpen } = this.state;
    const { driverAppStore, classes } = this.props;
    const { userStore, configStore: { isAisin, isGeotab } } = driverAppStore as DriverAppStore;
    const { dispatchableDriver } = userStore;
    // Prefer match over this.load.
    if (!trackedLoadOpen && this.load) {
      this.setTrackedLoadOpenTrue();
    }
    const pickup = this.load && this.load.pickups && this.load.pickups[0];
    const dropoff = this.load && this.load.dropoffs && this.load.dropoffs[0];

    return (
      <Grid container className='match-detail-page'>
        <Grid item xs={12}>
          <Paper>
            <div className={classes.map}>
              {((!this.load) || (this.load.aisin.loading))
                ? (
                  <div className={classes.mapLoading}><CircularProgress /></div>
                ) : (
                  <MatchDetailMap load={this.load} mapHeight={mapHeight} isAisin={isAisin} />
                )}
            </div>
          </Paper>
        </Grid>
        <div className={classNames(classes.root, 'driver-page-content', isGeotab && classes.driverPageContent)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CertifiedLoad certfied={this.load && this.load.certfiedLoad} isGeotab={isGeotab} >
                <Grid container>
                  {this.load && (
                    <>
                      {
                        <>
                          {pickup && (
                            <Grid item xs={12} className={classes.loadOverview}>
                              <LocationPriceLoadInfo
                                pickup={pickup}
                                dropoff={dropoff}
                                distance={this.load.distanceInMiles}
                                radius={this.load.deadheadInMiles}
                                equipmentTypeList={this.load.equipmentTypeFormatted}
                                perMileRate={this.load.perMileRate}
                                flatRate={this.load.flatRate}
                                distanceLoading={this.load.distanceStore.loading}
                                noRateText='Call for price'
                                displayFullAddress
                                dispatchableDriver={dispatchableDriver}
                                loadSmart={this.load.loadSmart}
                                companyLogo={this.load.companyLogo}
                                companyName={this.load.contact?.companyName}
                              />
                            </Grid>
                          )}
                        </>
                      }
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <ActionButtons load={this.load} />
                      </Grid>
                      <Grid item xs={12}>
                        <MatchHelperText load={this.load} />
                      </Grid>
                    </>
                  )}
                </Grid>
              </CertifiedLoad>
            </Grid>
            {this.load && (
              <>
                {/* Hiding load route map until aisin api is prod ready */}
                {isAisin && (
                  <Grid item xs={12}>
                    <LoadRouteSection aisin={this.load.aisin} />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <LoadDetailSection
                    equipmentTypeFormatted={this.load.equipmentTypeFormatted}
                    weightWithUnits={this.load.weightWithUnits}
                    freightType={this.load.freightType}
                    isMultipleDropOffPickup={this.load.isMultipleDropOffPickup}
                    pickupQty={this.load.pickups.length}
                    dropoffQty={this.load.dropoffs.length}
                    loadContentDetails={this.load.contentDetails}
                    dispatchableDriver={dispatchableDriver}
                  />
                </Grid>
                {!dispatchableDriver && (
                  <Grid item xs={12} sm={6}>
                    <DocumentSendButton
                      sendText='Share my documents here'
                      email={this.load.contact.email}
                      userStore={userStore}
                    />
                  </Grid>
                )}
                {this.load.bookedOrCompletedMatch && this.load.bookedOrCompletedMatch.isAutomatedTracking && !this.load.completedMatch && (
                  <Grid item xs={12} sm={6}>
                    <MatchCancelButton load={this.load} />
                  </Grid>
                )}
              </>
            )}
            {this.load && !dispatchableDriver && (
              <MatchDetailContact load={this.load} userStore={userStore} isGeotab={isGeotab}/>
            )}
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(MatchDetailContent));
