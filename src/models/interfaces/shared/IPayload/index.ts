import { ILoadPay } from '../ILoadPay';
import { ILoad } from '../ILoad';
import { ITripDetails } from '../ITripDetails';

export interface IPayload {
  assignedDate: string;
  tripDetails: ITripDetails;
  loadPay: ILoadPay;
  daysUntilPayment: number;
  customerName: string;
  loadName: any;
  loads: ILoad[];
  brokerName: string;
  loadStatus: 'uncovered' | 'covered' | 'paid';
  bestPrice: boolean;
  bestPerMileRate: boolean;
  deadheadRate: boolean;
}
