import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../../config';
import { fetchRetry } from '../../index';
import { getTokenHeader } from '../../GetTokenHeader';
import { IFOUser } from '../../../../models/interfaces/shared/IFOUser';


const PostGeotabAcknowledgement = async (acknowldgementIncrementBy: number) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();

  const uri = `${config.apiUrlV2}/users/me/geotabAcknowledgement`;

  return fetchRetry(uri, {
    method: 'PATCH',
    body: JSON.stringify({
      incrementAcknowledgement: acknowldgementIncrementBy,
    }),
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IFOUser;
  });
};

export default PostGeotabAcknowledgement;
