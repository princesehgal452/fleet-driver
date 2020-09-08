import config from '../../../../config';
import { fetchRetry } from '../index';
import { ICommunicationsPreferences } from '../../../models/interfaces/shared/ICommunicationsPreferences';


const patchPublicUserCommunicationsPreference = async (email: string, requestid: string, name: string, value: boolean) => {
  const url = `${config.apiUrlV2}/users/communicationsPreferences`;

  return fetchRetry(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [name]: value, email, requestid }),
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as ICommunicationsPreferences;
  });
};

export default patchPublicUserCommunicationsPreference;
