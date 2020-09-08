import config from '../../../../config';
import { fetchRetry } from '../index';
import { TrackingTripStatus } from '../../constants';
import { ITrackingSession } from '../../../models/interfaces/shared/ITrackingSession';
import firebase from 'firebase';
import { getTokenHeader } from '../GetTokenHeader';


interface IPatchTrackingSession {
  tripStatus?: TrackingTripStatus;
}

const patchTrackingSession = async (trackingSessionId: string, params: IPatchTrackingSession) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/tracking/${trackingSessionId}`;

  return fetchRetry(url, {
    method: 'PATCH',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as ITrackingSession;
  });
};

export default patchTrackingSession;
