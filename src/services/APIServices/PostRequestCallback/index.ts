import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { ApiFail } from '../../../utils/ErrorService';
import { IPostLoadDispatch } from '../../../models/apiResponse/postLoadDispatch';


export const PostRequestCallback = async (loadId: string, requestedDateTimestamp: number, isMatch?: boolean) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  return fetchRetry(
    `${config.apiUrlV2}/${isMatch ? 'matches' : 'loads'}/${loadId}/contact/schedule`, {
      method: 'POST',
      headers: { ...tokenHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestedDateTimestamp }),
    })
  .then(async (response) => {
    const responseJson: IPostLoadDispatch = await response.json();
    return responseJson.data;
  })
  .catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
