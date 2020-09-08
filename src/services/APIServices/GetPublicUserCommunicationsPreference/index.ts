import config from '../../../../config';
import { fetchRetry } from '../index';
import { ICommunicationsPreferences } from '../../../models/interfaces/shared/ICommunicationsPreferences';


const getPublicUserCommunicationsPreference = async (email: string, requestid: string) => {
  const url = `${config.apiUrlV2}/users/communicationsPreferences?email=${email}&requestid=${requestid}`;

  return fetchRetry(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as ICommunicationsPreferences;
  });
};

export default getPublicUserCommunicationsPreference;
