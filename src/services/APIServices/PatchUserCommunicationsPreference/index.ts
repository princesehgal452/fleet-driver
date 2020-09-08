import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { FOUser } from '../../../models/dataStructures/FOUser';
import { IFOUser } from '../../../models/interfaces/shared/IFOUser';


const patchUserCommunicationsPreference = async (name: string, value: boolean) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/users/me/communicationsPreferences`;

  return fetchRetry(url, {
    method: 'PATCH',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ [name]: value }),
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IFOUser;
  });
};

export default patchUserCommunicationsPreference;
