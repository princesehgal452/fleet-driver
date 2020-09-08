import config from '../../../../config';
import { fetchRetry } from '../index';


const patchPublicUserEquipment = async (email: string, requestid: string, selectedEquipmentType: string) => {
  const url = `${config.apiUrlV2}/users/equipment`;

  return fetchRetry(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, requestid, selectedEquipmentType }),
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data;
  });
};

export default patchPublicUserEquipment;
