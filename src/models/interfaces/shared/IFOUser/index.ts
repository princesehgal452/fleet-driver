import { IObservableArray } from 'mobx';
import { IPreferredPerMileRate } from '../IPreferredPerMileRate';
import { ICommunicationsPreferences } from '../ICommunicationsPreferences';
import { IPreferredLanes } from '../IPreferredLanes';
import { IUploadedFiles } from '../IUploadedFiles';
import { IAdditionalInfo } from '../IAdditionalInfo';
import { ITutorial } from '../ITutorial';
import { IAddress } from '../IAddress';
import { IOperatingLane } from '../IOperatingLanes';
import { IAgreedToTermsAndConditions } from '../IAgreedToTermsAndConditions';
import { DOCUMENT_TYPES, UserType } from '../../../../services/constants';
import { DispatchableType } from '../../../dataStructures/DispatchableType';
import { IDriverTruck } from '../IDriverTruck';
import { IFOUserGeotab } from '../IFOUserGeotab';


export interface IFOUser {
  email: string;
  phone: string;
  emailVerified: boolean;
  userType: UserType;
  displayName: string;
  creationTimestamp: number;
  disabled: boolean;
  firebaseUID: string;
  additionalInfo: IAdditionalInfo;
  uploadedFiles: IUploadedFiles;
  equipmentTypeList?: string[];
  truckType: string;
  preferredPerMileRate: IPreferredPerMileRate;
  truckCount: number;
  officePhone: string;
  companyName: string;
  companyType: string;
  address: IAddress;
  mcNumber: string;
  preferredLanes: IPreferredLanes;
  agreedToTermsAndConditions: IAgreedToTermsAndConditions;
  channel: string;
  firstLogin: boolean;
  dispatchable: DispatchableType;
  drivers?: IDriverTruck[];
  fleetId: string;
  truck?: IDriverTruck;
  inAppNotifications: number;
  tutorial: ITutorial;
  operatingLanes: IObservableArray<IOperatingLane>;
  documents: DOCUMENT_TYPES;
  tac?: string;
  tracking?: string;
  communicationsPreferences?: ICommunicationsPreferences;
  permissions?: IDriverPermissions;
  geotab?: IFOUserGeotab;
  pickupRadius?: string;
  dropoffRadius?: string;
}
