import config from '../../../../../config';
import { fetchRetry } from '../../index';
import { IFOUser } from '../../../../models/interfaces/shared/IFOUser';
import { IFleet } from '../../../../models/interfaces/shared/IFleet';


interface IPostGeotabAuthtokenResponse {
  custom_token: string;
  user: IFOUser;
  fleet: IFleet;
}

const PostGeotabAuthtoken = async (server: string, database: string, username: string, sessionId: string) => {
  const uri = `${config.apiUrlV2}/auth/geotab`;

  return fetchRetry(uri, {
    method: 'POST',
    body: JSON.stringify({ server, database, username, session_id: sessionId }),
    headers: { 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json();
    return responseJson.data as IPostGeotabAuthtokenResponse;
  });
};

export default PostGeotabAuthtoken;
