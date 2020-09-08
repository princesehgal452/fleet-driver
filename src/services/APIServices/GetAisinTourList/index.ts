import { fetchRetry } from '../index';
import { IAisinTourListInfo } from '../../../models/interfaces/shared/IAisinRouteGuidanceInfo';
import config from '../../../../config';


interface IGetAisinTourListResponse {
  tourList: IAisinTourListInfo[];
}

export const getAisinTourList = async (routeId: number) => {
  const url = `${config.aisinAPI}/tour_guide/${routeId}`;
  return fetchRetry(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (response) => {
    try {
      const responseJson = await response.json() as IGetAisinTourListResponse;
      return responseJson.tourList;
    } catch (e) {
      console.log(e);
      const responseJson = await response.json() as IGetAisinTourListResponse;
      return responseJson.tourList;
    }
  });
};
