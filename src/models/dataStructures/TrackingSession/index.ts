import moment from 'moment';
import { action, computed, observable } from 'mobx';
import {
  ITrackingDetails,
  ITrackingIntegration,
  ITrackingLoad,
  ITrackingLocation,
  ITrackingSession,
} from '../../interfaces/shared/ITrackingSession';
import { ICoordinate } from '../../interfaces/shared/ICoordinate';
import { ILoadAddress } from '../../interfaces/shared/ILoadAddress';
import { MatchStatus, TrackingMatchStatus, TrackingTripStatus } from '../../../services/constants';
import StoreBase from '../../../DriverApp/store/StoreBase';
import patchTrackingSession from '../../../services/APIServices/PatchTrackingSession';
import driverAppStore, { DriverAppStore } from '../../../DriverApp/store/DriverAppStore';
import ApiLayer from '../../../services/APIServices/ApiLayer';
import { ITrackingCarrier } from '../../interfaces/shared/ITrackingCarrier';


export default class TrackingSession extends StoreBase implements ITrackingSession {
  rootStore: DriverAppStore;
  @observable uuid: string;
  @observable details: ITrackingDetails;
  @observable carrier: ITrackingCarrier;
  @observable load: ITrackingLoad;
  @observable integration: ITrackingIntegration;
  @observable matchReferenceId: string;
  @observable timestamp: number;
  @observable deadhead: string;
  @observable distanceStore = new StoreBase();
  @observable distanceInfo: google.maps.DistanceMatrixResponse = {
    destinationAddresses: [],
    originAddresses: [],
    rows: [],
  };

  constructor(trackingSessionData: ITrackingSession) {
    super();
    this.rootStore = driverAppStore;
    const {
      uuid,
      details,
      carrier,
      load,
      integration,
      matchReferenceId,
      timestamp,
    } = trackingSessionData;

    this.uuid = uuid;
    this.details = details;
    this.carrier = carrier;
    this.load = load;
    this.integration = integration;
    this.matchReferenceId = matchReferenceId;
    this.timestamp = timestamp;
    this.deadhead = '';
  }

  @computed get pickupCoordinates(): ICoordinate {
    return {
      lat: this.pickup.lat || 0,
      lng: this.pickup.lng || 0,
    };
  }

  @computed get dropoffCoordinates(): ICoordinate {
    return {
      lat: this.dropoff.lat || 0,
      lng: this.dropoff.lng || 0,
    };
  }

  @computed get pickup(): ILoadAddress {
    return this.parseTrackingLocation(this.load.pickup);
  }

  @computed get dropoff(): ILoadAddress {
    return this.parseTrackingLocation(this.load.dropoff);
  }

  @computed get distanceInMiles() {
    return this.distanceExists() ? this.distanceInfo.rows[0].elements[0].distance.text : null;
  }

  parseTrackingLocation = (trackingLocation: ITrackingLocation) => ({
    lat: trackingLocation.coordinates.latitude,
    lng: trackingLocation.coordinates.longitude,
    startDateTime: moment.unix(trackingLocation.windowStartTimestamp),
    endDateTime: moment.unix(trackingLocation.windowEndTimestamp),
    city: trackingLocation.address.city,
    streetNumber: `${trackingLocation.address.streetNumber}`,
    streetName: trackingLocation.address.streetName,
    country: trackingLocation.address.country,
    postalCode: trackingLocation.address.postalCode,
    state: trackingLocation.address.state,
    location: `${trackingLocation.address.streetNumber} ${trackingLocation.address.streetName}, ${trackingLocation.address.city}, ${trackingLocation.address.state}`,
  });

  distanceExists() {
    return this.distanceInfo.rows && this.distanceInfo.rows.length > 0
      && this.distanceInfo.rows[0] && this.distanceInfo.rows[0].elements[0].distance
      && this.distanceInfo.rows[0].elements[0].distance.text && this.distanceInfo.rows[0].elements[0].distance.value;
  }

  @action.bound
  async updateTrackingTripStatus(status: TrackingTripStatus) {
    try {
      this.setLoading(true);
      const result = await patchTrackingSession(this.uuid, { tripStatus: TrackingMatchStatus[status] });
      this.updateSelf(result);
    } catch (e) {
      this.setError(e);
      this.rootStore.snackbarStore.enqueueSnackbarStore('Error Updating Trip Status', { variant: 'error' });
      throw new Error(e);
    } finally {
      this.setLoading(false);
    }
  }

  @action.bound
  updateSelf(trackingSessionData: ITrackingSession) {
    this.constructor(trackingSessionData);
  }

  @action.bound
  updateDeadhead(deadhead) {
    this.deadhead = deadhead;
  }

  @action.bound
  setDistanceInfo(distanceInfo: google.maps.DistanceMatrixResponse) {
    this.distanceInfo = distanceInfo;
  }

  @action.bound
  async calculateDeadheadInMiles(currentCoordinates: ICoordinate) {
    if (!this.deadhead && currentCoordinates && (currentCoordinates.lat || currentCoordinates.lng)) {
      try {
        this.distanceStore.setLoading(true);
        const distanceFromAPI = await ApiLayer.getDistance(
          this.pickupCoordinates.lat, this.pickupCoordinates.lng, currentCoordinates.lat, currentCoordinates.lng,
        );
        const distanceText = distanceFromAPI.rows[0].elements[0].distance.text;
        this.updateDeadhead(distanceText);
      } catch (error) {
      } finally {
        this.distanceStore.setLoading(false);
      }
    }
  }

  @action.bound
  async downloadSessionDistanceInMiles() {
    if (this.distanceInfo.rows.length <= 0) {
      try {
        this.distanceStore.setLoading(true);
        const distanceInfo = await ApiLayer.getDistance(
          this.pickupCoordinates.lat, this.pickupCoordinates.lng, this.dropoffCoordinates.lat, this.dropoffCoordinates.lng,
        );
        this.setDistanceInfo(distanceInfo);
      } catch (error) {
        console.log(`Error downloading Google Distance API: ${error}`);
      } finally {
        this.distanceStore.setLoading(false);
      }
    }
  }
}
