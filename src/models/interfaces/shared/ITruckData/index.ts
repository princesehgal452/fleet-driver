import { IPreferredPerMileRate } from '../IPreferredPerMileRate';
import { IDropoffTruck } from '../IDropoffTruck';
import { IPickupTruck } from '../IPickupTruck';
import { IRadius } from '../IRadius';


export interface ITruckData {
  id: string;
  firebaseUID: string;
  availableDate: string | null;
  expiresOn: string | null;
  perMileRate: IPreferredPerMileRate;
  personId: string;
  dropoff: IDropoffTruck;
  pickup: IPickupTruck;
  radius: IRadius;
  timestamp: number;
  equipment: string;
  equipmentTypeList: 'Van' |
    'Reefer' |
    'Flatbed' |
    'Stepdeck' |
    'Power only' |
    'Hopper bottom' |
    'Double drop' |
    'Dump trailer' |
    'Low boy' |
    'Auto carrier' |
    'Tanker' |
    'Containers' |
    'Conestoga'[];
}
