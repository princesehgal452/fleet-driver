import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../../../config';
import { getTokenHeader } from '../GetTokenHeader';
import { ApiFail } from '../../../utils/ErrorService';
import { ITutorial } from '../../../models/interfaces/shared/ITutorial';


export const PostTutorial = async (tutorial: ITutorial) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  const uri = `${config.apiUrlV2}/users/me/tutorial`;
  return axios.post(
    uri,
    tutorial,
    { headers: tokenHeader },
  ).then(response => (response.data.data)).catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
