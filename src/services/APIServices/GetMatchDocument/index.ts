import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { DocumentKeys } from '../../constants';


export const getMatchDocument = async (documentKey: DocumentKeys, matchId: string): Promise<Blob> => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/matches/${matchId}/documents/${documentKey}`;


  return fetchRetry(url, {
    method: 'GET',
    headers: { ...tokenHeader, 'Content-Type': 'application/pdf' },
  }).then(async (response) => {
    const responseJson = await response.blob();
    return responseJson;
  });
};
