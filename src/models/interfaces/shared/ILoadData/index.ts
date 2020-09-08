import { IPostedBy } from '../IPostedBy';
import { IPayload } from '../IPayload';
import { IMatchData } from '../IMatchData';
import { LoadStatus } from '../../../../services/constants';


export interface ILoadData {
  _id?: string;
  loadId: string;
  status: LoadStatus;
  trackingNumber: string;
  account?: any;
  brokerId: string;
  token: string;
  source: string;
  key: string;
  payload: IPayload;
  locationProcessingRetry: number;
  locationProcessed: boolean;
  postedBy: IPostedBy;
  matches?: IMatchData[];
}
