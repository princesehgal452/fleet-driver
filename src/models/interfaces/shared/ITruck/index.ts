import { IPreferredLanes } from '../IPreferredLanes';
import { IPreferredPerMileRate } from '../IPreferredPerMileRate';
import { IFleet } from '../IFleet';


export interface ITruck {
  asOf: Date;
  bearing: string;
  hosStatus: string;
  personId: string;
  speed: string;
  source: string;
  firstName: string;
  lastName: string;
  email: string;
  mcNumber: string;
  phone: string;
  equipmentTypeList: string[];
  preferredLanes?: IPreferredLanes;
  preferredPerMileRate?: IPreferredPerMileRate;
  userType?: string;
  fleet?: IFleet;
  lastLogin?: Date;
}
