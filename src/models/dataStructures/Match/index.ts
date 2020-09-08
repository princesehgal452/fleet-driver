import { action, computed, observable } from 'mobx';
import Load from '../Load';
import { IMatchData } from '../../interfaces/shared/IMatchData';
import { IInteraction } from '../../interfaces/shared/INegotiateInteraction';
import { ITracking } from '../../interfaces/shared/ITracking';
import { InteractionEventTypes, MatchStatus, TRACKINGMODES } from '../../../services/constants';
import driverAppStore, { DriverAppStore } from '../../../DriverApp/store/DriverAppStore';
import MatchDocumentsStore from './MatchDocumentsStore';


export default class Match {
  rootStore: DriverAppStore;
  @observable matchId: string;
  @observable loadId: string;
  @observable status: MatchStatus;
  @observable notifications: Object;
  @observable timestamp: number;
  @observable cost?: number;
  @observable personId: string;
  @observable interactions: (IInteraction)[];
  @observable autoMatchId?: any;
  @observable uploadedFiles: Object;
  @observable parentLoad?: Load;
  @observable load?: Load;
  @observable ral_id?: string;
  @observable tracking?: ITracking;
  @observable documents: MatchDocumentsStore;

  constructor(matchData: IMatchData) {
    if (!matchData) {
      throw new Error('LoadOld is undefined.');
    }

    const {
      loadId, cost, personId, status, _id: id, matchId, interactions, notifications, timestamp,
      autoMatchId, uploadedFiles, ral_id, load, tracking, documents,
    } = matchData;
    this.rootStore = driverAppStore;
    this.matchId = id || matchId;
    this.loadId = loadId;
    this.status = status;
    this.notifications = notifications;
    this.timestamp = timestamp;
    this.cost = cost;
    this.personId = personId;
    this.interactions = interactions;
    this.autoMatchId = autoMatchId;
    this.uploadedFiles = uploadedFiles;
    this.ral_id = ral_id;
    this.tracking = tracking;
    this.documents = new MatchDocumentsStore(this, documents);
    this.parentLoad = load ? new Load(load, this) : undefined;
  }

  @computed get id() {
    return this.matchId;
  }

  @computed get matchActiveRequestedCallback() {
    const firstInteraction = this.getFirstInteractionOfType(new Set([
      InteractionEventTypes.REQUESTED_CALLBACK, InteractionEventTypes.RECEIVED_REQUESTED_CALLBACK, InteractionEventTypes.CALLBACK_CANCELLED]));
    if (firstInteraction && (
      firstInteraction.eventType === InteractionEventTypes.REQUESTED_CALLBACK
      || firstInteraction.eventType === InteractionEventTypes.RECEIVED_REQUESTED_CALLBACK)) {
      return firstInteraction;
    }
    return null;
  }

  @computed get matchBookedPending() {
    if ((this.status !== MatchStatus.LOAD_LOST) && (this.status !== MatchStatus.BOOKED)) {
      return this.getFirstInteractionOfType(new Set([InteractionEventTypes.ACCEPT_PENDING, InteractionEventTypes.DRIVER_ACCEPT]));
    }
    return null;
  }

  @computed get dispatched() {
    return this.getFirstInteractionOfType(new Set([InteractionEventTypes.DISPATCHED, InteractionEventTypes.RECEIVED_DISPATCH]));
  }

  @computed get receivedDispatchEvent() {
    return this.getFirstInteractionOfType(new Set([InteractionEventTypes.RECEIVED_DISPATCH]));
  }

  @computed get matchBooked() {
    return (this.status === MatchStatus.BOOKED);
  }

  @computed get matchInTransit() {
    return this.getStatusOfType(new Set([MatchStatus.ENROUTE_TO_PICKUP, MatchStatus.AT_PICKUP, MatchStatus.ENROUTE_TO_DROPOFF, MatchStatus.AT_DROPOFF]));
  }

  @computed get matchCompleted() {
    return (this.status === MatchStatus.COMPLETED);
  }

  @computed get matchCancelled() {
    return (this.status === MatchStatus.CANCELLED);
  }

  @computed get currentlyBeingTracked() {
    return this.tracking;
  }

  @computed get isManualTracking() {
    return this.currentlyBeingTracked && this.currentlyBeingTracked.mode === TRACKINGMODES.MANUAL;
  }

  @computed get isAutomatedTracking() {
    return this.currentlyBeingTracked && this.currentlyBeingTracked.mode === TRACKINGMODES.AUTOMATED;
  }

  @action
  setStatus(newStatus: MatchStatus) {
    this.status = newStatus;
  }

  @action
  setTracking(newTracking?: ITracking) {
    this.tracking = newTracking;
  }

  @action.bound
  updateSelf(matchData: IMatchData, parentLoad?: Load) {
    this.constructor(matchData, parentLoad || this.parentLoad);
  }

  @action.bound
  getFirstInteractionOfType(eventTypes: Set<InteractionEventTypes>) {
    return this.interactions.find(interaction => eventTypes.has(interaction.eventType));
  }

  @action.bound
  getStatusOfType(eventTypes: Set<MatchStatus>) {
    return eventTypes.has(this.status);
  }

  @action.bound setInteractions(interactions: IInteraction[]) {
    this.interactions = interactions;
  }

}
