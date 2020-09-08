import { action, observable } from 'mobx';
import { Pagination } from '../../../models/interfaces/shared/IPagination';
import StoreBase from '../StoreBase';


export default class EnhancedStoreBase extends StoreBase {
  @observable pagination = new Pagination();

  @action setPagination(pagination: Pagination) {
    this.pagination = pagination;
  }
}
