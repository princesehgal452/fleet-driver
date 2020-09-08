import { action, computed, IObservableArray, observable } from 'mobx';
import TrackingSession from '../../../models/dataStructures/TrackingSession';
import CollectionsStore from '../CollectionsStore';
import getTrackingSessions from '../../../services/APIServices/GetTrackingSessions';
import { DriverAppStore } from '../DriverAppStore';
import { TrackingTripStatus } from '../../../services/constants';
import { IPartnerOnboarding } from '../../../models/interfaces/shared/ITrackingSesssionOnboarding';
import { getSessionOnboarding } from '../../../services/APIServices/GetSessionOnboarding';
import { patchSessionOnboarding } from '../../../services/APIServices/PatchSessionOnboarding';
import ApiLayer from '../../../services/APIServices/ApiLayer';
import { isObjectId } from '../../../utils/utility';
import Load from '../../../models/dataStructures/Load';


export default class TrackingSessionsStore extends CollectionsStore {
  rootStore: DriverAppStore;
  @observable trackingSessions: TrackingSession[];
  @observable activeSessionLoad?: Load;
  @observable partnerOnboarding: IObservableArray<IPartnerOnboarding>;
  @observable personId: string;

  constructor(rootStore: DriverAppStore, personId: string) {
    super(rootStore, true, getTrackingSessions);
    this.rootStore = rootStore;
    this.trackingSessions = [];
    this.partnerOnboarding = observable([]);
    this.personId = personId;
  }

  @computed get activeSession(): TrackingSession | undefined {
    return this.results.find((session) => session.details.tripStatus !== TrackingTripStatus.AWAITING_START);
  }

  @computed get pendingSessions() {
    return this.results.filter((session) => session !== this.activeSession);
  }

  @action.bound
  setPartnerOnboarding(partnerOnboarding: IPartnerOnboarding[]) {
    this.partnerOnboarding.replace(partnerOnboarding);
  }

  @action.bound
  setActiveSessionLoad(load: Load) {
    this.activeSessionLoad = load;
  }

  @action.bound
  async downloadOnboardingSessions() {
    try {
      const onboardingSessions = await getSessionOnboarding(this.personId);
      this.setPartnerOnboarding(onboardingSessions);
    } catch (e) {
    }
  }

  @action.bound
  async updatePartnerOnboarding(onboardingId: string, patchAction: 'accept' | 'reject') {
    try {
      const updatedOnboardingSession = await patchSessionOnboarding(onboardingId, patchAction);
      this.setPartnerOnboarding(this.partnerOnboarding.map((onboardingSession) => (
        onboardingSession.onboardingId === updatedOnboardingSession.onboardingId ? updatedOnboardingSession : onboardingSession
      )));
    } catch (e) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Technical error performing action', { variant: 'error' });
    }
  }

  @action.bound
  async downloadActiveSessionLoad() {
    if (this.activeSession && isObjectId(this.activeSession.matchReferenceId)) {
      try {
        this.setLoading(true);
        const match = await ApiLayer.getMatch(this.activeSession.matchReferenceId);
        if (match?.parentLoad) {
          this.setActiveSessionLoad(match.parentLoad);
        }
      } catch (e) {
      } finally {
        this.setLoading(false);
      }
    }
  }
}
