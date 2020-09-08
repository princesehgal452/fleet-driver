import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { IGetUser } from '../../../models/apiResponse/getUser';
import { FOUser } from '../../../models/dataStructures/FOUser';


export const putUserDocuments = async (label: string, file: File): Promise<FOUser> => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/users/me/documents`;

  const formData = new FormData();
  if (label === 'other') {
    formData.append('tag', label);
  }
  formData.append('label', label);
  formData.append('files', file);

  return fetchRetry(url, {
    method: 'PUT',
    headers: { ...tokenHeader },
    body: formData,
  }).then(async (response) => {
    const responseJson: IGetUser = await response.json();
    return responseJson.data;
  });
};
