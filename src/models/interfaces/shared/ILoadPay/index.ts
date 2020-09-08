import { IRange } from '../IRange';
import { IPayAmount } from '../IAmount';


export interface ILoadPay extends IPayAmount {
  emailUpdates: boolean;
  perMileRate: number;
  range: IRange;
  priceIsEstimated?: boolean;
}
