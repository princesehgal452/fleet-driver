import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../../config';
import { fetchRetry } from '../../index';
import { getTokenHeader } from '../../GetTokenHeader';
import { IFleet } from '../../../../models/interfaces/shared/IFleet';


const PostCreateServiceAccount = async (server: string, database: string, username: string, sessionId: string) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();

  const uri = `${config.apiUrlV2}/partner/geotab/createServiceAccount`;

  return fetchRetry(uri, {
    method: 'POST',
    body: JSON.stringify({ server, database, username, session_id: sessionId }),
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IFleet;
  });
};

export default PostCreateServiceAccount;
