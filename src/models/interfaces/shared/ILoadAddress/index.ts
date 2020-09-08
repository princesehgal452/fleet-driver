import { IAddressDetails } from '../IAddressDetails';

export interface ILoadAddress extends IAddressDetails {
  location: string;
  startDateTime?: Moment;
  endDateTime?: Moment;
  lat?: number;
  lng?: number;
  startTime?: string;
  endTime?: string;
}
