import { TRACKINGMODES } from '../../../../services/constants';


export interface ITracking {
  mode: TRACKINGMODES;
  eta: number;
  delayed: boolean;
  linkedMatchId?: string;
}
