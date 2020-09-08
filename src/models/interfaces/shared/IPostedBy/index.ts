import { IPreferredLanes } from '../IPreferredLanes';
import { IAgreedToTermsAndConditions } from '../IAgreedToTermsAndConditions';
import { IPreferredPerMileRate } from '../IPreferredPerMileRate';
import { IUploadedFiles } from '../IUploadedFiles';
import { IAdditionalInfo } from '../IAdditionalInfo';
import { IAddress } from '../IAddress';
import { ITruckTypes } from '../ITruckTypes';

export interface IPostedBy {
  email?: string;
  phone?: string;
  emailVerified: boolean;
  userType: string;
  displayName?: string;
  creationTimestamp: any;
  disabled: boolean;
  firebaseUID: string;
  additionalInfo: IAdditionalInfo;
  uploadedFiles: IUploadedFiles;
  equipmentTypeList: ITruckTypes[];
  truckType: string;
  preferredPerMileRate: IPreferredPerMileRate;
  truckCount: number;
  officePhone: string;
  companyName: string;
  companyType: string;
  companyLogo: string;
  address: IAddress;
  mcNumber: string;
  preferredLanes: IPreferredLanes;
  agreedToTermsAndConditions: IAgreedToTermsAndConditions;
  channel: string;
  firstLogin: boolean;
}
