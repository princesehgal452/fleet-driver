import { IMatchData } from '../../interfaces/shared/IMatchData';
import { ILoadData } from '../../interfaces/shared/ILoadData';


export interface IPostLoadAcceptRejectHelper {
  data: IPostLoadAcceptReject;
}

export interface IPostLoadAcceptReject {
  data: IMatchData & ILoadData;
}
