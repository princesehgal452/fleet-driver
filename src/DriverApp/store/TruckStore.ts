import { action, flow, observable } from 'mobx';
import ApiLayer from '../../services/APIServices/ApiLayer';
import { CollectionsStore } from './CollectionsStore';
import { DriverAppStore } from './DriverAppStore';
import { GetPostedTrucks } from '../../services/APIServices/GetPostedTrucks';
import EnhancedStoreBase from './EnhancedStoreBase';


export class TruckStore extends EnhancedStoreBase {
  rootStore: DriverAppStore;
  @observable postedTrucks = new CollectionsStore(this.rootStore, false, GetPostedTrucks);
  @observable showPostDonePopover = false;
  @action.bound
  postMyTruck = flow(function* (this: TruckStore, query, showError = true) {
    this.setLoading(true);
    this.setError(null);
    try {
      yield ApiLayer.postMyTruck(query);
      this.showPostDonePopover = true;
      this.postedTrucks.clearCache();
      this.postedTrucks.downloadResults();
    } catch (error) {
      if (showError) {
        this.rootStore.snackbarStore.enqueueSnackbarStore(
          'Sorry, there was an error posting your request', { variant: 'error' });
      }
      throw error;
    } finally {
      this.setLoading(false);
    }
  });
  @action.bound
  deletePostedTruck = flow(function* (this: TruckStore, postedTruckId) {
    const trucksBackup = this.postedTrucks.results;
    try {
      this.postedTrucks.deleteItemFromResults(postedTruckId);
      yield ApiLayer.deletePostedTruck(postedTruckId);
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        'Sorry, there was an error deleting your request', { variant: 'error' });
      this.postedTrucks.updateResults(trucksBackup);
    }
  });

  constructor(rootStore: DriverAppStore) {
    super();
    this.rootStore = rootStore;
  }

  @action.bound
  hidePostDonePopover() {
    this.showPostDonePopover = false;
  }
}

export default TruckStore;
