import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../../../config';
import { ApiFail } from '../../../utils/ErrorService';
import { getTokenHeader } from '../GetTokenHeader';
import { IGetNotifications, IGetNotificationsHelper } from '../../../models/apiResponse/getNotifications';
import { INotificationData } from '../../../models/interfaces/shared/INotificationData';
import Match from '../../../models/dataStructures/Match';


export const getNotifications = async (page: number = 1) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/users/me/notifications?page=${page}`;

  return axios.get(
    url,
    { headers: tokenHeader })
  .then((response: IGetNotificationsHelper) => {
    return {
      data: response.data.data.reduce((acc, curr) => {
        try {
          const match = new Match(curr.data.match);
          return [...acc, {
            ...curr, data: {
              ...curr.data,
              match,
            },
          }] as INotificationData[];
        } catch (error) {
          console.log('Invalid match from notificaions API');
          return acc;
        }
      }, [] as INotificationData[]),
      pagination: response.data.pagination,
    } as IGetNotifications;
  })
  .catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
