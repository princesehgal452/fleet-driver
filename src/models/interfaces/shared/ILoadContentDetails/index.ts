import { ICommodityDescription } from '../ICommodityDescription';
import { IHandlingUnits } from '../IHandlingUnits';
import { ILtl } from '../ILtl';
import { IAdditional } from '../IAdditional';
import { IEquipmentTypes } from '../IEquipmentTypes';
import { IWeight } from '../IWeight';
import { IDimensions } from '../IDimensions';
import { IPackage } from '../IPackage';
import { IEquipmentSpecifications } from '../IEquipmentSpecifications';


export interface ILoadContentDetails {
  package: IPackage;
  dimensions: IDimensions;
  ltl: ILtl;
  ftl?: boolean;
  stackable?: boolean;
  dropoffLocation: string;
  equipmentSpecifications: IEquipmentSpecifications;
  additional: IAdditional;
  equipmentTypes: IEquipmentTypes;
  weight: IWeight;
  commodityDescription: ICommodityDescription;
  handlingUnits: IHandlingUnits;
}
