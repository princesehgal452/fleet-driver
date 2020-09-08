import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { getTokenHeader } from '../GetTokenHeader';
import config from '../../../../config';
import { ApiFail } from '../../../utils/ErrorService';
import { mixpanelTrack } from '../../FOMixpanel';
import { MIXPANEL_EVENTS, MIXPANEL_KEYS } from '../../constants';


export const PostDriverInvite = async (fleetId: string, emails: string[] = [], phoneNumbers: string[] = []) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();
  const uri = `${config.apiUrlV2}/fleets/${fleetId}/invite`;
  return axios.post(
    uri,
    { emails, phoneNumbers },
    { headers: tokenHeader },
  ).then((response) => {
    mixpanelTrack(MIXPANEL_EVENTS.DISPATCHER_INVITED_DRIVERS);
    return (response.data.data);
  }).catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
