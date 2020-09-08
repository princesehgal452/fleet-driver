import { action, IObservableArray, observable } from 'mobx';
import { DriverAppStore } from '../DriverAppStore';
import { getNotifications } from '../../../services/APIServices/GetNotifications';
import { updateNotifications } from '../../../services/APIServices/UpdateNotifications';
import { IGetNotifications } from '../../../models/apiResponse/getNotifications';
import { INotificationData } from '../../../models/interfaces/shared/INotificationData';
import Match from '../../../models/dataStructures/Match';
import EnhancedStoreBase from '../EnhancedStoreBase';


export class NotificationsStore extends EnhancedStoreBase {
  rootStore: DriverAppStore;
  @observable results: IObservableArray<INotificationData> = observable([]);

  constructor(rootStore: DriverAppStore) {
    super();
    this.rootStore = rootStore;
  }

  notificationsCacheKey = (page: number) => `notifications-${page}`;

  @action.bound
  downloadResults = async (pageNumber = 1) => {
    this.setError(null);
    if (this.results.length > 0 && (pageNumber <= this.pagination.page)) {
      return;
    }
    try {
      this.setLoading(true);
      const result: IGetNotifications = await getNotifications(pageNumber);
      if (result) {
        this.setResults([...this.results, ...result.data]);
        this.setPagination(result.pagination);
        this.rootStore.matchStore.recommendedMatches
          .cache[this.notificationsCacheKey(result.pagination.page)] = result.data.map(
          notification => new Match(notification.data.match));
      }
    } catch (error) {
      this.setError(error);
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        'Technical error downloading notifications. Please refresh and try again.',
        { variant: 'error' });
    } finally {
      this.setLoading(false);
    }
  };

  @action.bound
  updateNotification = async (notification: INotificationData) => {
    notification.read = true;
    this.rootStore.userStore.setFOUser({
      ...this.rootStore.userStore.FOUser, inAppNotifications: this.rootStore.userStore.FOUser.inAppNotifications - 1,
    });
    try {
      await updateNotifications(notification.id);
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        'Technical error downloading notifications. Please refresh and try again.',
        { variant: 'error' });
    }
  };

  @action.bound
  clearAllNotificationsCache = () => {
    [...Array(this.pagination.totalPages)].forEach((_, pageNumber) => {
      delete this.rootStore.matchStore.recommendedMatches.cache[this.notificationsCacheKey(pageNumber)];
    });
  };

  @action.bound
  refreshNotifications = () => {
    this.setResults([]);
    this.clearAllNotificationsCache();
    this.downloadResults();
  };

  @action
  setResults(loadData: INotificationData[]) {
    this.results.replace(loadData);
  }
}
