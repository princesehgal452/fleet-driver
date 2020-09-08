import { action, observable } from 'mobx';
import { DriverAppStore } from '../DriverAppStore';
import { Pagination } from '../../../models/interfaces/shared/IPagination';
import EnhancedStoreBase from '../EnhancedStoreBase';
import { IRecommendedLane } from '../../../models/interfaces/shared/IRecommendedLane';


export class CollectionsStore extends EnhancedStoreBase {
  rootStore: DriverAppStore;
  @observable previousQuery;
  @observable API;
  @observable status: string;
  @observable results = [] as any[];
  @observable pagination = new Pagination();
  @observable args: null | any = null;
  @observable activateInfinite: boolean;
  @observable lanes: IRecommendedLane[] = [];
  @observable cache = {
    other: [] as any[],
  };

  constructor(rootStore: DriverAppStore, activateInfinite = false, api, status = '') {
    super();
    if (!api) {
      const err = 'API method missing in constructor';
      console.log(err);
      throw new Error(err);
    }
    this.API = api;
    this.status = status;
    this.rootStore = rootStore;
    this.activateInfinite = activateInfinite;
  }

  @action.bound setArgs(args: any) {
    this.args = args;
  }

  @action.bound setResults(newResults: any[]) {
    this.results = newResults;
  }

  @action.bound setLanes(lanes: IRecommendedLane[]) {
    this.lanes = lanes;
  }

  @action.bound setCache(pageNumber: (number | string), newCacheResults: any[]) {
    this.cache[pageNumber] = newCacheResults;
  }

  @action.bound setPagination(newPagination: Pagination) {
    this.pagination = newPagination;
  }

  @action.bound setPaginationPage(newPageNumber: number) {
    this.pagination.page = newPageNumber;
  }

  @action.bound setPreviousQuery(query) {
    this.previousQuery = query;
  }

  @action.bound downloadResults = async (pageNumber = 1, args?) => {
    if (this.loading) {
      return;
    }
    this.setError(null);
    this.setArgs(args);
    if (!this.activateInfinite && this.cache[pageNumber]) {
      this.setResults(this.cache[pageNumber]);
      this.setPaginationPage(pageNumber);
      return;
    }
    try {
      this.setLoading(true);
      const result = this.status
        ? await this.API(pageNumber, this.status, args) : await this.API(pageNumber, args);
      if (this.activateInfinite) {
        this.setLoading(false);
        this.setResults(this.results.concat(result.data));
        this.setPagination(result.pagination);
        this.setLanes(result.lanes || []);
        this.setCache(pageNumber, result.data);
      } else {
        this.setResults([]);
        if (result) {
          this.setLoading(false);
          this.setPagination(result.pagination);
          this.updateResults(result.data, pageNumber);
        }
      }
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        'Sorry, there was an error fetching your data', { variant: 'error' });
      this.setLoading(false);
      console.log(error);
    }
  };

  @action.bound
  downloadNextResults = () => {
    this.downloadResults(this.pagination.page + 1, this.args);
  };

  @action.bound
  clearCache() {
    this.cache = {
      other: [],
    };
  }

  @action.bound
  deleteItemFromResults(id) {
    this.setResults(this.results.filter((item) => item.id !== id));
    this.cache[this.pagination.page] = this.results.filter(item => item.id !== id);
  }

  @action.bound
  updateResults(results: any[], page = this.pagination.page) {
    this.setPaginationPage(page);
    this.setResults(results);
    this.setCache(page, results);
  }

  getItemFromCache(id, page: (number | string) = this.pagination.page) {
    if (page) {
      return this.cache[page].find(item => item.id === id);
    }
  }

  getItemFromResults(id) {
    let itemFound;
    itemFound = this.getItemFromCache(id);
    if (!itemFound) {
      for (const currPage of Object.keys(this.cache)) {
        const item = this.getItemFromCache(id, currPage);
        if (item) {
          itemFound = item;
          break;
        }
      }
      // itemFound = [...Array(this.pagination.totalPages).keys()].find(page => this.getItemFromCache(id, page + 1));
    }
    return itemFound;
  }
}

export default CollectionsStore;
