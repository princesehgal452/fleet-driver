import { IRadius } from '../IRadius';
import { ICoordinate } from '../ICoordinate';

interface IPickupLocation {
  address: string;
  coordinates: ICoordinate;
}

export class ISearchQuery {
  radius?: IRadius;
  pickupLocation?: IPickupLocation;
}
