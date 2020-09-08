import { TrackingTripStatus } from '../../../../services/constants';
import { ITrackingCarrier } from '../ITrackingCarrier';


export interface ITrackingCoordinates {
  latitude: number;
  longitude: number;
}

export interface ITrackingAddress {
  streetNumber: number;
  streetName: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface ITrackingLocation {
  address: ITrackingAddress;
  coordinates: ITrackingCoordinates;
  windowStartTimestamp: number;
  windowEndTimestamp: number;
}

export interface ITrackingContact {
  name: string;
  phone: string;
  email: string;
}

export interface ITrackingLoad {
  referenceId: string;
  equipmentType: string;
  pickup: ITrackingLocation;
  dropoff: ITrackingLocation;
  contact: ITrackingContact;
  notes: string[];
}

export interface ITrackingIntegration {
  partnerName: string;
  partnerLogo: string;
}

export interface ITrackingDetailsCoordinates extends ITrackingCoordinates {
  timestamp: number;
}

export interface ITrackingDetails {
  delayed: boolean;
  tripStatus: TrackingTripStatus;
  coordinates: ITrackingDetailsCoordinates;
}

export interface ITrackingSession {
  uuid: string;
  details: ITrackingDetails;
  carrier: ITrackingCarrier;
  load: ITrackingLoad;
  integration: ITrackingIntegration;
  matchReferenceId: string;
  timestamp: number;
}
