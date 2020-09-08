import firebase from 'firebase/app';
import 'firebase/auth';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { IMatchData } from '../../../models/interfaces/shared/IMatchData';
import config from '../../../../config';
import { ApiFail } from '../../../utils/ErrorService';


export const postMatchCancel = async (matchId: string) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/matches/${matchId}/cancel`;
  return fetchRetry(url, {
    method: 'PATCH',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ cancelled: true }),
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IMatchData;
  }).catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
