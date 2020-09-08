import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../../../config';
import { getTokenHeader } from '../GetTokenHeader';
import { fetchRetry } from '../index';
import { IIPostFOChatResponse } from '../../../models/apiResponse/postFOChatResponse';
import { ICoordinate } from '../../../models/interfaces/shared/ICoordinate';


interface IPostFOChat {
  event?: string;
  text?: string;
  audio?: string;
  currentCoordinates?: ICoordinate;
}

export const postFOChat = async ({ text, event, currentCoordinates }: IPostFOChat) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }

  if (!text && !event) {
    throw new Error('Either text or event has to be provided in parameters');
  }

  const tokenHeader = await getTokenHeader();

  const uri = `${config.apiUrlV2}/chat/`;

  const body = text ? {
    text,
  } : event ? {
    event,
  } : null;

  if (body && currentCoordinates && currentCoordinates.lng && currentCoordinates.lat) {
    body['currentCoordinates'] = currentCoordinates;
  }

  return fetchRetry(uri, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { ...tokenHeader, 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const responseJson = await response.json() as IIPostFOChatResponse;
    return responseJson.data;
    //   return ({
    //     load_ids: [
    //       '5e011d50a4753c0001ccf264',
    //       '5e011d50a4753c0001ccf264',
    //     ],
    //     initiate_phone_call: '+16479659801',
    //     text: 'Here is your recommendation for today Load is picking up in 675 E CENTRAL AVE, San Bernardino, CA and dropping off in 2650 HIGHWAY 395 SOUTH, Hermiston, OR, it pays 2895.31.',
    //   });
  });
};
