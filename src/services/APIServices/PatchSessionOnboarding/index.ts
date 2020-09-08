import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { fetchRetry } from '../index';
import { getTokenHeader } from '../GetTokenHeader';
import { IPartnerOnboarding } from '../../../models/interfaces/shared/ITrackingSesssionOnboarding';


export const patchSessionOnboarding = async (onboardingId: string, action: 'accept' | 'reject') => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  const tokenHeader = await getTokenHeader();
  const url = `${config.apiUrlV2}/onboarding/${onboardingId}/${action}`;

  return fetchRetry(url, {
    method: 'PATCH',
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const jsonResponse = await response.json();
    return jsonResponse.data as IPartnerOnboarding;
  });
};
