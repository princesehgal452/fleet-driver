import { IAisinVehicle } from '../IAisinVehicle';
import { AisinRouteSearchType } from '../../../../services/constants';
import { IAisinCoordinate } from '../IAisinCoordinate';


export interface IAisinRequestStart {
  coordinate: IAisinCoordinate;
}

export interface IAisinRequestRouteAttribute {
  vehicle?: IAisinVehicle;
  avoidFerries?: boolean;
  targetTime?: number; // unix timestamp
}

export interface IAisinRequestGuideAttribute {
  tourlist: boolean;
}

export interface IAisinRequestDest extends IAisinRequestStart {
  passagePointList?: object[];
  routeSearchType?: AisinRouteSearchType[];
  routeAttribute?: IAisinRequestRouteAttribute;
  guideAttribute?: IAisinRequestGuideAttribute;
}

export interface IAisinRouteServiceRequest {
  start: IAisinRequestStart;
  destList: IAisinRequestDest[];
}
