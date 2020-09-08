import { action, computed, IObservableArray, observable } from 'mobx';
import { IAisinRouteData } from '../../../interfaces/shared/IAisinRouteData';
import { IAisinCoordinate } from '../../../interfaces/shared/IAisinCoordinate';
import { IAisinVehicle } from '../../../interfaces/shared/IAisinVehicle';
import { AisinRouteSearchType } from '../../../../services/constants';
import { IAisinTourListInfo } from '../../../interfaces/shared/IAisinRouteGuidanceInfo';
import { ICoordinate } from '../../../interfaces/shared/ICoordinate';
import { calculateAverageCoordinates, convertMetersToMiles } from '../../../../utils/utility';
import { getAisinRouteGuidanceDirections } from '../../../../services/APIServices/GetAisinRouteGuidanceDirections';
import { getAisinTourList } from '../../../../services/APIServices/GetAisinTourList';
import { IAisinEntryExitRouteDirectionsInfo } from '../../../interfaces/shared/IAisinEntryExitGuidance';
import { DriverAppStore } from '../../../../DriverApp/store/DriverAppStore';
import AisinRouteGuidanceInfo from './AisinRouteGuidanceInfo';
import Load from '../../Load';
import StoreBase from '../../../../DriverApp/store/StoreBase';


export default class AisinRouteData extends StoreBase implements IAisinRouteData {
  rootStore: DriverAppStore;
  parentLoad: Load;
  @observable routeSearchType: AisinRouteSearchType;
  @observable coordinateList: IAisinCoordinate[];
  @observable turnaroundTime: number;
  @observable routeDistance: number;
  @observable toll: number;
  @observable vehicle?: IAisinVehicle;
  @observable routeID: number;
  @observable tourList: IObservableArray<IAisinTourListInfo>; // Do not use in components directly, use routeGuidance
  @observable routeDirections: IObservableArray<IAisinEntryExitRouteDirectionsInfo>; // Do not use in components directly, use routeGuidance

  constructor(aisinRouteData: IAisinRouteData, parentLoad: Load, rootStore: DriverAppStore) {
    super();
    const { routeSearchType, coordinateList, turnaroundTime, routeDistance, toll, vehicle, routeID } = aisinRouteData;
    this.routeSearchType = routeSearchType;
    this.coordinateList = coordinateList;
    this.turnaroundTime = turnaroundTime;
    this.routeDistance = routeDistance;
    this.toll = toll;
    this.vehicle = vehicle;
    this.routeID = routeID;
    this.tourList = observable([]);
    this.routeDirections = observable([]);
    this.parentLoad = parentLoad;
    this.rootStore = rootStore;
  }

  @computed get aisinCoodrinateToGoogleCoordinates(): ICoordinate[] {
    return this.coordinateList.map((coordinate) => ({ lat: coordinate.lat, lng: coordinate.lon }));
  }

  @computed get averageGoogleCoordinates(): ICoordinate {
    return calculateAverageCoordinates(this.aisinCoodrinateToGoogleCoordinates);
  }

  @computed get turnaroundHours() {
    return Math.floor(this.turnaroundTime / 3600);
  }

  @computed get turnaroundMinutes() {
    return Math.floor((this.turnaroundTime % 3600) / 60);
  }

  @computed get routeDistanceInMiles() {
    return convertMetersToMiles(this.routeDistance);
  }

  @computed get routeGuidance(): AisinRouteGuidanceInfo[] | undefined {
    return this.tourList ? this.tourList.map((tour) => new AisinRouteGuidanceInfo(tour)) : undefined;
  }

  @computed get longestGuidedRoute() {
    if (!this.routeGuidance) {
      return null;
    }

    const routeGuidanceWithName = this.routeGuidance?.find((guidanceItem) => Boolean(guidanceItem.name));

    return this.routeGuidance.reduce((acc, guidanceItem) => ((acc && acc.name && acc.distance && guidanceItem.name && guidanceItem.distance)
      ? acc.distance > guidanceItem.distance
        ? acc
        : guidanceItem
      : acc), routeGuidanceWithName);
  }

  @action.bound
  setRouteDirections(routeDirections: IAisinEntryExitRouteDirectionsInfo[]) {
    this.routeDirections.replace(routeDirections);
  }

  @action.bound
  setTourList(tourList: IAisinTourListInfo[]) {
    this.tourList.replace(tourList);
  }

  @action.bound
  async downloadTourList() {
    if (!this.loading) {
      try {
        this.setLoading(true);
        const tourList = await getAisinTourList(this.routeID);
        this.setTourList(tourList);
      } catch (e) {
        console.log(e);
      } finally {
        this.setLoading(false);
      }
    }
  }

  @action.bound
  async downloadRouteDirectionsInfo() {
    if (!this.loading) {
      try {
        this.setLoading(true);
        const routeDirectionsInfos = await getAisinRouteGuidanceDirections(this.routeID);
        this.setRouteDirections(routeDirectionsInfos);
        this.routeGuidance?.forEach((routeGuide) => routeDirectionsInfos.forEach((routeDirections) => {
          routeGuide.addGuidanceInfo(routeDirections);
        }));
      } catch (e) {
        console.log(e);
      } finally {
        this.setLoading(false);
      }
    }
  }
}
