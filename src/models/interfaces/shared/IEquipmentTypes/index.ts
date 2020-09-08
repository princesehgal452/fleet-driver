import { ISpecialized } from '../ISpecialized';
import { IFlatbed } from '../IFlatbed';

export interface IEquipmentTypes {
  powerOnly: boolean;
  container: boolean;
  specialized: ISpecialized;
  van: boolean;
  flatbed: IFlatbed;
  reefer: boolean;
  auto: boolean;
  dumpTruck: boolean;
  tanker: boolean;
  hopperBottom: boolean;
}
