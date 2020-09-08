import { getTokenHeader } from '../GetTokenHeader';
import axios from 'axios';
import config from '../../../../config';
import Truck from '../../../models/dataStructures/Trucks';
import { ApiFail } from '../../../utils/ErrorService';
import { Pagination } from '../../../models/interfaces/shared/IPagination';


export const GetPostedTrucks = async (pageNumber, args) => {
  const tokenHeader = await getTokenHeader();
  let url = `${config.apiUrlV2}/postmytruck/?page=${pageNumber}`;
  if (args?.personId) {
    url = `${url}&personId=${args?.personId}`;
  }
  return axios({
    method: 'GET',
    url,
    headers: tokenHeader,
    maxRedirects: 0,
  }).then((response) => {
    if (response.data && response.data.data) {
      return {
        data: response.data.data.reduce((acc, truckData) => {
          try {
            acc.push(new Truck(truckData));
          } catch (error) {
            console.log(`Search Error parsing truckData list: ${error}`);
          }
          return acc;
        }, []),
        pagination: response.data.pagination,
      };
    }
    return {
      data: [],
      pagination: new Pagination(),
    };
  }).catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
