import { IMatchData } from '../../interfaces/shared/IMatchData';
import { ILoadData } from '../../interfaces/shared/ILoadData';


export interface IPostLoadDispatchHelper {
  data: IPostLoadDispatch;
}

export interface IPostLoadDispatch {
  data: IMatchData & ILoadData;
}
