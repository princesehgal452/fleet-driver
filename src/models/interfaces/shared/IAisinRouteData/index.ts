import { IAisinCoordinate } from '../IAisinCoordinate';
import { IAisinVehicle } from '../IAisinVehicle';
import { IAisinTourListInfo } from '../IAisinRouteGuidanceInfo';
import { AisinRouteSearchType } from '../../../../services/constants';


export interface IAisinRouteData {
  coordinateList: IAisinCoordinate[];
  turnaroundTime: number; // in seconds
  routeDistance: number; // in meter
  toll: number; // toll cost
  vehicle?: IAisinVehicle;
  routeSearchType: AisinRouteSearchType; // routeSearchType
  routeID: number;
}
