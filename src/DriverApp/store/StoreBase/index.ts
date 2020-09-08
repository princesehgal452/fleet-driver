import { action, observable } from 'mobx';
import { Pagination } from '../../../models/interfaces/shared/IPagination';


export default class StoreBase {
  @observable loading = false;
  @observable error: (null | string) = null;
  @observable pagination = new Pagination();


  @action.bound setLoading(newState: boolean) {
    this.loading = newState;
  }

  @action
  setPagination(pagination: Pagination) {
    this.pagination = pagination;
  }

  @action.bound setError(error: (null | string)) {
    this.error = error;
  }
}
