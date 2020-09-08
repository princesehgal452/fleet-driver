import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../../../config';
import { getTokenHeader } from '../GetTokenHeader';
import { ApiFail } from '../../../utils/ErrorService';
import { IPatchDispatcherTrucksHelper } from '../../../models/apiResponse/patchDispatcherTrucks';


export const patchDispatcherTrucks = async (fleetId: string, driverTrucks) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  const uri = `${config.apiUrlV2}/fleets/${fleetId}/dispatchable`;
  return axios.post(
    uri,
    driverTrucks,
    { headers: tokenHeader },
  ).then((response: IPatchDispatcherTrucksHelper) => response.data.data)
    .catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
};
