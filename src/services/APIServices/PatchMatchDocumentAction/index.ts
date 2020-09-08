import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { DocumentKeys } from '../../constants';
import { IMatchData } from '../../../models/interfaces/shared/IMatchData';


export const patchMatchDocumentAction = async (documentKey: DocumentKeys, matchId: string, action: 'accept' | 'reject') => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/matches/${matchId}/documents/${documentKey}/${action}`;

  return fetchRetry(url, {
    method: 'PATCH',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IMatchData;
  });
};
