import { fetchRetry } from '../index';
import { IAisinRouteGuidanceDirectionsResponse } from '../../../models/interfaces/shared/IAisinRouteGuidanceDirectionsResponse';
import config from '../../../../config';


export const getAisinRouteGuidanceDirections = async (routeId: number) => {
  const url = `${config.aisinAPI}/direction_guide/${routeId}`;
  return fetchRetry(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (response) => {
    const aisinRouteGuidance = await response.json() as IAisinRouteGuidanceDirectionsResponse;
    return aisinRouteGuidance.directionList;
  });
};
