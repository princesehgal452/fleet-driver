import { IHosSettings } from '../IHosSettings';
import { IPreferredPerMileRate } from '../IPreferredPerMileRate';
import { IPreferredLanes } from '../IPreferredLanes';
import { DispatchableType } from '../../../dataStructures/DispatchableType';
import { ILastLocation } from '../ILastLocation';
import { IFleet } from '../IFleet';
import { TruckRoles } from '../../../dataStructures/TruckRoles';


export interface IDriverTruck {
  personId: string;
  email: string;
  fleetId: string;
  firstName: string;
  lastName: string;
  hosSettings: IHosSettings;
  roles: TruckRoles[];
  phone: string;
  freightType: string;
  preferredLane: string;
  homeCountry: string;
  crossBorder: boolean;
  dotNumber: string;
  mcNumber: string;
  equipmentTypeList: string[];
  preferredPerMileRate: IPreferredPerMileRate;
  truckCount: number;
  officePhone: string;
  companyName: string;
  preferredLanes: IPreferredLanes;
  truckId: string;
  lastLocation?: ILastLocation;
  dispatchable?: DispatchableType;
  fleet?: IFleet;
  permissions?: IDriverPermissions;
  shortCode?: string;
}
