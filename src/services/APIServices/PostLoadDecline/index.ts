import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../../../config';
import { getTokenHeader } from '../GetTokenHeader';
import { ApiFail } from '../../../utils/ErrorService';
import { IPostLoadAcceptRejectHelper } from '../../../models/apiResponse/postLoadReject';


export const PostLoadDecline = async (
  loadId: string, isMatch: boolean, userType: ('driver' | 'dispatcher'), reason?: string) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  const uri = `${config.apiUrlV2}/${isMatch ? 'matches' : 'loads'}/${loadId}/reject`;
  return axios.post(
    uri,
    {
      userType,
      reason,
      rejected: true,
    },
    { headers: tokenHeader },
  ).then((response: IPostLoadAcceptRejectHelper) => (response.data.data)).catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
