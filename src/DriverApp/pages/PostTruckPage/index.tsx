import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import firebase from 'firebase/app';
import 'firebase/auth';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change, formValueSelector, reduxForm } from 'redux-form';
import ReactGA from 'react-ga';
import classNames from 'classnames';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Tab, Tabs } from '@material-ui/core';
import PostTruckPanel from '../../components/PostTruckPanel';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import { DriverAppStore } from '../../store/DriverAppStore';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { GA_TRACKING, MIXPANEL_EVENTS, MIXPANEL_KEYS, Tutorial } from '../../../services/constants';
import { refactorLocation, refactorMileRate, refactorRadius, trackPageView } from '../../../utils/utility';
import { mixpanelSetSearchRALCitiesStates, mixpanelTrack } from '../../../services/FOMixpanel';
import RALLoads from './RALLoads';
import LoadRequests from './LoadRequests';
import { DriverTruck } from '../../../models/dataStructures/DriverTruck';
import TruckPageContent from './TruckPageContent';
import SettingLoadSVG from '../../../assets/images/svg/driver/setting-load.svg';

import './PostTruckPage.scss';
import Tutorials from '../../components/Tutorials';


const formName = 'postTruckForm';

const searchImageStyle = {
  width: '100%',
  maxHeight: '150px',
};

const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    maxHeight: '100%',
  },
  flexStretch: {
    flexGrow: 1,
  },
  hideOverflow: {
    overflow: 'hidden',
  },
});

enum TabStates {
  REQUESTS,
  RALLOADS,
}

interface IPostTruckPageRouteProps {
  personId: string;
}

interface IPostTruckPageState {
  dispatchableDriver: DriverTruck | null;
  collapsedPostForm: boolean;
  currentTab: TabStates;
  minDate?: Date;
}

type IPostTruckPage = IDriverAppStore & RouteComponentProps<IPostTruckPageRouteProps> & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class PostTruckPageContainer extends React.Component<IPostTruckPage, IPostTruckPageState> {
  constructor(props) {
    super(props);
    this.state = {
      dispatchableDriver: null,
      collapsedPostForm: true,
      currentTab: TabStates.REQUESTS,
      minDate: undefined,
    };
  }

  componentDidMount() {
    this.setDispatchableDriver();
    this.clearErrors();
    this.getMyTrucksHandler();
  }

  setDispatchableDriver = () => {
    const { match: { params: { personId } }, driverAppStore } = this.props;
    const { userStore: { FOUser: { drivers } } } = driverAppStore as DriverAppStore;
    const dispatchableDriver = drivers?.find((driver) => driver.personId === personId);
    if (dispatchableDriver) {
      this.setState({ dispatchableDriver });
    } else {
      this.setState({ dispatchableDriver: null });
    }
  };

  clearErrors = () => {
    const { driverAppStore } = this.props;
    const { truckStore: { setError: setTruckErrors }, matchStore: { RALLoadsStore: { setError: setRALLoadsErrors } } } = driverAppStore as DriverAppStore;
    setTruckErrors(null);
    setRALLoadsErrors(null);
  };

  clearValues = () => {
    const { reset } = this.props;
    reset();
  };

  getMyTrucksHandler = async () => {
    const { driverAppStore, match: { params: { personId } } } = this.props;
    const { truckStore: { postedTrucks } } = driverAppStore as DriverAppStore;
    if (!personId) {
      await postedTrucks.downloadResults();
    }
  };

  RALLoadClickHandler = (load) => {
    const { history, driverAppStore } = this.props;
    const { matchStore: { setSelectedMatch }, searchStore: { setSelectedLoad } } = driverAppStore as DriverAppStore;
    setSelectedMatch(null);
    setSelectedLoad(load);
    let redirectPath;
    if (load.matchId === load.loadId) {
      redirectPath = `/driver/load/${load.id}/detail`;
    } else {
      redirectPath = `/driver/match/${load.matchId}/detail`;
    }
    history.push(redirectPath);
  };

  handlePanelExpanded = () => {
    const { collapsedPostForm } = this.state;
    this.setState({
      collapsedPostForm: !collapsedPostForm,
    });
    mixpanelTrack(MIXPANEL_EVENTS.ADVANCED_OPTIONS, {
      Location: 'Request a Load',
      State: collapsedPostForm ? 'Collapsed' : 'Expanded',
    });
  };

  validateDates = (event, newValue) => {
    const { expiresOn, change: changeProp } = this.props;
    if (newValue) {
      this.setState({ minDate: newValue.toDate() });
      if (newValue.isAfter(expiresOn)) {
        changeProp('expiresOn', null);
      }
    } else {
      this.setState({ minDate: undefined });
    }
  };

  submitHandler = (values) => {
    let submitValues = { ...values };
    if (submitValues.pickup && submitValues.pickup.coordinates) {
      mixpanelSetSearchRALCitiesStates(submitValues.pickup);
      submitValues.pickup = refactorLocation(submitValues.pickup);
    } else {
      submitValues = omit(submitValues, 'pickup');
    }
    if (submitValues.dropoff) {
      mixpanelSetSearchRALCitiesStates(submitValues.dropoff);
      submitValues.dropoff = refactorLocation(submitValues.dropoff);
    } else {
      submitValues = omit(submitValues, 'dropoff');
    }
    if (submitValues.equipmentTypeList) {
      submitValues.equipmentTypeList = (typeof submitValues.equipmentTypeList === 'string')
        ? submitValues.equipmentTypeList.split(',') : submitValues.equipmentTypeList;
    } else {
      submitValues = omit(submitValues, 'equipmentTypeList');
    }
    if (submitValues.radius) {
      submitValues.radius = refactorRadius(submitValues.radius);
    } else {
      submitValues = omit(submitValues, 'radius');
    }
    if (submitValues.perMileRate) {
      submitValues.perMileRate = refactorMileRate(submitValues.perMileRate);
    } else {
      submitValues = omit(submitValues, 'perMileRate');
    }
    if (!submitValues.availableDate) {
      submitValues = omit(submitValues, 'availableDate');
    }
    if (!submitValues.expiresOn) {
      submitValues = omit(submitValues, 'expiresOn');
    }
    this.handlePostTruck(submitValues);
  };

  handlePostTruck = async (postQuery) => {
    const { dispatchableDriver } = this.state;
    const { driverAppStore } = this.props;
    const { truckStore, snackbarStore: { enqueueSnackbarStore } } = driverAppStore as DriverAppStore;
    const normalizePostQuery = {
      ...postQuery,
      pickup: {
        ...postQuery.pickupLocation,
        address: postQuery.pickupLocation && postQuery.pickupLocation.description,
      },
      dropoff: {
        ...postQuery.dropoffLocation,
        address: postQuery.dropoffLocation && postQuery.dropoffLocation.description,
      },
      personId: dispatchableDriver?.personId,
    };
    ReactGA.event({
      category: GA_TRACKING.CATEGORIES.DRIVER,
      action: GA_TRACKING.ACTIONS.NEW_RAL,
    });
    trackPageView(GA_TRACKING.PAGEVIEWS.NEW_RAL); // Required to make funnel reports in GA: REF BRF-635

    mixpanelTrack(MIXPANEL_EVENTS.RAL, {
      Location: 'RAL Page',
      [MIXPANEL_KEYS.PICKUP_LOCATION]: postQuery.pickupLocation && postQuery.pickupLocation.description,
      [MIXPANEL_KEYS.DROPOFF_LOCATION]: postQuery.dropoffLocation && postQuery.dropoffLocation.dropoffLocation,
      [MIXPANEL_KEYS.EQUIPMENT_LIST]: postQuery.equipmentTypeList,
    });
    this.setState({
      collapsedPostForm: true,
    });
    try {
      if (dispatchableDriver) {
        await dispatchableDriver.sendNewRALRequest(normalizePostQuery);
        enqueueSnackbarStore('Successfully sent your request for loads', { variant: 'success' });
      } else {
        truckStore.postMyTruck(normalizePostQuery);
        enqueueSnackbarStore('Successfully sent your request for loads', { variant: 'success' });
      }
    } catch (error) {
    }
  };

  handleTabChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  setNearbyLocationRAL = async () => {
    const { driverAppStore, change } = this.props;
    const { userStore: { downloadCurrentCoordinatesAsync } } = driverAppStore as DriverAppStore;
    try {
      const coordinates = await downloadCurrentCoordinatesAsync();
      if (coordinates.lng && coordinates.lat) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinates }, (results) => {
          if (results && results.length) {
            change('pickupLocation', {
              description: results[0].formatted_address,
              coordinates: {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              },
            });
          }
        });
      }
    } catch (error) {
      console.log('Could not fetch nearby location for RAL');
    }
  };

  render() {
    const { driverAppStore, handleSubmit, pristine, classes } = this.props;
    const {
      truckStore, matchStore: { RALLoadsStore }, userStore, configStore: { isGeotab },
    } = driverAppStore as DriverAppStore;
    const { loading, postedTrucks } = truckStore;
    const { hideTracking, trackedMatchID, dispatcher } = userStore;
    const { collapsedPostForm, currentTab, dispatchableDriver, minDate } = this.state;

    return (
      <form className={classes.root} onSubmit={handleSubmit(this.submitHandler)}>
        {dispatcher ? (
          <Grid container className={classNames(classes.root, classes.hideOverflow)} direction='column' wrap='nowrap'>
            <Grid item>
              <FOAppBarPage
                pageTitle='Request A Load'
                renderTracking={Boolean(trackedMatchID && !hideTracking)}
                showBackButton
                secondaryControls={(
                  <Grid container>
                    <Grid item xs={12}>
                      <PostTruckPanel
                        pristine={pristine}
                        minDate={minDate}
                        loading={loading}
                        dispatcher={dispatcher}
                        collapsedSearchForm={collapsedPostForm}
                        validateDates={this.validateDates}
                        clearValues={this.clearValues}
                        onExpanded={this.handlePanelExpanded}
                        setNearbyLocationRAL={this.setNearbyLocationRAL}
                      />
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
            <TruckPageContent loading={loading} driverTruck={dispatchableDriver} isGeotab={isGeotab} />
          </Grid>
        ) : (
          <>
            <FOAppBarPage
              pageTitle='Request A Load'
              renderTracking={Boolean(trackedMatchID && !hideTracking)}
              secondaryControls={(
                <Grid container>
                  <Grid item xs={12}>
                    <Tabs
                      value={currentTab}
                      onChange={this.handleTabChange}
                      variant='fullWidth'
                    >
                      <Tab label='Request a Load' value={TabStates.REQUESTS} />
                      <Tab label='Available Loads' value={TabStates.RALLOADS} />
                    </Tabs>
                  </Grid>
                  <Grid item xs={12}>
                    <PostTruckPanel
                      minDate={minDate}
                      loading={loading}
                      pristine={pristine}
                      collapsedSearchForm={collapsedPostForm}
                      validateDates={this.validateDates}
                      clearValues={this.clearValues}
                      onExpanded={this.handlePanelExpanded}
                      setNearbyLocationRAL={this.setNearbyLocationRAL}
                    />
                  </Grid>
                </Grid>
              )}
            />
            <Grid container className='driver-page-content'>
              <Grid item xs={12}>
                {currentTab === TabStates.REQUESTS && (
                  <LoadRequests truckStore={truckStore} />
                )}
                {currentTab === TabStates.RALLOADS && (
                  <RALLoads
                    RALLoadStore={RALLoadsStore}
                    userStore={userStore}
                    onItemClick={this.RALLoadClickHandler}
                    currentCoordinates={userStore.getCurrentCoordinates.get()}
                  />
                )}
              </Grid>
              {postedTrucks.results.length === 0
              && (
                <Grid item>
                  <SettingLoadSVG className='default_truck_image' />
                </Grid>
              )}
            </Grid>
          </>
        )}
        <Tutorials tutorialKey={Tutorial.RAL_PAGE} />
      </form>
    );
  }
}

const PostTruckPageForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
})(PostTruckPageContainer);

const selector = formValueSelector(formName);
const getInitialValues = () => {
  let defaultValues = {
    availableDate: new Date(),
    radius: '50',
    perMileRate: '2.5',
    equipmentTypeList: '',
  };
  const { currentUser } = firebase.auth();
  if (currentUser && currentUser['foUser']?.equipmentTypeList?.length > 0) {
    defaultValues = {
      ...defaultValues,
      equipmentTypeList: currentUser['foUser'].equipmentTypeList,
    };
  }
  if (currentUser && currentUser['foUser']?.preferredPerMileRate?.price) {
    defaultValues = {
      ...defaultValues,
      perMileRate: currentUser['foUser'].preferredPerMileRate.price,
    };
  }
  return defaultValues;
};

const PostTruckPanelConnect = connect(
  state => ({
    initialValues: getInitialValues(),
    availableDate: selector(state, 'availableDate'),
    expiresOn: selector(state, 'expiresOn'),
    pickupLocation: selector(state, 'pickupLocation'),
  }),
  dispatch => bindActionCreators({ change }, dispatch),
)(withRouter(withStyles(styles)(PostTruckPageForm)));

export default PostTruckPanelConnect;
