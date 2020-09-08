import { action, observable } from 'mobx';
import ReactGA from 'react-ga';
import ApiLayer from '../../services/APIServices/ApiLayer';
import { CollectionsStore } from './CollectionsStore';
import Load from '../../models/dataStructures/Load';
import { DriverAppStore } from './DriverAppStore';
import { GA_TRACKING, MIXPANEL_EVENTS, MIXPANEL_KEYS, SortValues } from '../../services/constants';
import { SearchLoads } from '../../services/APIServices/PostSearchLoads';
import { GetSavedSearches } from '../../services/APIServices/GetSavedSearches';
import { mixpanelTrack } from '../../services/FOMixpanel';


export class SearchStore {
  rootStore: DriverAppStore;
  @observable searchResults = new CollectionsStore(this.rootStore, false, SearchLoads);
  @observable recentSearches = new CollectionsStore(this.rootStore, false, GetSavedSearches);
  @observable previousQuery = {};
  @observable selectedLoad: (Load | null) = null;
  @observable sortFilter = SortValues.RATE;

  constructor(rootStore: DriverAppStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  async setSortFilter(filter: SortValues) {
    this.sortFilter = filter;
    this.searchResults.clearCache();
    await this.downloadSearchResults(1);
  }

  @action.bound
  setSelectedLoad(load: (Load | null)) {
    this.selectedLoad = load;
  }

  @action.bound
  downloadSearchResults = async (pageNumber, query = undefined) => {
    this.searchResults.setError(null);
    const queryParams = query ? query : this.searchResults.previousQuery;
    ReactGA.event({
      category: GA_TRACKING.CATEGORIES.DRIVER,
      action: GA_TRACKING.ACTIONS.NEW_SEARCH,
      label: queryParams.pickupLocation.address,
    });

    mixpanelTrack(MIXPANEL_EVENTS.SEARCH, {
      [MIXPANEL_KEYS.PICKUP_LOCATION]: queryParams.pickupLocation && queryParams.pickupLocation.address,
      [MIXPANEL_KEYS.DROPOFF_LOCATION]: queryParams.dropoffLocation && queryParams.dropoffLocation.address,
      [MIXPANEL_KEYS.EQUIPMENT_LIST]: queryParams.equipmentTypeList,
    });
    if (query) {
      this.searchResults.clearCache();
      this.recentSearches.clearCache();
      this.searchResults.previousQuery = query;
      await this.searchResults.downloadResults(pageNumber, { searchQuery: queryParams, sortFilter: this.sortFilter });
    } else {
      await this.searchResults.downloadResults(pageNumber, { searchQuery: queryParams, sortFilter: this.sortFilter });
    }
  };

  @action.bound
  downloadLoad = async (loadId) => {
    this.setSelectedLoad(null);
    const loadFromResults = this.searchResults.getItemFromResults(loadId);
    if (loadFromResults) {
      this.setSelectedLoad(loadFromResults);
    } else {
      try {
        this.searchResults.setLoading(true);
        this.searchResults.setError(null);
        const result = await ApiLayer.getLoad(loadId);
        if (result) {
          // Save this match in 'other' key.
          this.setSelectedLoad(result);
          this.searchResults.cache.other = [...this.searchResults.cache.other, result];
        }
      } catch (error) {
        this.searchResults.setError(error);
      } finally {
        this.searchResults.setLoading(false);
      }
    }
  };
}

export default SearchStore;
