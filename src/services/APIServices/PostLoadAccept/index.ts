import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { getTokenHeader } from '../GetTokenHeader';
import config from '../../../../config';
import { ApiFail } from '../../../utils/ErrorService';
import { IPostLoadAcceptRejectHelper } from '../../../models/apiResponse/postLoadReject';


export const PostLoadAccept = async (loadId: string, isMatch: boolean) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  const uri = `${config.apiUrlV2}/${isMatch ? 'matches' : 'loads'}/${loadId}/accept`;
  return axios.post(
    uri,
    { accepted: true },
    { headers: tokenHeader },
  ).then((response: IPostLoadAcceptRejectHelper) => (response.data.data)).catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
