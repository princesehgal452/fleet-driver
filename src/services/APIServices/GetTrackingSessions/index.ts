import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import TrackingSession from '../../../models/dataStructures/TrackingSession';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';


interface IGetTrackingSessionsArgs {
  personId: string;
}

const getTrackingSessions = async (page, { personId }: IGetTrackingSessionsArgs) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/tracking/?personId=${personId}`;

  return fetchRetry(url, {
    method: 'GET',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json();
    return {
      data: responseJson.data.map((trackingSession) => new TrackingSession(trackingSession)) as TrackingSession[],
      pagination: responseJson.pagination,
    };
  });
};

export default getTrackingSessions;
