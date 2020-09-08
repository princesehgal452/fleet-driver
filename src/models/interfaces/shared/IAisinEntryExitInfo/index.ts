import { IAisinCoordinate } from '../IAisinCoordinate';
import { IAisinEntryExitRouteDirectionsInfo } from '../IAisinEntryExitGuidance';


export interface IAisinEntryExitInfo {
  coordinatesIndex: number;
  coordinate: IAisinCoordinate;
  guidance?: IAisinEntryExitRouteDirectionsInfo;
}
