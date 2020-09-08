import { ICoordinate } from '../ICoordinate';

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  coordinate?: ICoordinate;
}
