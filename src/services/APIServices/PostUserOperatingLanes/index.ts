import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { IOperatingLane } from '../../../models/interfaces/shared/IOperatingLanes';
import { FOUser } from '../../../models/dataStructures/FOUser';
import { IFOUser } from '../../../models/interfaces/shared/IFOUser';


const postUserOperatingLanes = async (operatingLanes: IOperatingLane[]) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/users/me/operatingLanes`;

  return fetchRetry(url, {
    method: 'POST',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ operatingLanes }),
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IFOUser;
  });
};

export default postUserOperatingLanes;
