import React from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import mixpanel from 'mixpanel-browser';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { InjectedNotistackProps, withSnackbar } from 'notistack';
import ApiLayer from '../../services/APIServices/ApiLayer';
import FinalPage from './components/FinalPage';
import { getAllTrueKeysList, trackEquipment, trackPreferredLane } from '../../utils/utility';
import {
  MIXPANEL_EVENTS,
  MIXPANEL_KEYS,
  registrationStatesDefaultDriver,
  registrationStatesDispatchableDriver,
  registrationStatesDispatcher,
} from '../../services/constants';
import DefaultDriverRegistration from './DefaultDriverRegistration';
import { IDriverAppStore } from '../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../DriverApp/store/DriverAppStore';
import DispatcherRegistration from './DispatcherRegistration';
import DispatchableDriverRegistration from './DispatchableDriverRegistration';
import { mixpanelTrack } from '../../services/FOMixpanel';
import { DriverTruck } from '../../models/dataStructures/DriverTruck';
import TermsAndConditionsContainer from '../../components/TermsAndConditionsContainer';
import { ErrorException } from '../../utils/ErrorService';


const preferredLanesSectionName = 'preferredLanesSelected';

interface IAdditionalInfoPagePropsRouteParams {
  type: string;
}

type IAdditionalInfoPageProps =
  RouteComponentProps<IAdditionalInfoPagePropsRouteParams> & IDriverAppStore & InjectedNotistackProps;

@inject('driverAppStore')
@observer
class AdditionalInfoPage extends React.Component<IAdditionalInfoPageProps> {
  state = {
    page: 0,
    checkedAll: false,
    submitting: false,
    redirectURL: '',
    maxPage: 0,
    formRef: null,
  };

  checkboxAllRef;

  componentDidMount() {
    this.setMaxPage();
    this.findLatestPage();
  }

  setMaxPage = () => {
    const { driverAppStore } = this.props;
    const { userStore } = driverAppStore as DriverAppStore;
    this.setState({
      maxPage:
        userStore.dispatcher ? registrationStatesDispatcher.selectDrivers
          : userStore.dispatchableDriver ? registrationStatesDispatchableDriver.check
          : registrationStatesDefaultDriver.equipmentList,
    });
  };

  findLatestPage = () => {
    const { history, location, match: { params }, driverAppStore } = this.props;
    const { userStore } = driverAppStore as DriverAppStore;
    const { type } = params;
    const lastStepPage = userStore.dispatcher ? registrationStatesDispatcher.confirmInformation
      : userStore.dispatchableDriver ? registrationStatesDispatchableDriver.success
        : registrationStatesDefaultDriver.confirmInformation
    this.setState({
      page: lastStepPage,
    });
    if (location.state?.to) {
      this.setState({
        redirectURL: location.state.to,
      });
    }
    if (userStore.dispatcher && (
      registrationStatesDispatcher[`${type}`] === registrationStatesDispatcher.check)) {
      history.push(
        `/driver/register/${this.getRegistrationStateName(registrationStatesDispatcher, lastStepPage)}`);
    } else if
    (userStore.dispatchableDriver && (
      registrationStatesDispatchableDriver[`${type}`] === registrationStatesDispatchableDriver.check)) {
      history.push(
        `/driver/register/${this.getRegistrationStateName(registrationStatesDispatchableDriver, lastStepPage)}`);
    } else if
    (userStore.defaultDriver && (
      registrationStatesDefaultDriver[`${type}`] === registrationStatesDefaultDriver.check)) {
        history.push(
          `/driver/register/${this.getRegistrationStateName(registrationStatesDefaultDriver, lastStepPage)}`);
        } else {
      history.push('/driver/register/check');
    }
  };

  setCheckedAllState = (state) => {
    this.setState({ checkedAll: state });
  };

  getRegistrationStateName = (registrationStates, value: number) => Object.keys(registrationStates)
  .find(key => registrationStates[key] === value);

  setFormRef = (el) => {
    if (el) {
      this.setState({ formRef: el });
    }
  };

  setCheckAllRef = (el) => {
    this.checkboxAllRef = el;
  };

  focusPreferredLanesCheckAll = (newPage, preferredLanesPage) => {
    if (newPage === preferredLanesPage) {
      // If the next page is preferredLanes then focus on the checkbox to make
      // scrolling work properly on safari.
      // Check - https://stackoverflow.com/questions/48873171/webkit-overflow-touch-stops-working-when-tapping-on-element-outside-of-scroll
      this.checkboxAllRef.focus();
    }
  };

  nextPageDispatchableDriver = () => {
    const { page: currPage } = this.state;
    if (currPage === registrationStatesDispatchableDriver.check) {
      ApiLayer.onboardUser({ firstLogin: false });
      this.setState({
        page: registrationStatesDispatchableDriver.success,
      });
    }
  };

  setNextPageDefaultDriver = () => {
    const { history } = this.props;
    const { page: currPage, maxPage } = this.state;
    const newPage = currPage + 1;
    history.push(`/driver/register/${this.getRegistrationStateName(
      registrationStatesDefaultDriver, newPage <= maxPage ? newPage : registrationStatesDefaultDriver.success)}`);
    this.setState({
      submitting: false,
      page: newPage <= maxPage ? newPage : registrationStatesDefaultDriver.success,
    });
  };

  nextPageDefaultDriver = async(values, skip) => {
    const { page: currPage, maxPage } = this.state;
    const { driverAppStore } = this.props;
    const { userStore: { patchUser, FOUser } } = driverAppStore as DriverAppStore;
    this.setState({
      submitting: true,
    });
    if(FOUser.firstLogin) {
      patchUser({ firstLogin: false });
    }
    if (currPage === registrationStatesDefaultDriver.confirmInformation || currPage === registrationStatesDefaultDriver.equipmentList) {
      try {
        await patchUser(values);
        this.setNextPageDefaultDriver();
      } catch (error) {
        this.setError(error.message);
      }
    } 
  };

  setError = (message?: string) => {
    const { driverAppStore } = this.props;
    const { snackbarStore } = driverAppStore as DriverAppStore;
    this.setState({
      submitting: false,
    });
    snackbarStore.enqueueSnackbarStore(
      message || 'Error Submitting. Please try again.', { variant: 'error' });
  };

  setNextPageDispatcher = () => {
    const { history } = this.props;
    const { page: currPage, maxPage } = this.state;
    const newPage = currPage + 1;
    history.push(`/driver/register/${this.getRegistrationStateName(
      registrationStatesDispatcher, newPage <= maxPage ? newPage : registrationStatesDispatcher.success)}`);
    this.setState({
      submitting: false,
      page: newPage <= maxPage ? newPage : registrationStatesDispatcher.success,
    });
    // this.focusPreferredLanesCheckAll(newPage, registrationStatesDispatcher.preferredLanes);
  };

  nextPageDispatcher = async (values, skip) => {
    const { page: currPage } = this.state;
    const { driverAppStore } = this.props;
    const { userStore: { updateDispatcherTrucks, patchUser } } = driverAppStore as DriverAppStore;
    this.setState({
      submitting: true,
    });
    patchUser({ firstLogin: false });
    if (currPage === registrationStatesDispatcher.selectDrivers) {
      try {
        const drivers = values.drivers || [];
        await updateDispatcherTrucks(drivers);
        const equipmentTypeList = drivers.reduce(
          (equipmentTypeList: string[], driver: DriverTruck) => [...driver.equipmentTypeList], []);
        const equipmentTypeListUnique = Array.from(new Set(equipmentTypeList));
        mixpanelTrack(MIXPANEL_EVENTS.SELECTED_EQUIPMENT_ONBOARDING, {
          [MIXPANEL_KEYS.EQUIPMENT_LIST]: equipmentTypeListUnique,
        });
        this.setNextPageDispatcher();
      } catch (error) {
        this.setError(error.message);
      }
    } else if (currPage === registrationStatesDispatcher.confirmInformation) {
      try {
        await patchUser(values);
        this.setNextPageDispatcher();
      } catch (error) {
        this.setError(error.message);
      }
    }
  };

  goPrevPage = () => {
    const { page } = this.state;
    const { history, driverAppStore } = this.props;
    const { userStore: { dispatcher, dispatchableDriver, defaultDriver } } = driverAppStore as DriverAppStore;
    this.setState({
      page: page - 1,
    });
    if (dispatcher) {
      history.push(`/driver/register/${this.getRegistrationStateName(
        registrationStatesDispatcher, page - 1)}`);
    }
    if (dispatchableDriver) {
      history.push(`/driver/register/${this.getRegistrationStateName(
        registrationStatesDispatchableDriver, page - 1)}`);
    }
    if (defaultDriver) {
      history.push(`/driver/register/${this.getRegistrationStateName(
        registrationStatesDefaultDriver, page - 1)}`);
    }
  };

  routeToRedirectURL = () => {
    const { redirectURL } = this.state;
    const { history } = this.props;
    history.push(redirectURL || '/driver/view/loads');
  };

  acceptTAC = async () => {
    const { driverAppStore } = this.props;
    const { userStore: { acceptTAC } } = driverAppStore as DriverAppStore;
    try {
      await acceptTAC();
      this.initiateFirstRAL();
      this.routeToRedirectURL();
    } catch (error) {
      console.log(error);
    }
  };

  initiateFirstRAL = async () => {
    const { driverAppStore } = this.props;
    const { userStore: { downloadCurrentCoordinatesAsync, FOUser }, truckStore: { postMyTruck } } = driverAppStore as DriverAppStore;
    const coordinates = await downloadCurrentCoordinatesAsync();
    if (coordinates.lng && coordinates.lat) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: coordinates }, (results) => {
        console.log('results.length-------======',results.length)
        if (results && results.length) {
          try {
            postMyTruck({
              pickupLocation: {
                address: results[0].formatted_address,
                coordinates: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                },
              },
              radius: {
                amount: 50,
                unit: 'mile',
              },
              equipmentTypeList: FOUser.equipmentTypeList,
              availableDate: new Date().toISOString(),
              count: results.length,
              expiresOn: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(), // expires after 30 days
            }, false);
          } catch (error) {
            ErrorException('Could not initiate RAL after onboarding', error);
          }
        }
      });
    }
  };

  submitLanes = (data, skip) => {
    const { checkedAll } = this.state;
    let submitValues = { ...data };
    if (skip === true) {
      submitValues.preferredLanes = {
        states: [],
        followMoney: false,
        skipOnboarding: true,
      };
    } else {
      const preferredLanesList = getAllTrueKeysList(data[preferredLanesSectionName]);
      // Take only states (2 letters) from the list not regions.
      submitValues.preferredLanes = {
        states: _.filter(preferredLanesList, lane => lane.length === 2),
        followMoney: checkedAll,
        skipOnboarding: false,
      };
    }
    submitValues = _.omit(submitValues, preferredLanesSectionName);
    _.each(submitValues.preferredLanes.states, trackPreferredLane);
    return submitValues;
  };

  submitHandler = () => {
    const { formRef } = this.state;
    if (formRef) {
      formRef.submit();
    }
  };

  render() {
    const { page, submitting, checkedAll, maxPage } = this.state;
    const { driverAppStore } = this.props;
    const { userStore, configStore } = driverAppStore as DriverAppStore;

    if (page > maxPage) {
      this.routeToRedirectURL();
    }
    if (page < 0) {
      return (
        <FinalPage
          onboardingComplete
          message={userStore.dispatchableDriver ? (
            <>
              BigRoad Freight is your fleet’s personalized load board that matches drivers like yourself with the best
              loads. Your dispatcher will be able to find and send loads to you very soon. We’ll show you those loads
              in the app and via notification or email.
              <br />
              <br />
              Happy Trucking!
            </>
          ) : <TermsAndConditionsContainer />}
          buttonText={userStore.dispatchableDriver ? 'Okay' : 'Agree & Continue'}
          autoCloseTime={userStore.dispatchableDriver ? 60000 : undefined}
          onClose={userStore.dispatchableDriver ? this.routeToRedirectURL : this.acceptTAC}
        />
      );
    }
    if (userStore.dispatcher) {
      return (
        <DispatcherRegistration
          userStore={userStore}
          configStore={configStore}
          page={page}
          maxPage={maxPage}
          checkedAll={checkedAll}
          setCheckedAllState={this.setCheckedAllState}
          nextPageHandler={this.nextPageDispatcher}
          prevPageHandler={this.goPrevPage}
          submitHandler={this.submitHandler}
          preferredLanesSectionName={preferredLanesSectionName}
          setFormRef={this.setFormRef}
          setCheckAllRef={this.setCheckAllRef}
          submitting={submitting}
        />
      );
    }
    if (userStore.dispatchableDriver) {
      return (
        <DispatchableDriverRegistration
          page={page}
          maxPage={maxPage}
          nextPageHandler={this.nextPageDispatchableDriver}
        />
      );
    }
    if (userStore.defaultDriver) {
      return (
        <DefaultDriverRegistration
          userStore={userStore}
          page={page}
          maxPage={maxPage}
          checkedAll={checkedAll}
          setCheckedAllState={this.setCheckedAllState}
          nextPageHandler={this.nextPageDefaultDriver}
          prevPageHandler={this.goPrevPage}
          submitHandler={this.submitHandler}
          preferredLanesSectionName={preferredLanesSectionName}
          finalPageHandler={this.acceptTAC}
          setFormRef={this.setFormRef}
          setCheckAllRef={this.setCheckAllRef}
          submitting={submitting}
        />
      );
    }
  }
}

export default withRouter(withSnackbar(AdditionalInfoPage));
