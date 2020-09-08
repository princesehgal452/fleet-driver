import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { getTokenHeader } from '../GetTokenHeader';
import config from '../../../../config';
import { ApiFail } from '../../../utils/ErrorService';


export const PostCurrentCoordinates = async (lat: number, lon: number, accuracy: number) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  return axios.post(`${config.apiUrlV2}/trucks/location`,
    {
      position: {
        lat, lon, accuracy,
      },
    },
    { headers: tokenHeader },
  ).then(result => result.data)
  .catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
