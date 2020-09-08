import { ICoordinate } from '../ICoordinate';


export interface IDownloadCurrentLocationResponse {
  address: string;
  coordinates: ICoordinate;
}
