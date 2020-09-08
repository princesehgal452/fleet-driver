import { AisinRouteType } from '../../../../services/constants';
import { IAisinEntryExitInfo } from '../IAisinEntryExitInfo';


export interface IAisinTourListInfo {
  name?: string; // route name
  number?: number; // route number
  frame?: number; // frame code
  type: AisinRouteType;
  distance?: number; // unit in meters, missing from API but present in doc
  entry: IAisinEntryExitInfo;
  exit: IAisinEntryExitInfo;
}
