import { action, computed, isObservableArray, observable } from 'mobx';
import ReactGA from 'react-ga';
import moment from 'moment';
import startCase from 'lodash/startCase';
import { ILoadData } from '../../interfaces/shared/ILoadData';
import { IPostedBy } from '../../interfaces/shared/IPostedBy';
import { IPayload } from '../../interfaces/shared/IPayload';
import { ICoordinate } from '../../interfaces/shared/ICoordinate';
import ApiLayer from '../../../services/APIServices/ApiLayer';
import {
  getAllTrueKeysFormatted,
  getDateTime,
  getPerMileRateForMiles,
  getValueFromFormattedAmount,
  trackPageView,
  formatNumberToString,
} from '../../../utils/utility';
import { PostLoadDispatch } from '../../../services/APIServices/PostLoadDispatch';
import { PostLoadAccept } from '../../../services/APIServices/PostLoadAccept';
import { PostLoadDecline } from '../../../services/APIServices/PostLoadDecline';
import { DriverTruck } from '../DriverTruck';
import driverAppStore, { DriverAppStore } from '../../../DriverApp/store/DriverAppStore';
import { GA_TRACKING, LoadStatus, MatchStatus, MIXPANEL_EVENTS } from '../../../services/constants';
import { mixpanelLoadProperties, mixpanelTrack } from '../../../services/FOMixpanel';
import { ILoadAddress } from '../../interfaces/shared/ILoadAddress';
import StoreBase from '../../../DriverApp/store/StoreBase';
import { PostRequestCallback } from '../../../services/APIServices/PostRequestCallback';
import { PostRequestCallbackCancel } from '../../../services/APIServices/PostRequestCallbackCancel';
import Match from '../Match';
import { IMatchData } from '../../interfaces/shared/IMatchData';
import { postMatchCancel } from '../../../services/APIServices/PostMatchCancel';
import { IInteraction } from '../../interfaces/shared/INegotiateInteraction';
import Aisin from '../Aisin';


export default class Load {
  rootStore: DriverAppStore;
  @observable loadId: string;
  @observable status: LoadStatus;
  @observable trackingNumber: string;
  @observable brokerId: string;
  @observable token: string;
  @observable source: string;
  @observable key: string;
  @observable payload: IPayload;
  @observable locationProcessingRetry: number;
  @observable locationProcessed: boolean;
  @observable postedBy: IPostedBy;
  @observable account?: any;
  @observable matchId: string;
  @observable rawLoad: ILoadData;
  @observable matches: Match[];
  @observable ral_id?: string;
  @observable matchStatus?: MatchStatus;
  @observable distanceInfo: google.maps.DistanceMatrixResponse = {
    destinationAddresses: [],
    originAddresses: [],
    rows: [],
  };
  @observable deadhead = '';
  @observable aisin = new Aisin(this, this.rootStore);
  @observable distanceStore = new StoreBase();
  @observable requestCallbackStore = new StoreBase();
  @observable loadBookingStore = new StoreBase();

  constructor(loadData: ILoadData, match?: Match) {
    const {
      _id: id, loadId, status, trackingNumber, brokerId, token, source, key, payload, locationProcessingRetry,
      locationProcessed, postedBy, matches, account,
    } = loadData;
    this.rawLoad = loadData;
    this.rootStore = driverAppStore;
    this.loadId = id || loadId;
    this.matchId = (match && match.id) || '';
    this.status = status;
    this.trackingNumber = trackingNumber;
    this.brokerId = brokerId;
    this.token = token;
    this.source = source;
    this.key = key;
    this.payload = payload;
    this.locationProcessingRetry = locationProcessingRetry;
    this.locationProcessed = locationProcessed;
    this.postedBy = postedBy;
    this.matches = matches ? matches.map((match) => new Match(match)) : match ? [match] : [];
    this.account = account;
  }

  @computed get id() {
    return this.loadId;
  }

  @computed get isMatch() {
    return Boolean(this.matchId && (this.matchId !== this.loadId));
  }

  @computed get contentDetails() {
    return this.payload.loads[0].loadContentDetails;
  }

  @computed get contact() {
    return {
      displayName: this.postedBy.displayName || '',
      email: ((this.postedBy.email && this.postedBy.email.toLowerCase().includes('donotsend'))
        || (!this.postedBy.email)) ? '' : this.postedBy.email,
      phone: this.postedBy.phone || '',
      companyName: this.postedBy.companyName || '',
    };
  }

  @computed get sourcePascalCase() {
    return this.source.charAt(0).toUpperCase() + this.source.slice(1);
  }

  @computed get certfiedLoad() {
    return this.source === 'FleetOps' || this.loadSmart;
  }

  @computed get loadSmart() {
    return this.source === 'loadsmart';
  }

  @computed get pickups(): ILoadAddress[] {
    return [{
      location: this.payload.tripDetails.pickupLocation,
      startDateTime: getDateTime(this.payload.tripDetails.pickupStartDate, this.payload.tripDetails.pickupStartTime),
      endDateTime: getDateTime(this.payload.tripDetails.pickupEndDate, this.payload.tripDetails.pickupEndTime),
      lat: this.payload.tripDetails.pickupCoordinates.lat,
      lng: this.payload.tripDetails.pickupCoordinates.lng,
      startTime: this.payload.tripDetails.pickupStartTime,
      endTime: this.payload.tripDetails.pickupEndTime,
    }];
  }

  @computed get dropoffs(): ILoadAddress[] {
    return this.payload.tripDetails.dropoffs.map((dropoff) => ({
      location: dropoff.dropoffLocation,
      startDateTime: getDateTime(dropoff.dropoffStartDate, dropoff.dropoffStartTime),
      endDateTime: getDateTime(dropoff.dropoffEndDate, dropoff.dropoffEndTime),
      lat: dropoff.dropoffCoordinates.lat,
      lng: dropoff.dropoffCoordinates.lng,
      startTime: dropoff.dropoffStartTime,
      endTime: dropoff.dropoffEndTime,
    }));
  }

  @computed get firstPickupOriginCoordinates(): ICoordinate | undefined {
    if (this.pickups[0].lat && this.pickups[0].lng) {
      return { lat: this.pickups[0].lat, lng: this.pickups[0].lng };
    }
  }

  @computed get firstDropoffOriginCoordinates(): ICoordinate | undefined {
    if (this.dropoffs[0].lat && this.dropoffs[0].lng) {
      return { lat: this.dropoffs[0].lat, lng: this.dropoffs[0].lng };
    }
  }

  @computed get firstDropoffCrossedDropoffDate() {
    const today = moment();
    return Boolean(this.dropoffs.length > 0 && (
      (this.dropoffs[0].endDateTime && (this.dropoffs[0].endDateTime.date() <= today.date()))
      || (this.dropoffs[0].startDateTime && (this.dropoffs[0].startDateTime.date() <= today.date()))
    ));
  }

  @computed get equipmentTypeFormatted() {
    if (this.contentDetails) {
      if (isObservableArray(this.contentDetails.equipmentTypes)) {
        return this.contentDetails.equipmentTypes.map(startCase).join(', ');
      }
      return getAllTrueKeysFormatted(this.contentDetails.equipmentTypes);
    }
  }

  @computed get equipmentSpecificationsFormatted() {
    return getAllTrueKeysFormatted(this.contentDetails.equipmentSpecifications);
  }

  @computed get distanceInMiles() {
    return this.distanceExists() ? this.distanceInfo.rows[0].elements[0].distance.text : '';
  }

  @computed get distanceInKilometers() {
    return this.distanceInMiles ? getValueFromFormattedAmount(this.distanceInMiles) * 1.609 : null;
  }

  @computed get deadheadInMiles() {
    return this.deadhead;
  }

  @computed get flatRate() {
    return (this.payload.loadPay.priceIsEstimated || this.payload.loadPay.amount <= 1) ? null : this.payload.loadPay;
  }

  @computed get perMileRate() {
    if (this.distanceExists() && this.payload.loadPay.amount && !this.payload.loadPay.priceIsEstimated) {
      return {
        ...getPerMileRateForMiles(getValueFromFormattedAmount(this.distanceInMiles), this.payload.loadPay.amount),
        currency: this.payload.loadPay.currency,
      };
    }
    return null;
  }

  @computed get freightType() {
    return this.contentDetails.ftl === undefined ? undefined : this.contentDetails.ftl ? 'FTL' : 'LTL';
  }

  @computed get isMultipleDropOffPickup() {
    return this.pickups.length > 1 || this.dropoffs.length > 1;
  }

  @computed get weightWithUnits() {
    if (this.contentDetails.weight && this.contentDetails.weight.amount) {
      return `${formatNumberToString(this.contentDetails.weight.amount)} ${this.contentDetails.weight.unit}`;
    }
    return '-';
  }

  @computed get weight() {
    if (this.contentDetails.weight && this.contentDetails.weight.amount) {
      return `${formatNumberToString(this.contentDetails.weight.amount)}`;
    }
    return '-';
  }

  @computed get dimensions() {
    if (!this.contentDetails || !this.contentDetails.dimensions || this.contentDetails.ftl) {
      return '';
    }
    const {
      height: { amount: hAmount, unit: hUnit },
      length: { amount: lAmount, unit: lUnit },
      width: { amount: wAmount, unit: wUnit },
    } = this.contentDetails.dimensions;
    let dimensions = '';
    if (hAmount) {
      dimensions = `H: ${hAmount} ${hUnit}`;
    }
    if (lAmount) {
      dimensions = `L: ${lAmount} ${lUnit}`;
    }
    if (wAmount) {
      dimensions = `W: ${wAmount} ${wUnit}`;
    }
    return dimensions;
  }

  @computed get careInstructions() {
    if (!this.contentDetails || !this.contentDetails.commodityDescription) {
      return '';
    }
    const { commodityDescription: { specialCareInstructions, description } } = this.contentDetails;
    let careInstructions = '';
    if (specialCareInstructions) {
      careInstructions = `${specialCareInstructions}`;
    }
    if (description) {
      careInstructions = `${description}`;
    }
    return careInstructions;
  }

  @computed get hazardous() {
    if (!this.contentDetails?.commodityDescription) {
      return '';
    }
    let hazardous = '';
    const { commodityDescription: { hazardousMaterialsCheck } } = this.contentDetails;
    if (hazardousMaterialsCheck) {
      hazardous = 'Hazardous Material: &#x2713';
    }
    return hazardous;
  }

  @computed get shippingNotes() {
    let notes = '';
    if (this.dimensions) {
      notes = `${this.dimensions}&nbsp;`;
    }
    if (this.careInstructions) {
      notes = `${this.careInstructions}&nbsp;`;
    }
    if (this.hazardous) {
      notes = `${this.hazardous}&nbsp;`;
    }
    return notes;
  }

  @computed get anyMatchAutomatedTrackingAssigned() {
    return this.matches.some((match) => Boolean(
      match.isAutomatedTracking && match.currentlyBeingTracked?.linkedMatchId,
    ));
  }

  @computed get anyMatchActiveRequestedCallback() {
    const matchFound = this.matches.find((match) => Boolean(match.matchActiveRequestedCallback));
    if (matchFound) {
      return matchFound.matchActiveRequestedCallback;
    }
    return null;
  }

  @computed get anyMatchBookedPending() {
    return (this.matches.find((match) => Boolean(match.matchBookedPending)));
  }

  @computed get loadBooked() {
    return this.status === LoadStatus.BOOKED;
  }

  @computed get matchBySelfMatchId() {
    // This continues the logic of isMatch
    // If the load is made from a match reference, then this.matches array holds only the match ref
    // That is why we can safely return the first match from the matches array
    if (this.isMatch) {
      return this.matches[0];
    }
    return null;
  }

  @computed get bookedMatch() {
    return this.matches.find((match) => match.matchBooked);
  }

  @computed get transitMatch() {
    return this.matches.find((match) => match.matchInTransit);
  }

  @computed get completedMatch() {
    return this.matches.find((match) => match.matchCompleted);
  }

  @computed get bookedOrCompletedMatch() {
    return this.completedMatch || this.transitMatch || this.bookedMatch;
  }

  @computed get isCancelled() {
    return this.matches.find((match) => match.matchCancelled);
  }

  @computed get getLoadDetailsPath() {
    return this.isMatch ? `/driver/match/${this.matchId}/detail` : `/driver/load/${this.loadId}/detail`;
  }

  @computed get companyLogo() {
    return this.postedBy.companyLogo;
  }

  @computed get driverTruckName() {
    if (this.isMatch) {
      const matchFound = this.matchBySelfMatchId;
      if (matchFound) {
        const driverTruck = this.rootStore.userStore.dispatcherTrucks.find((truck) => truck.personId === matchFound.personId);
        if (driverTruck) {
          return driverTruck.driverFullName;
        }
      }
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  @action.bound
  async downloadLoadWithDistanceInMiles() {
    if (this.distanceInfo.rows.length <= 0) {
      try {
        this.distanceStore.setLoading(true);
        const pickup = this.pickups[0];
        const dropoff = this.dropoffs[0];
        const distanceInfo = await ApiLayer.getDistance(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng);
        this.setDistanceInfo(distanceInfo);
      } catch (error) {
        console.log(`Error downloading Google Distance API: ${error}`);
      } finally {
        this.distanceStore.setLoading(false);
      }
    }
  }

  @action.bound
  setDistanceInfo(distanceInfo: google.maps.DistanceMatrixResponse) {
    this.distanceInfo = distanceInfo;
  }

  @action.bound
  trackContactButtonEvent(eventType) {
    const action = eventType === 'emailClick' ? 'EMAIL_CLICK' : 'PHONE_CLICK';
    ReactGA.event({
      category: GA_TRACKING.CATEGORIES.DRIVER,
      action: GA_TRACKING.ACTIONS[eventType === 'emailClick' ? 'EMAIL_CLICK' : 'PHONE_CLICK'],
    });
    trackPageView(GA_TRACKING.PAGEVIEWS[action]);

    mixpanelTrack(MIXPANEL_EVENTS.CONTACT, {
      Type: eventType === 'emailClick' ? 'Email' : 'Phone',
      ...mixpanelLoadProperties(this),
    });
  }

  distanceExists() {
    return this.distanceInfo.rows && this.distanceInfo.rows.length > 0
      && this.distanceInfo.rows[0] && this.distanceInfo.rows[0].elements[0].distance
      && this.distanceInfo.rows[0].elements[0].distance.text && this.distanceInfo.rows[0].elements[0].distance.value;
  }

  @action.bound
  updateDeadhead(deadhead) {
    this.deadhead = deadhead;
  }

  @action.bound
  setStatus(newLoadStatus: LoadStatus) {
    this.status = newLoadStatus;
  }

  @action.bound
  setMatches(matches: IMatchData[]) {
    this.matches = matches.map((match) => new Match(match));
  }

  @action.bound
  updateMatches(matchOrLoad: (ILoadData | IMatchData)) {
    if (this.isMatch) {
      const matchFound = this.matches.find((match) => match.matchId === this.matchId);
      if (matchFound) {
        matchFound.constructor(matchOrLoad);
      }
    } else {
      const { matches } = matchOrLoad as ILoadData;
      this.setMatches(matches || []);
    }
  }

  @action.bound
  calculateDeadheadInMiles = async (currentCoordinates: ICoordinate) => {
    let lat = 0;
    let lng = 0;
    if (!currentCoordinates || (!currentCoordinates.lat && !currentCoordinates.lng)) {
      const currentCoordinatesAPIResponse = await ApiLayer.getCurrentCoordinates();
      const { location } = currentCoordinatesAPIResponse;
      lat = location.lat;
      lng = location.lng;
    }
    if (!this.deadhead) {
      try {
        const pickup = this.pickups[0];
        const distanceFromAPI = await ApiLayer.getDistance(
          pickup.lat, pickup.lng, lat || currentCoordinates.lat, lng || currentCoordinates.lng,
        );
        const distanceText = distanceFromAPI.rows[0].elements[0].distance.text;
        this.updateDeadhead(distanceText);
        return distanceText;
      } catch (error) {
        return this.deadhead;
      }
    }
    return this.deadhead;
  };

  @action.bound
  dispatchLoadToDriver = async (driver: DriverTruck) => {
    try {
      const matchOrLoad = await PostLoadDispatch(this.isMatch ? this.matchId : this.loadId, driver.truckId, this.isMatch);
      this.updateMatches(matchOrLoad);
    } catch (error) {
      throw error;
    }
  };

  @action.bound // used for dispatchable driver accept & book shipment
  acceptLoad = async () => {
    try {
      const matchOrLoad = await PostLoadAccept(this.isMatch ? this.matchId : this.loadId, this.isMatch);
      this.updateMatches(matchOrLoad);
    } catch (error) {
      throw error;
    }
  };

  @action.bound
  declineLoad = async (userType: ('driver' | 'dispatcher'), reason?: string) => {
    try {
      const matchOrLoad = await PostLoadDecline(
        this.isMatch ? this.matchId : this.loadId, this.isMatch, userType, reason,
      );
      this.updateMatches(matchOrLoad);
    } catch (error) {
      throw error;
    }
  };

  @action.bound
  initiateRequestCallback = async (requestedDateTimestamp: number) => {
    try {
      this.requestCallbackStore.setLoading(true);
      const matchOrLoad = await PostRequestCallback(this.isMatch ? this.matchId : this.loadId, requestedDateTimestamp, this.isMatch);
      this.updateMatches(matchOrLoad);
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        `Request successfully sent for ${moment.unix(requestedDateTimestamp).format('dddd, MMMM Do, YYYY h:mm A')}`,
        { variant: 'success' },
      );
      mixpanelTrack(MIXPANEL_EVENTS.SEND_REQUEST_BUTTON, { ...mixpanelLoadProperties(this) });
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Technical error sending your request', { variant: 'error' });
      throw new Error(error);
    } finally {
      this.requestCallbackStore.setLoading(false);
    }
  };

  @action.bound
  cancelRequestCallback = async () => {
    try {
      this.requestCallbackStore.setLoading(true);
      const matchOrLoad = await PostRequestCallbackCancel(this.isMatch ? this.matchId : this.loadId, this.isMatch);
      this.updateMatches(matchOrLoad);
      this.rootStore.snackbarStore.enqueueSnackbarStore('Cancelled your callback successfully', { variant: 'success' });
      mixpanelTrack(MIXPANEL_EVENTS.CANCEL_REQUEST_BUTTON, { ...mixpanelLoadProperties(this) });
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Technical error sending your request', { variant: 'error' });
      throw new Error(error);
    } finally {
      this.requestCallbackStore.setLoading(false);
    }
  };

  @action.bound
  bookShipment = async () => {
    try {
      this.loadBookingStore.setLoading(true);
      // Dispatcher books matches/loads for drivers
      // Handle load case as usual
      // When a match is being booked, we need to make sure the match had been dispatched
      // RDSP event is added for their drivers' matches
      // If RDSP event is found, use the matchId from the event to book
      // If RDSP event is not found, dispatch the load
      // Then use the matchId from RDSP event to book the match
      if (this.rootStore.userStore.dispatcher && this.isMatch && (this.matchBySelfMatchId?.personId !== this.rootStore.userStore.FOUser.truck?.personId)) {
        if (this.matchBySelfMatchId.receivedDispatchEvent) {
          // RDSP event found, directly book the load
          await PostLoadAccept(this.matchBySelfMatchId.receivedDispatchEvent.matchId, true);
        } else {
          // RDSP event not found, first dispatch and then book the load
          const matchDriverTruck = this.rootStore.userStore.FOUser.drivers?.find((driver) => driver.personId === this.matchBySelfMatchId?.personId);
          if (matchDriverTruck) {
            await this.dispatchLoadToDriver(matchDriverTruck);
            if (this.matchBySelfMatchId.receivedDispatchEvent) {
              const { matchId } = this.matchBySelfMatchId.receivedDispatchEvent as IInteraction;
              await PostLoadAccept(matchId, true);
            }
          }
        }
      } else {
        await this.acceptLoad();
      }
      this.loadBookingStore.setLoading(false);
      if (!this.rootStore.matchStore.activeLoads.results.find((load) => load.matchId === this.matchId)) {
        this.rootStore.matchStore.activeLoads.setResults([this, ...this.rootStore.matchStore.activeLoads.results]);
      }
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Technical error booking your shipment', { variant: 'error' });
      this.loadBookingStore.setLoading(false);
      throw error;
    }
  };

  @action.bound
  cancelShipment = async () => {
    try {
      const match = await postMatchCancel(this.isMatch ? this.matchId : this.loadId);
      // Should be match status cancel. But component is crashing when changing match status. This is interim solution until reason for component crash is found.
      // this.updateMatches(matchOrLoad);
      this.setStatus(LoadStatus.CANCELLED);
      this.rootStore.snackbarStore.enqueueSnackbarStore('Shipment cancelled', { variant: 'warning' });
    } catch (error) {
      console.log(error);
      this.rootStore.snackbarStore.enqueueSnackbarStore('Technical error trying to cancel shipment', { variant: 'error' });
      throw error;
    }
  };
}
