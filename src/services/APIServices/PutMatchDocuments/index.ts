import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { IMatchData } from '../../../models/interfaces/shared/IMatchData';
import { DocumentKeys } from '../../constants';


export const putMatchDocuments = async (matchId: string, documentKey: DocumentKeys, file: File): Promise<IMatchData> => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/matches/${matchId}/documents/${documentKey}`;

  const formData = new FormData();
  formData.append('files', file);

  return fetchRetry(url, {
    method: 'PUT',
    headers: { ...tokenHeader },
    body: formData,
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IMatchData;
  });
};
