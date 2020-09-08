import { action, observable } from 'mobx';
import StoreBase from '../StoreBase';
import { DriverAppStore } from '../DriverAppStore';

import patchPublicUserCommunicationsPreference
  from '../../../services/APIServices/PatchPublicUserCommunicationsPreference';
import getPublicUserCommunicationsPreference from '../../../services/APIServices/GetPublicUserCommunicationsPreference';
import patchPublicUserEquipment from '../../../services/APIServices/PatchPublicUserEquipment';
import { ICommunicationsPreferences } from '../../../models/interfaces/shared/ICommunicationsPreferences';
import { ICommunicationPreferencesListItem } from '../../../models/interfaces/shared/ICommunicationPreferencesListItem';
import { IEquipmentTypes } from '../../../models/interfaces/shared/IEquipmentTypes';


export default class PublicStore extends StoreBase {
  rootStore: DriverAppStore;

  @observable communicationsPreferences: ICommunicationsPreferences;
  @observable equipmentType: IEquipmentTypes;

  constructor(rootStore: DriverAppStore) {
    super();
    this.rootStore = rootStore;
  }

  @action.bound setCommunicationPreferences(communicationPreferences: ICommunicationsPreferences) {
    this.communicationsPreferences = communicationPreferences;
  }

  @action.bound setSelectedEquipmentType(equipmentType: IEquipmentTypes) {
    this.equipmentType = equipmentType;
  }

  @action.bound
  updateCommunicationPreference = async (email: string, requestid: string, name: string, value: boolean) => {
    try {
      this.setLoading(true);
      const communicationsPreferences = await patchPublicUserCommunicationsPreference(email, requestid, name, value);
      this.setCommunicationPreferences(communicationsPreferences);
      this.rootStore.snackbarStore.enqueueSnackbarStore('Successfully updated your preferences.', { variant: 'success' });
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Error updating communications preferences', { variant: 'error' });
    } finally {
      this.setLoading(false);
    }
  };

  @action.bound
  getCommunicationPreferences = async (email: string, requestid: string) => {
    try {
      this.setLoading(true);
      const communicationsPreferences = await getPublicUserCommunicationsPreference(email, requestid);
      this.setCommunicationPreferences(communicationsPreferences);
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Error getting communications preferences', { variant: 'error' });
    } finally {
      this.setLoading(false);
    }
  };

  @action.bound
  getCommunicationPreferencesList = () => {
    let communicationPreferencesList: ICommunicationPreferencesListItem[] = [
      {
        preferenceKey: 'load_request_responses',
        title: 'Receive Responses to Load Requests',
        description: 'These are notifications you receive for matches to truck postings and load requests.',
      },
        {
          preferenceKey: 'scientific_recommendations',
          title: 'Receive Scientifically Sourced Recommendations',
          description: 'These are notifications you receive based on shipment recommendations built by our data science team.',
      }
    ]
    if(!this.rootStore.configStore.isGeotab) {
      communicationPreferencesList.push({
        preferenceKey: 'brf_certified_recommendations',
        title: 'Receive BigRoad Freight Certified Recommendations',
        description: 'These notifications are special offers from our BigRoad Certified partners, including companies like Loadsmart.',
      })
    }
    return communicationPreferencesList;
  }

  @action.bound
  updateEquipmentType = async (email: string, requestid: string, selectedEquipmentType: string) => {
    try {
      this.setLoading(true);
      const responseJson = await patchPublicUserEquipment(email, requestid, selectedEquipmentType);
      this.setSelectedEquipmentType(selectedEquipmentType);
      this.rootStore.snackbarStore.enqueueSnackbarStore('Successfully updated your equipment.', { variant: 'success' });
    } catch (error) {
      this.rootStore.snackbarStore.enqueueSnackbarStore('Error updating equipment.', { variant: 'error' });
    } finally {
      this.setLoading(false);
    }
  };
}
