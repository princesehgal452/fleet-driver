import { ICoordinate } from "../ICoordinate";

export interface IOperatingLane {
  rank: number;
  pickup: ILaneAddress;
  dropoff: ILaneAddress;
  name?: string;
}

export interface ILaneAddress {
  city: string;
  state: string;
  country: string;
  coordinates?: ICoordinate;
}
