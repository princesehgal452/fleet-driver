import { computed, observable } from 'mobx';
import { IInteraction } from '../../interfaces/shared/INegotiateInteraction';
import { InteractionEventTypes } from '../../../services/constants';

export default class Bid implements IInteraction {
  @observable eventType: InteractionEventTypes;
  @observable userType: ('driver' | 'broker');
  @observable price?: number;
  @observable unit?: string;
  @observable flatRate?: boolean;
  @observable displayName: string;
  @observable firebaseUID: string;
  @observable timestamp: number;
  @observable email: string;
  @observable mcNumber: string;
  @observable phone: string;

  constructor(bid: IInteraction) {
    if (!bid) {
      throw new Error('Bid is undefined.');
    }
    const {
      eventType, userType, price, unit, flatRate, displayName, firebaseUID, timestamp, email, mcNumber, phone,
    } = bid;
    this.userType = userType;
    this.eventType = eventType;
    this.unit = unit;
    this.price = price;
    this.flatRate = flatRate;
    this.displayName = displayName;
    this.firebaseUID = firebaseUID;
    this.timestamp = timestamp;
    this.email = email;
    this.mcNumber = mcNumber;
    this.phone = phone;
  }
  @computed get currency() {
    return this.unit;
  }
}
