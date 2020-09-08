import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../../../config';
import { getTokenHeader } from '../GetTokenHeader';
import { ApiFail } from '../../../utils/ErrorService';
import { IGetDispatcherTrucksHelper } from '../../../models/apiResponse/getDispatcherTrucks';
import { DriverTruck } from '../../../models/dataStructures/DriverTruck';


export const GetDispatcherTrucks = async (fleetId: string, dispatchable = false) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  const uri = `${config.apiUrlV2}/fleets/${fleetId}/trucks`;
  return axios.get(
    dispatchable ? `${uri}/?dispatchable=true` : uri,
    { headers: tokenHeader },
  ).then((response: IGetDispatcherTrucksHelper) => response.data.data.map(driverTruck => new DriverTruck(driverTruck)))
  .catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
