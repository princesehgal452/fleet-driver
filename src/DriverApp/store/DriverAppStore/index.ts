import { observable } from 'mobx';
import { SearchStore } from '../SearchStore';
import { TruckStore } from '../TruckStore';
import { MatchStore } from '../MatchStore';
import { UserStore } from '../UserStore';
import { SnackbarStore } from '../SnackbarStore';
import { NotificationsStore } from '../NotificationsStore';
import SearchStoreV3 from '../SearchStoreV3';
import PublicStore from '../PublicStore';
import ConfigStore from '../ConfigStore';
import PartnerStore from '../PartnerStore';


export class DriverAppStore {
  @observable snackbarStore = new SnackbarStore(this);
  @observable notificationsStore = new NotificationsStore(this);
  @observable userStore = new UserStore(this);
  @observable searchStore = new SearchStore(this);
  @observable searchStoreV3 = new SearchStoreV3(this);
  @observable truckStore = new TruckStore(this);
  @observable matchStore = new MatchStore(this);
  @observable configStore = new ConfigStore(this);
  @observable partnerStore = new PartnerStore(this);
  @observable publicStore = new PublicStore(this);
}

export default new DriverAppStore();
