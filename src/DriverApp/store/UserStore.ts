import { action, computed, IObservableArray, observable } from 'mobx';
import firebase from 'firebase/app';
import 'firebase/auth';
import mixpanel from 'mixpanel-browser';
import { saveAs } from 'file-saver';
import { asyncComputed } from 'computed-async-mobx';
import StoreBase from './StoreBase';
import {
  ACCEPTED_UPLOAD_TYPES,
  MIXPANEL_EVENTS,
  MIXPANEL_KEYS,
  registrationStatesDefaultDriver,
} from '../../services/constants';
import { GetDispatcherTrucks } from '../../services/APIServices/GetDispatchableDrivers';
import { patchDispatcherTrucks } from '../../services/APIServices/PatchDispatchableDriver';
import ApiLayer from '../../services/APIServices/ApiLayer';
import { DriverAppStore } from './DriverAppStore';
import { DispatchableType } from '../../models/dataStructures/DispatchableType';
import { DriverTruck } from '../../models/dataStructures/DriverTruck';
import { PostCurrentCoordinates } from '../../services/APIServices/PostCurrentCoordinates';
import { ICoordinate } from '../../models/interfaces/shared/ICoordinate';
import { ITutorial } from '../../models/interfaces/shared/ITutorial';
import { PostTutorial } from '../../services/APIServices/PostTutorial';
import { putUserDocuments } from '../../services/APIServices/PutUserDocuments';
import { getUserDocuments } from '../../services/APIServices/GetDocument';
import { postSendDocuments } from '../../services/APIServices/PostSendDocuments';
import { IFleet } from '../../models/interfaces/shared/IFleet';
import { getFleet } from '../../services/APIServices/GetFleet';
import { ErrorException } from '../../utils/ErrorService';
import { TruckRoles } from '../../models/dataStructures/TruckRoles';
import { mixpanelSetUser, mixpanelTrack } from '../../services/FOMixpanel';
import { IOperatingLane } from '../../models/interfaces/shared/IOperatingLanes';
import postUserOperatingLanes from '../../services/APIServices/PostUserOperatingLanes';
import patchUserCommunicationsPreference from '../../services/APIServices/PatchUserCommunicationsPreference';
import PostGeotabAcknowledgement from '../../services/APIServices/Users/PostGeotabAcknowledgement';
import { FOUser } from '../../models/dataStructures/FOUser';
import { IFOUser } from '../../models/interfaces/shared/IFOUser';
import PostGeotabCreateDriverTrucks from '../../services/APIServices/Geotab/PostGeotabCreateDriverTrucks';

// eslint-disable-next-line import/prefer-default-export
export class UserStore extends StoreBase {
  rootStore: DriverAppStore;
  @observable FOUser?: FOUser;
  @observable loggedIn = false;
  @observable isWebview = false;
  @observable queryEmail = '';
  @observable queryAuthToken = '';
  @observable dispatcherTrucks: IObservableArray<DriverTruck> = observable([]);
  @observable currentCoordinates: ICoordinate = { lat: 0, lng: 0 };
  @observable documentsBlobs?: { [key: string]: Blob };
  @observable fleet?: IFleet;
  @observable hideTracking = false;
  @observable showedGeotabAcknowledgement = false;

  constructor(rootStore: DriverAppStore) {
    super();
    this.rootStore = rootStore;
    this.checkWebview();
  }

  @computed get dispatchableDriver() {
    return Boolean(this.FOUser?.userType === 'dispatchableDriver');
  }

  @computed get dispatcher() {
    return Boolean(this.FOUser?.userType === 'dispatcher');
  }

  @computed get defaultDriver() {
    return !(this.dispatchableDriver || this.dispatcher);
  }

  @computed get newDriversAvailable() {
    return Boolean(this.dispatcherTrucks.find((truck) => truck.dispatchable === DispatchableType.NEW));
  }

  @computed get completedMcNumber() {
    return Boolean(this.FOUser?.mcNumber);
  }

  @computed get completedPersonalInfo() {
    return Boolean(this.FOUser?.companyType);
  }

  @computed get completedEquipmentType() {
    return Boolean(this.FOUser?.equipmentTypeList && this.FOUser.equipmentTypeList.length > 0);
  }

  @computed get completedPreferredLanes() {
    return Boolean((this.FOUser?.preferredLanes && this.FOUser?.preferredLanes.states
      && this.FOUser?.preferredLanes.states.length > 0) || this.FOUser?.preferredLanes.skipOnboarding);
  }

  @computed get acceptedTermsAndConditions() {
    return Boolean(this.FOUser?.tac);
  }

  @computed get blacklistedCompanyType() {
    return Boolean(this.FOUser?.companyType.toLowerCase() === 'company driver'
      || this.FOUser?.companyType.toLowerCase() === 'dispatcher');
  }

  @computed get isCompanyDriver() {
    return Boolean(this.FOUser?.companyType.toLowerCase() === 'company driver');
  }

  @computed get canAssignToMe() {
    // Only users of type 'dispatcher' who also have 'driver' role can assign to self.
    return this.dispatcher && this.FOUser?.truck?.roles.includes(TruckRoles.DRIVER);
  }

  @computed get dispatchableDrivers() {
    const dDrivers: (DriverTruck | undefined)[] = [];
    if (this.dispatcher && this.FOUser?.drivers) {
      dDrivers.push(...this.FOUser?.drivers);
      if (this.canAssignToMe) {
        dDrivers.push(this.FOUser?.truck);
      }
    }
    return dDrivers;
  }

  @computed get getDefaultDriverOnboardingLastStep() {
    if (!this.completedEquipmentType) {
      return registrationStatesDefaultDriver.equipmentList;
    }
    // Onboarding done.
    return registrationStatesDefaultDriver.success;
  }

  @computed get defaultDriverCompletedOnboarding() {
    return this.completedEquipmentType;
  }

  @computed get dispatcherCompletedOnboarding() {
    return !this.FOUser?.firstLogin;
  }

  @computed get dispatchableDriverCompletedOnboarding() {
    return !this.FOUser?.firstLogin;
  }

  @computed get hasRequiredDocuments() {
    return Boolean(this.FOUser?.documents && (this.FOUser?.documents?.w9 && this.FOUser?.documents?.coi && this.FOUser?.documents?.cau));
  }

  @computed get trackedMatchID() {
    return this.FOUser?.tracking;
  }

  @computed get operatingLanes() {
    return this.FOUser?.operatingLanes || [];
  }

  @computed get userFirstName() {
    const separator = this.FOUser?.displayName.indexOf(',') > 0 ? ',' : ' ';
    return this.FOUser?.displayName.split(separator)[0];
  }

  @computed get hasServiceAccount() {
    return Boolean(this.fleet?.geotabIntegration?.geotabIntegrationServiceAccount);
  }

  @action.bound setLogin(loginState: boolean) {
    this.loggedIn = loginState;
    if (loginState) {
      this.fetchUserAdditionalMetadata();
    }
  }

  @action.bound setFleet(fleet: IFleet) {
    this.fleet = fleet;
    mixpanel.people.set({ [MIXPANEL_KEYS.CARRIER_NAME]: fleet ? fleet.carrierName : null });
  }

  @action.bound
  async fetchUserAdditionalMetadata() {
    if (!this.fleet && this.FOUser?.fleetId) {
      try {
        const fleet = await getFleet(this.FOUser?.fleetId);
        this.setFleet(fleet);
      } catch (error) {
        ErrorException('Error fetching fleet for user', error);
      }
    }
  }

  @action.bound
  async getDispatcherDrivers() {
    if (this.FOUser?.fleetId) {
      try {
        let dispatcherTrucks = await GetDispatcherTrucks(this.FOUser?.fleetId);
        if (dispatcherTrucks.length === 0 && this.rootStore.configStore.isGeotab && this.rootStore.partnerStore.geotabSession) {
          const {
            geotabServer, geotabSession: {
              database, userName, sessionId,
            },
          } = this.rootStore.partnerStore;
          dispatcherTrucks = await PostGeotabCreateDriverTrucks(
            geotabServer, database, userName, sessionId,
          );
        }
        this.setDispatcherTrucks(dispatcherTrucks);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  @action.bound
  async patchUser(userData) {
    try {
      const apiResponse = await ApiLayer.onboardUser(userData); // this API doesn't return fleetID
      this.setFOUser({ ...apiResponse.user, fleetId: this.FOUser?.fleetId });
    } catch (error) {
      throw new Error('Technical error updating drivers');
    }
  }

  @action.bound
  acceptTAC() {
    return this.patchUser({ tac: new Date().toISOString() });
  }

  @action.bound
  async sendTutorialUpdate(tutorial: ITutorial) {
    try {
      this.setTutorial({ ...this.FOUser?.tutorial, ...tutorial });
      await PostTutorial(tutorial);
    } catch (error) {
      console.log('Error updating tutorial');
    }
  }

  @action.bound
  setTutorial(tutorial: ITutorial) {
    if (this.FOUser) {
      this.FOUser.tutorial = tutorial;
    }
  }

  @action.bound
  async updateDispatcherTrucks(driverTrucks) {
    const { fleetId } = this.FOUser;
    if (!fleetId) {
      throw new Error('Dispatcher\'s fleetID is missing');
    }
    try {
      const user = await patchDispatcherTrucks(fleetId, driverTrucks
      .filter((dt: any) => dt.dispatchable === DispatchableType.DISPATCHABLE)
      .map((dt) => (dt.rawDriverTruck ? dt.rawDriverTruck : dt)));
      this.setFOUser(user);
    } catch (error) {
      throw new Error('Technical error updating drivers');
    }
  }

  @action.bound setDispatcherTrucks(driverTrucks: DriverTruck[]) {
    this.dispatcherTrucks.replace(driverTrucks);
  }

  @action.bound setFOUser(user: IFOUser) {
    this.FOUser = new FOUser(user);
    const { currentUser } = firebase.auth();
    if (currentUser) {
      currentUser.foUser = user;
    }
    // Uncomment this line to force driver usertype. USE FOR TESTING ONLY
    // this.FOUser?.userType = 'dispatcher';
  }

  @action.bound
  setCurrentCoordinates(coordinates: ICoordinate) {
    this.currentCoordinates = coordinates;
  }

  @action.bound
  setShowedGeotabAcknowledgement(newState) {
    this.showedGeotabAcknowledgement = newState;
  }

  @action.bound
  updateGeotabAcknowledgement = async (acknowldgementIncrementBy: number) => {
    try {
      const user = await PostGeotabAcknowledgement(acknowldgementIncrementBy);
      this.setFOUser(user);
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        'Sorry, there was an error acknowledging your request', { variant: 'error' },
      );
    }
  };

  @action.bound
  setDocumentBlob(label: string, documentBlob: Blob) {
    this.documentsBlobs = {
      ...this.documentsBlobs,
      [label]: documentBlob,
    };
  }

  @action.bound
  updateCoordinates() {
    this.setCurrentCoordinates({ lat: 0, lng: 0 });
    this.downloadCurrentCoordinatesAsync();
  }

  @action.bound
  downloadCurrentCoordinatesAsync = async () => {
    if (this.currentCoordinates.lat || this.currentCoordinates.lng) {
      return this.currentCoordinates;
    }
    try {
      const currentCoordinatesAPIResponse = await ApiLayer.getCurrentCoordinates();
      const { location: { lat, lng }, accuracy } = currentCoordinatesAPIResponse;
      this.setCurrentCoordinates({ lat, lng });
      PostCurrentCoodrinates(lat, lng, accuracy);
      mixpanelSetUser(this.FOUser, { lat, lng });
      return { lat, lng } as ICoordinate;
    } catch (error) {
      return this.currentCoordinates;
    } finally {
      setTimeout(this.updateCoordinates, 300000); // 5 minutes
    }
  };

  getCurrentCoordinates = asyncComputed(
    this.currentCoordinates,
    500,
    this.downloadCurrentCoordinatesAsync,
  );

  @action.bound
  updateDocument = async (label: string, file: File) => {
    const { snackbarStore: { enqueueSnackbarStore } } = this.rootStore;

    const acceptableFileType = ACCEPTED_UPLOAD_TYPES.find((acceptedType) => file.type.match(`.${acceptedType}`));

    if (!acceptableFileType) {
      enqueueSnackbarStore(
        'File type not supported', { variant: 'error' },
      );
      enqueueSnackbarStore(
        'Please use PDF or image files only', { variant: 'info' },
      );
      throw new Error('Unsupported file type');
    }

    try {
      const user = await putUserDocuments(label, file);
      this.setFOUser(user);
      mixpanelTrack(MIXPANEL_EVENTS.DOCUMENT_UPLOADED, { [MIXPANEL_KEYS.DOCUMENT_TYPE]: label });
    } catch (error) {
      enqueueSnackbarStore(
        'Sorry, there was an error posting your file', { variant: 'error' },
      );
      throw error;
    }
  };

  @action.bound
  getDocument = async (label: string, documentName?: string) => {
    let documentBlob = this.documentsBlobs && this.documentsBlobs[label];
    if (!documentBlob) {
      try {
        documentBlob = await getUserDocuments(label);
        this.setDocumentBlob(label, documentBlob);
      } catch (error) {
        this.rootStore.snackbarStore.enqueueSnackbarStore(
          'Sorry, there was an error downloading your file', { variant: 'error' },
        );
      }
    }
    if (documentBlob) {
      saveAs(documentBlob, documentName);
    }
  };

  @action.bound setHideTracking(newState: boolean) {
    this.hideTracking = newState;
  }

  @action.bound
  setOperatingLanes(operatingLanes: IOperatingLane[]) {
    this.FOUser?.operatingLanes.replace(observable(operatingLanes));
  }

  @action.bound
  updateOperatingLanes = async (operatingLanes: IOperatingLane[]) => {
    const existingOperatingLanes = [...this.FOUser?.operatingLanes];
    try {
      this.setOperatingLanes(operatingLanes);
      const user = await postUserOperatingLanes(operatingLanes);
      this.setFOUser(user);
    } catch (error) {
      this.setOperatingLanes(existingOperatingLanes);
      this.rootStore.snackbarStore.enqueueSnackbarStore('Error updating operating lanes', { variant: 'error' });
      throw error;
    }
  };

  @action.bound
  updateCommunicationPreference = async (name: string, value: boolean | string) => {
    try {
      this.setLoading(true);
      const user = await patchUserCommunicationsPreference(name, value);
      this.setFOUser(user);
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Error updating communications preferences', { variant: 'error' });
    } finally {
      this.setLoading(false);
    }
  };

  shareDocuments = async (email: string) => {
    try {
      await postSendDocuments(email);
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        'Successfully shared your documents', { variant: 'success' },
      );
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore(
        'Sorry, there was an error sending your documents', { variant: 'error' },
      );
    }
  };

  @action.bound
  preserveAuthQueryParams(queryEmail: string, queryAuthToken: string) {
    this.queryEmail = queryEmail;
    this.queryAuthToken = queryAuthToken;
  }

  @action.bound
  checkWebview() {
    // For reference
    // https://stackoverflow.com/questions/4460205/detect-ipad-iphone-webview-via-javascript
    // https://developer.chrome.com/multidevice/user-agent#webview_user_agent
    const { standalone } = window.navigator;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipod|ipad/.test(userAgent);
    const safari = userAgent.includes('safari');
    const webviewAndroid = /version\/\d\.\d /.test(userAgent);

    if (ios) {
      if (!standalone && safari) {
        // browser
      } else if (standalone && !safari) {
        // standalone
      } else if (!standalone && !safari) {
        // uiwebview
        this.isWebview = true;
      }
    } else {
      // not iOS
      if (webviewAndroid) {
        this.isWebview = true;
      }
    }
  }
}
