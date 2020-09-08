import { action, observable } from 'mobx';
import { CollectionsStore } from './CollectionsStore';
import ApiLayer from '../../services/APIServices/ApiLayer';
import Match from '../../models/dataStructures/Match';
import { DriverAppStore } from './DriverAppStore';
import { insertionSort } from '../../utils/utility';
import Load from '../../models/dataStructures/Load';
import { MatchStatus } from '../../services/constants';
import { SearchLoads } from '../../services/APIServices/PostSearchLoads';
import { GetMatches } from '../../services/APIServices/GetMatches';
import EnhancedStoreBase from './EnhancedStoreBase';


export class MatchStore extends EnhancedStoreBase {
  rootStore: DriverAppStore;
  @observable allMatches: CollectionsStore;
  @observable recommendedMatches: CollectionsStore;
  @observable activeLoads: CollectionsStore;
  @observable activeDispatchableDriverLoads: CollectionsStore;
  @observable activeDispatcherLoads: CollectionsStore;
  @observable RALLoadsStore: CollectionsStore;
  @observable laneMatches: CollectionsStore[] = [];
  @observable loadsByLane: CollectionsStore;
  @observable selectedMatch: (Match | null) = null;
  @observable nearbyLoads: Match[] = [];
  @observable RALMatches: Match[] = [];
  collectionStores: CollectionsStore[] = [];

  constructor(rootStore: DriverAppStore) {
    super();
    this.rootStore = rootStore;
    this.allMatches = new CollectionsStore(this.rootStore, true, GetMatches);
    this.activeLoads = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.activeMatch);
    this.activeDispatcherLoads = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.activeMatchDispatcher);
    this.activeDispatchableDriverLoads = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.activeMatchDispatchableDriver);
    this.RALLoadsStore = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.requestedALoaddMatch);
    this.recommendedMatches = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.automatedMatch);
    this.loadsByLane = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.automatedMatch);
    for (let i = 0; i < 3; i += 1) {
      this.laneMatches[i] = new CollectionsStore(this.rootStore, true, GetMatches, MatchStatus.automatedMatch);
    }
    this.collectionStores = [this.recommendedMatches, this.activeLoads, ...this.laneMatches];
  }

  @action.bound setSelectedMatch(match: (Match | null)) {
    this.selectedMatch = match;
  }

  @action.bound
  downloadMatch = async (matchId) => {
    this.setSelectedMatch(null);
    this.setError(null);
    let matchfromResults = null;
    try {
      matchfromResults = this.getMatchFromResults(matchId);
    } catch (error) {
    }
    if (matchfromResults) {
      this.setSelectedMatch(matchfromResults);
    } else {
      try {
        this.setLoading(true);
        const result = await ApiLayer.getMatch(matchId);
        if (result) {
          this.setSelectedMatch(result);
          // Save this match in 'other' key.
          // this.recommendedMatches.cache.other = [...this.recommendedMatches.cache.other, result];
        }
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    }
  };

  @action.bound
  deleteMatchResultsCache() {
    this.collectionStores.forEach((collection) => collection.clearCache());
  }

  @action.bound
  deleteMatchResultsItems() {
    this.collectionStores.forEach((collection) => collection.setResults([]));
  }

  @action.bound
  setNearbyLoads(nearbyLoads: Load[]) {
    this.nearbyLoads = nearbyLoads.map((load) => new Match({
      matchId: load.matchId,
      loadId: load.loadId,
      status: MatchStatus.NEARBY,
      notifications: {},
      timestamp: new Date().valueOf(),
      personId: '',
      interactions: [],
      uploadedFiles: {},
      load: load.rawLoad,
    }));
  }

  @action.bound
  async reloadMatchResults() {
    await this.deleteMatchResultsCache();
    await this.deleteMatchResultsItems();
  }

  @action.bound
  getGroupObject(type, initial) {
    return {
      text: {
        type,
      },
      matches: initial,
    };
  }

  @action.bound
  getGroupedMatchesDefaultObject() {
    return {
      RECOMMENDED: this.getGroupObject('RECOMMENDED LOADS', []),
      RAL: this.getGroupObject('REQUESTED LOADS', []),
      NEARBY: this.getGroupObject('NEARBY LOADS', []),
      other: this.getGroupObject('OTHER LOADS', []),
    };
  }

  @action.bound
  groupedMatchesByType(collectionStore, additionalMatches: Match[]) {
    const comparator = (matchA: Match, matchB: Match) => (!!matchA.cost < !!matchB.cost);

    const { results: collectionStoreResults } = collectionStore;

    const results = (additionalMatches.length > 0)
      ? [...additionalMatches, ...collectionStoreResults]
      : collectionStoreResults;

    return results.reduce((results, match: Match) => {
      try {
        if (match.status === MatchStatus.automatedMatch) {
          insertionSort(results.RECOMMENDED.matches, match, comparator);
        }
        if (match.ral_id) {
          insertionSort(results.RAL.matches, match, comparator);
        } else {
          insertionSort(results.other.matches, match, comparator);
        }
      } catch (e) {
        console.log(`Error grouping matches: ${e}`, e);
      }
      return results;
    }, this.getGroupedMatchesDefaultObject());
  }

  @action.bound
  traverseGroupedMatchesByType(collectionStore, type, agg, additionalMatches: Match[]) {
    const groupedMatchesByType = this.groupedMatchesByType(collectionStore, additionalMatches);
    if (groupedMatchesByType[type].matches.length > 0) {
      agg.push({
        id: type,
        typegroup: true,
        text: groupedMatchesByType[type].text,
      });
      agg.push(...groupedMatchesByType[type].matches);
    }
  }

  @action.bound
  typeGroupedMatches(collectionStore, additionalMatches: Match[]) {
    const typeGroupedMatches = [];
    const types = ['RECOMMENDED', 'RAL', 'NEARBY', 'other'];
    types.forEach((type) => this.traverseGroupedMatchesByType(collectionStore, type, typeGroupedMatches, additionalMatches));
    return typeGroupedMatches;
  }

  @action.bound
  getMatchFromResults(matchId) {
    let match = null;
    for (let i = 0; this.collectionStores.length; i += 1) {
      const collection = this.collectionStores[i];
      const item = collection.getItemFromResults(matchId);
      if (item) {
        match = item;
        break;
      }
    }
    return match;
  }

  @action.bound
  getNearbyLoads = async () => {
    try {
      if (this.nearbyLoads.length > 0) {
        return;
      }
      this.setLoading(true);
      const coordinates = await this.rootStore.userStore.downloadCurrentCoordinatesAsync();
      if (coordinates.lng && coordinates.lat) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinates }, async (geocodeResults) => {
          if (geocodeResults && geocodeResults.length) {
            const searchParams = {
              pickupLocation: {
                address: geocodeResults[0].formatted_address,
                coordinates: {
                  lat: geocodeResults[0].geometry.location.lat(),
                  lng: geocodeResults[0].geometry.location.lng(),
                },
              },
              radius: {
                amount: 100,
                unit: 'mile',
              },
            };
            try {
              const nearbyResults = await SearchLoads(1, searchParams);
              this.setNearbyLoads(nearbyResults.data);
              this.setLoading(false);
            } catch (error) {
              console.log('Error getting nearby loads');
              this.setLoading(false);
            }
          }
        });
      }
      this.setLoading(false);
    } catch (error) {
      console.log('Error getting nearby loads');
      this.setLoading(false);
    }
  };

  @action.bound setRALMatches(matches: Match[]) {
    this.RALMatches = matches;
  }

  @action.bound
  downloadRALMatches = async (ralId) => {
    this.setError(null);
    try {
      this.setLoading(true);
      const result = await ApiLayer.getRALMatches(ralId);
      if (result) {
        this.setRALMatches(result.map((obj) => new Match(obj)));
      }
    } catch (error) {
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  };
}

export default MatchStore;
