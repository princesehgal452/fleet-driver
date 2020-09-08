import { action, observable } from 'mobx';
import AisinRouteData from './AisinRouteData';
import StoreBase from '../../../DriverApp/store/StoreBase';
import { DriverAppStore } from '../../../DriverApp/store/DriverAppStore';
import { postAisinRouteSearch } from '../../../services/APIServices/PostAisinRouteSearch';
import Load from '../Load';


export default class Aisin extends StoreBase {
  rootStore: DriverAppStore;
  parentLoad: Load;
  @observable aisinRouteSearchList?: AisinRouteData[];

  constructor(parentLoad: Load, rootStore: DriverAppStore) {
    super();
    this.parentLoad = parentLoad;
    this.rootStore = rootStore;
  }

  @action.bound
  setAisinRouteSearchList(aisinRouteDataList: AisinRouteData[]) {
    this.aisinRouteSearchList = aisinRouteDataList;
  }

  @action.bound
  getAisinRouteData = async () => {
    if (!this.parentLoad.firstPickupOriginCoordinates || !this.parentLoad.firstDropoffOriginCoordinates) {
      return;
    }
    try {
      this.setLoading(true);
      const aisinRouteDataList = await postAisinRouteSearch(
        {
          coordinate: {
            lat: this.parentLoad.firstPickupOriginCoordinates.lat,
            lon: this.parentLoad.firstPickupOriginCoordinates.lng,
          },
        },
        [{
          coordinate: {
            lat: this.parentLoad.firstDropoffOriginCoordinates.lat,
            lon: this.parentLoad.firstDropoffOriginCoordinates.lng,
          },
        }],
      );
      this.setAisinRouteSearchList(aisinRouteDataList.map((aisinRouteData) => new AisinRouteData(aisinRouteData, this.parentLoad, this.rootStore)));
    } catch (error) {
    } finally {
      this.setLoading(false);
    }
  };
}
