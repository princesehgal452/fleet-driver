import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../../../config';
import { ApiFail } from '../../../utils/ErrorService';
import { getTokenHeader } from '../GetTokenHeader';
import { IUpdateNotificationsHelper } from '../../../models/apiResponse/updateNotifications';


export const updateNotifications = async (notificationId: string) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/notifications/${notificationId}`;

  return axios.post(
    url,
    { read: true },
    { headers: tokenHeader })
  .then((response: IUpdateNotificationsHelper) => (response.data.data))
  .catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
