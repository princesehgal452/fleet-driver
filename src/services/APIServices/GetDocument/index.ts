import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';


export const getUserDocuments = async (label: string): Promise<Blob> => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = label === 'other'
    ? `${config.apiUrlV2}/users/me/documents/${label}/${label}`
    : `${config.apiUrlV2}/users/me/documents/${label}`;

  return fetchRetry(url, {
    method: 'GET',
    headers: { ...tokenHeader, 'Content-Type': 'application/pdf' },
  }).then(async (response) => {
    const responseJson = await response.blob();
    return responseJson;
  });
};
