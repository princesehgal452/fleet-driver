import { computed } from 'mobx';
import StoreBase from '../StoreBase';
import { DriverAppStore } from '../DriverAppStore';
import config from '../../../../config';
import { AppMode } from '../../../services/constants';


export default class ConfigStore extends StoreBase {
  rootStore: DriverAppStore;

  constructor(rootStore: DriverAppStore) {
    super();
    this.rootStore = rootStore;
  }

  @computed get isBigroad() {
    return config.appMode === AppMode.BIGROAD;
  }

  @computed get isGeotab() {
    return config.appMode === AppMode.GEOTAB;
  }

  @computed get isAisin() {
    return config.appMode === AppMode.AISIN;
  }

  @computed get isV3() {
    return config.appMode === AppMode.V3;
  }

}
