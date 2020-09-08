import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../../config';
import { fetchRetry } from '../../index';
import { getTokenHeader } from '../../GetTokenHeader';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';


const PostGeotabCreateDriverTrucks = async (server: string, database: string, username: string, sessionId: string) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/partner/geotab/createDriverTrucks`;

  return fetchRetry(url, {
    method: 'POST',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ server, database, username, session_id: sessionId }),
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data.map((driverTruck) => new DriverTruck(driverTruck));
  });
};

export default PostGeotabCreateDriverTrucks;
