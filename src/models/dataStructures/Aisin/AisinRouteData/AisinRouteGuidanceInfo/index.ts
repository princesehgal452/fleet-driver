import { IAisinTourListInfo } from '../../../../interfaces/shared/IAisinRouteGuidanceInfo';
import { AisinRouteType } from '../../../../../services/constants';
import { IAisinEntryExitInfo } from '../../../../interfaces/shared/IAisinEntryExitInfo';
import { action, computed, observable } from 'mobx';
import { convertMetersToMiles } from '../../../../../utils/utility';
import { IAisinEntryExitRouteDirectionsInfo } from '../../../../interfaces/shared/IAisinEntryExitGuidance';


export default class AisinRouteGuidanceInfo implements IAisinTourListInfo {
  @observable name?: string;
  @observable number?: number;
  @observable frame?: number;
  @observable type: AisinRouteType;
  @observable distance?: number;
  @observable entry: IAisinEntryExitInfo;
  @observable exit: IAisinEntryExitInfo;

  constructor(aisinRouteGuidanceInfo: IAisinTourListInfo) {
    const { name, number: routeNumber, frame, type, distance, entry, exit } = aisinRouteGuidanceInfo;
    this.name = name;
    this.number = routeNumber;
    this.frame = frame;
    this.type = type;
    this.distance = distance;
    this.entry = entry;
    this.exit = exit;
  }

  @computed get routeGuideDistanceInMiles() {
    return this.distance ? convertMetersToMiles(this.distance) : undefined;
  }

  @action.bound
  addGuidanceInfo(guidanceInfo: IAisinEntryExitRouteDirectionsInfo) {
    if (this.entry.coordinatesIndex === guidanceInfo.coordinatesIndex) {
      this.entry.guidance = guidanceInfo;
    } else if (this.exit.coordinatesIndex === guidanceInfo.coordinatesIndex) {
      this.exit.guidance = guidanceInfo;
    }
  }
}
