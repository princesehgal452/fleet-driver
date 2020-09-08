import { IDropoffLoad } from '../IDropoffLoad';
import { ICoordinate } from '../ICoordinate';

export interface ITripDetails {
  dropoffs: IDropoffLoad[];
  pickupLocation: string;
  pickupStartTime: string;
  pickupEndTime: string;
  hideAddressInfo: boolean;
  pickupStartDate: string;
  pickupCoordinates: ICoordinate;
  pickupEndDate: string;
}
