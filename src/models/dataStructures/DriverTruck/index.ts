import { action, computed, observable } from 'mobx';
import StoreBase from '../../../DriverApp/store/StoreBase';
import { IDriverTruck } from '../../interfaces/shared/IDriverTruck';
import { IHosSettings } from '../../interfaces/shared/IHosSettings';
import { IPreferredPerMileRate } from '../../interfaces/shared/IPreferredPerMileRate';
import { IPreferredLanes } from '../../interfaces/shared/IPreferredLanes';
import { DispatchableType } from '../DispatchableType';
import { ICoordinate } from '../../interfaces/shared/ICoordinate';
import driverAppStore, { DriverAppStore } from '../../../DriverApp/store/DriverAppStore';
import { ILastLocation } from '../../interfaces/shared/ILastLocation';
import { IFleet } from '../../interfaces/shared/IFleet';
import { TruckRoles } from '../TruckRoles';
import { CollectionsStore } from '../../../DriverApp/store/CollectionsStore';
import { GetMatches } from '../../../services/APIServices/GetMatches';
import { MatchStatus } from '../../../services/constants';
import ApiLayer from '../../../services/APIServices/ApiLayer';
import { GetPostedTrucks } from '../../../services/APIServices/GetPostedTrucks';
import { getLocationText } from '../../../utils/utility';
import patchUserPermissions from '../../../services/APIServices/PatchUserPermissions';
import TrackingSessionsStore from '../../../DriverApp/store/TrackingSessionsStore';


export class DriverTruck extends StoreBase implements IDriverTruck {
  rootStore: DriverAppStore;
  rawDriverTruck: IDriverTruck;
  @observable personId: string;
  @observable email: string;
  @observable fleetId: string;
  @observable firstName: string;
  @observable lastName: string;
  @observable hosSettings: IHosSettings;
  @observable roles: TruckRoles[];
  @observable phone: string;
  @observable freightType: string;
  @observable preferredLane: string;
  @observable homeCountry: string;
  @observable crossBorder: boolean;
  @observable dotNumber: string;
  @observable mcNumber: string;
  @observable equipmentTypeList: string[];
  @observable preferredPerMileRate: IPreferredPerMileRate;
  @observable truckCount: number;
  @observable officePhone: string;
  @observable companyName: string;
  @observable preferredLanes: IPreferredLanes;
  @observable truckId: string;
  @observable lastLocation?: ILastLocation;
  @observable dispatchable?: DispatchableType;
  @observable deadhead: string;
  @observable AUMatches: CollectionsStore;
  @observable RALMatches: CollectionsStore;
  @observable RALRequests: CollectionsStore;
  @observable trackingSessionsStore: TrackingSessionsStore;
  @observable fleet?: IFleet;
  @observable permissions: IDriverPermissions;
  @observable geolocation: string;
  @observable shortCode: string;

  constructor(driverTruckData: IDriverTruck) {
    super();
    this.rootStore = driverAppStore;
    this.rawDriverTruck = driverTruckData;
    this.personId = driverTruckData.personId;
    this.email = driverTruckData.email;
    this.fleetId = driverTruckData.fleetId;
    this.firstName = driverTruckData.firstName;
    this.lastName = driverTruckData.lastName;
    this.hosSettings = driverTruckData.hosSettings;
    this.roles = driverTruckData.roles;
    this.phone = driverTruckData.phone;
    this.freightType = driverTruckData.freightType;
    this.preferredLane = driverTruckData.preferredLane;
    this.homeCountry = driverTruckData.homeCountry;
    this.crossBorder = driverTruckData.crossBorder;
    this.dotNumber = driverTruckData.dotNumber;
    this.mcNumber = driverTruckData.mcNumber;
    this.equipmentTypeList = driverTruckData.equipmentTypeList;
    this.preferredPerMileRate = driverTruckData.preferredPerMileRate;
    this.truckCount = driverTruckData.truckCount;
    this.officePhone = driverTruckData.officePhone;
    this.companyName = driverTruckData.companyName;
    this.preferredLanes = driverTruckData.preferredLanes;
    this.truckId = driverTruckData.truckId;
    this.lastLocation = driverTruckData.lastLocation;
    this.dispatchable = driverTruckData.dispatchable;
    this.fleet = driverTruckData.fleet;
    this.permissions = driverTruckData.permissions || {};
    this.deadhead = '-';
    this.geolocation = '';
    this.AUMatches = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.automatedMatch);
    this.RALMatches = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.requestedALoaddMatch);
    this.RALRequests = new CollectionsStore(this.rootStore, true, GetPostedTrucks);
    this.shortCode = driverTruckData.shortCode || '';
    this.trackingSessionsStore = new TrackingSessionsStore(this.rootStore, this.personId);
  }

  @computed get driverCoordinates() {
    return {
      lat: Number(this.lastLocation?.position.lat),
      lng: Number(this.lastLocation?.position.lon),
    } as ICoordinate;
  }

  @computed get driverFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @computed get driverInitials() {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`;
  }
  
  @action.bound setDeadhead(deadhead: string) {
    this.deadhead = deadhead;
  }

  @action.bound setGeolocation(geolocation: string) {
    this.geolocation = geolocation;
  }

  @action.bound
  calculateDriverDeadheadInMiles = async (loadCoordinate: ICoordinate) => {
    if (!this.lastLocation || (!this.lastLocation.position.lat && !this.lastLocation.position.lon)
      || (!loadCoordinate.lat && !loadCoordinate.lng)) {
      return;
    }
    try {
      this.setLoading(true);
      const distanceFromAPI = await ApiLayer.getDistance(
        loadCoordinate.lat, loadCoordinate.lng, this.lastLocation.position.lat, this.lastLocation.position.lon,
      );
      this.setLoading(false);
      const distance = distanceFromAPI.rows[0].elements[0].distance.text;
      this.setDeadhead(distance || '-');
    } catch (error) {
      console.log('error calculating deadhead for driver');
    }
  };

  @action.bound
  sendNewRALRequest = async (query) => {
    try {
      await ApiLayer.postMyTruck(query);
      this.RALRequests.setResults([]);
      this.RALRequests.clearCache();
      await this.RALRequests.downloadResults(1, this.RALRequests.args);
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        'Sorry, there was an error posting your request', { variant: 'error' },
      );
    }
  };

  @action.bound
  deleteRALRequest = async (requestId) => {
    const ralRequestsPreserved = [...this.RALRequests.results];
    try {
      this.RALRequests.deleteItemFromResults(requestId);
      await ApiLayer.deletePostedTruck(requestId, this.personId);
      this.rootStore.snackbarStore.enqueueSnackbarStore('Your request has been deleted',
        { variant: 'success' });
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Sorry, there was an error deleting your request',
        { variant: 'error' });
      this.RALRequests.updateResults(ralRequestsPreserved);
    }
  };

  @action.bound
  getGeolocation() {
    if (this.driverCoordinates.lat && this.driverCoordinates.lng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: this.driverCoordinates }, (geocodeResults) => {
        if (geocodeResults && geocodeResults.length > 0) {
          let city = '';
          let state = '';
          let country = '';
          geocodeResults[0].address_components.forEach((addressComponent) => {
            if (addressComponent.types.includes('locality')) {
              city = addressComponent.long_name;
            }
            if (addressComponent.types.includes('administrative_area_level_1')) {
              state = addressComponent.short_name;
            }
            if (addressComponent.types.includes('country')) {
              country = addressComponent.short_name;
            }
          });
          this.setGeolocation(getLocationText(city, state, country));
        }
      });
    }
  }

  @action.bound
  setPermissions = (permissionKey: string, permissionValue: boolean) => {
    this.permissions[permissionKey] = permissionValue;
  };

  @action.bound
  setEquipmentType = (updatedEquipmentTypeList) => {
    this.equipmentTypeList = observable([...updatedEquipmentTypeList]);
  };

  @action.bound
  updatePermissions = async (permissionKey: string, permissionValue: boolean) => {
    this.setPermissions(permissionKey, permissionValue);
    try {
      await patchUserPermissions(this.personId, permissionKey, permissionValue);
    } catch (e) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Error updating permissions', { variant: 'error' });
      this.setPermissions(permissionKey, permissionValue);
    }
  };

  @action.bound
  updateEquipmentType = (updatedEquipmentTypeList) => {
    const existingEquipmentType = this.equipmentTypeList;
    try {
      this.rootStore.userStore.updateDispatcherTrucks(
        this.rootStore.userStore.dispatcherTrucks.map((dispatcherTruck) => {
          if (dispatcherTruck.personId === this.personId) {
            return {
              ...dispatcherTruck,
              equipmentTypeList: updatedEquipmentTypeList,
              rawDriverTruck: { ...this.rawDriverTruck, equipmentTypeList: updatedEquipmentTypeList },
            };
          }
          return {
            ...dispatcherTruck,
          };
        }),
      );
      this.setEquipmentType(updatedEquipmentTypeList);
    } catch (e) {
      this.setEquipmentType(existingEquipmentType);
    }
  };
}
