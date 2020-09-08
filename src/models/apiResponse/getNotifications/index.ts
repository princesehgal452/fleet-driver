import { Pagination } from '../../interfaces/shared/IPagination';
import { INotificationData } from '../../interfaces/shared/INotificationData';

export interface IGetNotifications {
  data: INotificationData [];
  pagination: Pagination;
}


export interface IGetNotificationsHelper {
  data: IGetNotifications;
}
