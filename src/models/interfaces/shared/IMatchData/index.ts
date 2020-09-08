import { IInteraction } from '../INegotiateInteraction';
import { ILoadData } from '../ILoadData';
import { MatchStatus } from '../../../../services/constants';
import { ITruckData } from '../ITruckData';
import { ITracking } from '../ITracking';
import { IMatchDocuments } from '../IMatchDocuments';


export interface IMatchData {
  matchId: string;
  _id?: string;
  loadId: string;
  status: MatchStatus;
  notifications: Object;
  timestamp: number;
  cost?: number;
  personId: string;
  interactions: (IInteraction)[];
  autoMatchId?: any;
  uploadedFiles: Object;
  load: ILoadData;
  ral_id?: string;
  truck?: ITruckData;
  tracking?: ITracking;
  documents?: IMatchDocuments;
}
