import axios from 'axios';
import { getTokenHeader } from '../GetTokenHeader';
import config from '../../../../config';
import { ApiFail } from '../../../utils/ErrorService';


export const GetSavedSearches = async (pageNumber = 1) => {
  const tokenHeader = await getTokenHeader();
  return axios.get(`${config.apiUrlV2}/search/history?page=${pageNumber}`,
    { headers: tokenHeader })
    .then((response) => {
      if (response.data) {
        return {
          data: response.data.data
            ? response.data.data.map((data) => ({
              ...data,
              pickup: { location: data.pickupLocation && data.pickupLocation.address },
              dropOff: { location: data.dropoffLocation && data.dropoffLocation.address },
            }))
            : [],
          pagination: response.data.pagination,
        };
      }
      return {};
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
};
