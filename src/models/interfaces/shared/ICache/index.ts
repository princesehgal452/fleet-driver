import { ILoadData } from '../../apiResponse/loads/ILoadData';

export interface ICache {
  [page: number]: ILoadData[];
}
