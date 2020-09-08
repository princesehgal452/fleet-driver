import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { getTokenHeader } from '../GetTokenHeader';
import config from '../../../../config';
import { ApiFail } from '../../../utils/ErrorService';
import { IPostLoadDispatchHelper } from '../../../models/apiResponse/postLoadDispatch';


export const PostLoadDispatch = async (loadId: string, driverTruckId: string, isMatch: boolean) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  return axios.post(
    `${config.apiUrlV2}/${isMatch ? 'matches' : 'loads'}/${loadId}/dispatch`,
    [driverTruckId],
    { headers: tokenHeader },
  ).then((response: IPostLoadDispatchHelper) => (response.data.data)).catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
