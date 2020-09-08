import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { IFleet } from '../../../models/interfaces/shared/IFleet';


export const getFleet = async (fleetId: string) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/fleets/${fleetId}`;
  return fetchRetry(url, {
    method: 'GET',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IFleet;
  });
};
