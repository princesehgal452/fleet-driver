import { action, computed, IObservableArray, observable } from 'mobx';
import StoreBase from '../../../DriverApp/store/StoreBase';
import Bid from '../Bid';
import Load from '../Load';
import ApiLayer from '../../../services/APIServices/ApiLayer';
import { IInteraction } from '../../interfaces/shared/INegotiateInteraction';
import { IPayAmount } from '../../interfaces/shared/IAmount';
import {
  filterBids,
  getFlatRateFromMiles,
  getPerMileRateForMiles,
  getValueFromFormattedAmount,
} from '../../../utils/utility';
import { InteractionEventTypes } from '../../../services/constants';


export default class Bids extends StoreBase {
  @observable parentLoad: Load;
  @observable loadId: string;
  @observable isMatch: boolean;
  @observable loadAmount: IPayAmount;
  @observable negotiations: IObservableArray<Bid>;
  @observable decliningBid: boolean;

  constructor(parentLoad: Load, loadId: string, bids: IInteraction[], loadAmount: IPayAmount, isMatch: boolean) {
    super();
    this.parentLoad = parentLoad;
    this.loadId = loadId;
    this.isMatch = isMatch;
    this.loadAmount = loadAmount;
    this.negotiations = observable(bids.map(bid => new Bid(bid)));
    this.decliningBid = false;
  }

  @computed get noNegotiations() {
    return this.negotiations.length <= 0;
  }

  @computed get waitingForBroker() {
    return Boolean(!this.noNegotiations && this.negotiations[0].userType === 'driver'
      && this.negotiations[0].eventType === InteractionEventTypes.NEGOTIATING);
  }

  @computed get driverAccepted() {
    return Boolean(!this.noNegotiations && this.negotiations[0].userType === 'driver'
      && this.negotiations[0].eventType === InteractionEventTypes.NEGOTIATE_ACCEPT);
  }

  @computed get driverRejected() {
    return Boolean(!this.noNegotiations && this.negotiations[0].userType === 'driver'
      && this.negotiations[0].eventType === InteractionEventTypes.NEGOTIATE_REJECT);
  }

  @computed get brokerAccepted() {
    return Boolean(!this.noNegotiations && this.negotiations[0].userType === 'broker'
      && this.negotiations[0].eventType === InteractionEventTypes.NEGOTIATE_ACCEPT);
  }

  @computed get brokerCountered() {
    return Boolean(!this.noNegotiations && this.negotiations[0].userType === 'broker'
      && this.negotiations[0].eventType === InteractionEventTypes.NEGOTIATING);
  }

  @computed get brokerDeclined() {
    return Boolean(!this.noNegotiations && this.negotiations[0].userType === 'broker'
      && this.negotiations[0].eventType === InteractionEventTypes.NEGOTIATE_REJECT);
  }

  @computed get driverPrice() {
    const driverLastNegotation = this.negotiations.find(negotiation => (negotiation.userType === 'driver'));
    return driverLastNegotation
      ? {
        price: driverLastNegotation.price,
        currency: driverLastNegotation.currency,
        flatRate: driverLastNegotation.flatRate,
      }
      : {
        price: 0,
        currency: 'USD',
        flatRate: true,
      };
  }

  @computed get brokerAmount() {
    const brokerLastNegotation = this.negotiations.find(negotiation => (negotiation.userType === 'broker'));
    return brokerLastNegotation
      ? {
        price: brokerLastNegotation.price,
        currency: brokerLastNegotation.currency,
        flatRate: brokerLastNegotation.flatRate,
      }
      : {
        price: 0,
        currency: 'USD',
        flatRate: true,
      };
  }

  @computed get brokerAmountFlatRate() {
    return this.brokerAmount.price
      ? {
        price: this.brokerAmount.flatRate
          ? this.brokerAmount.price
          : getFlatRateFromMiles(
            getValueFromFormattedAmount(this.parentLoad.distanceInMiles),
            this.brokerAmount.price).price,
        currency: this.brokerAmount.currency,
        flatRate: this.brokerAmount.flatRate,
      }
      : {
        price: 0,
        currency: 'USD',
        flatRate: true,
      };
  }

  @computed get brokerPerMileRate() {
    return this.brokerAmount.price
      ? {
        price: this.brokerAmount.flatRate
          ? getPerMileRateForMiles(
            getValueFromFormattedAmount(this.parentLoad.distanceInMiles),
            this.brokerAmount.price).price
          : this.brokerAmount.price,
        currency: this.brokerAmount.currency,
        flatRate: !this.brokerAmount.flatRate,
      }
      : {
        price: 0,
        currency: 'USD',
        flatRate: false,
      };
  }

  @action setNegotiations(newNegotiations: Bid[]) {
    this.negotiations.replace(newNegotiations);
  }

  @action setDecliningBid(newDecliningBidState: boolean) {
    this.decliningBid = newDecliningBidState;
  }

  @action
  declineBid = () => {
    this.setDecliningBid(true);
    const lastBid = new Bid(this.negotiations[0]);
    lastBid.eventType = InteractionEventTypes.NEGOTIATE_REJECT;
    lastBid.userType = 'driver';
    this.setNegotiations(observable([lastBid].concat(...this.negotiations)));
  };

  @action
  undoDeclineBid = () => {
    this.setDecliningBid(false);
    this.setNegotiations(observable(this.negotiations.slice(1)));
  };


}
