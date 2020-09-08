import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { FOUser } from '../../../models/dataStructures/FOUser';


const patchUserPermissions = async (personId: string, name: string, value: boolean) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/users/permissions/${personId}`;

  return fetchRetry(url, {
    method: 'PATCH',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ [name]: value }),
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as FOUser;
  });
};

export default patchUserPermissions;
