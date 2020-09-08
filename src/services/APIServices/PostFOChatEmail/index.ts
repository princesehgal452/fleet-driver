import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { getTokenHeader } from '../GetTokenHeader';
import { fetchRetry } from '../index';


export const postFOChatEmail = async (transcript: string, email: string) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  if (!transcript || !email) {
    throw new Error('Transcript or email has to be provided in parameters');
  }

  const tokenHeader = await getTokenHeader();

  const uri = `${config.apiUrlV2}/chat/email`;

  return fetchRetry(uri, {
    method: 'POST',
    body: JSON.stringify({
      transcript,
      email,
    }),
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data;
  });
};
