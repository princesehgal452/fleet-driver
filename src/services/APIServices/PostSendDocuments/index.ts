import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';


export const postSendDocuments = async (email: string) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/users/me/documents/send`;

  return fetchRetry(url, {
    method: 'POST',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify([email]),
  }).then(async response => await response);
};
