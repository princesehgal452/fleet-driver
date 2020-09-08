import { IConsigneeInfo } from '../IConsigneeInfo';
import { IReceiverInfo } from '../IReceiverInfo';
import { IDropoffCoordinates } from '../IDropoffCoordinates';

export interface IDropoffLoad {
  receiverInfo: IReceiverInfo;
  dropoffStartDate: string;
  dropoffLocation: string;
  dropoffStartTime: string;
  dropoffCoordinates: IDropoffCoordinates;
  consigneeInfo: IConsigneeInfo;
  dropoffEndDate: string;
  dropoffEndTime: string;
}
