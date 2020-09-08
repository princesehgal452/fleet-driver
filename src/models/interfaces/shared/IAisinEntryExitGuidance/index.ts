import { AisinGuidanceCode } from '../../../../services/constants';
import { IAisinCoordinate } from '../IAisinCoordinate';


export interface IAisinEntryExitRouteDirectionsInfo {
  guideCode: AisinGuidanceCode;
  coordinatesIndex: number;
  coordinate: IAisinCoordinate;
}
