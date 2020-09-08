import { action, computed, observable } from 'mobx';
import ReactGA from 'react-ga';
import { GA_TRACKING, MIXPANEL_EVENTS, MIXPANEL_KEYS, SortValues } from '../../../services/constants';
import { DriverAppStore } from '../DriverAppStore';
import CollectionsStore from '../CollectionsStore';
import { SearchLoads } from '../../../services/APIServices/PostSearchLoads';
import Load from '../../../models/dataStructures/Load';
import { mixpanelTrack } from '../../../services/FOMixpanel';
import { GetSavedSearches } from '../../../services/APIServices/GetSavedSearches';
import ApiLayer from '../../../services/APIServices/ApiLayer';


export class SearchStoreV3 {
  rootStore: DriverAppStore;
  @observable searchResults = new CollectionsStore(this.rootStore, true, SearchLoads);
  @observable recentSearches = new CollectionsStore(this.rootStore, true, GetSavedSearches);
  @observable previousQuery = {};
  @observable selectedLoad: (Load | null) = null;
  @observable sortFilter: SortValues[] = [SortValues.RATE];

  constructor(rootStore: DriverAppStore) {
    this.rootStore = rootStore;
  }

  @computed get recentPickupLocations() {
    return this.recentSearches.results.length > 0
      ? this.recentSearches.results.reduce((acc, curr) => (
        curr.pickupLocation ? [...acc, curr.pickupLocation] : acc), [])
      : [];
  }

  @computed get recentDropoffLocations() {
    return this.recentSearches.results.length > 0
      ? this.recentSearches.results.reduce((acc, curr) => (
        curr.dropoffLocation ? [...acc, curr.dropoffLocation] : acc), [])
      : [];
  }

  @action.bound
  setSortFilter(filter: SortValues[]) {
    this.sortFilter = filter;
  }

  @action.bound
  setSelectedLoad(load: (Load | null)) {
    this.selectedLoad = load;
  }

  @action.bound
  downloadSearchResults = async (pageNumber, query = undefined) => {
    this.searchResults.setError(null);
    const queryParams = query || this.searchResults.previousQuery;
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
      this.searchResults.setPreviousQuery(query);
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

export default SearchStoreV3;
