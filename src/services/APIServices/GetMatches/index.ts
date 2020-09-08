import firebase from 'firebase/app';
import 'firebase/auth';
import { getTokenHeader } from '../GetTokenHeader';
import axios from 'axios';
import config from '../../../../config';
import Match from '../../../models/dataStructures/Match';
import { Pagination } from '../../../models/interfaces/shared/IPagination';
import { ApiFail } from '../../../utils/ErrorService';


export const GetMatches = async (pageNumber, status, args) => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No Current user in firebase auth');
  }


  let url = `${config.apiUrlV2}/matches/?firebaseuid=${currentUser.uid}&page=${pageNumber}`;
  if (status) {
    url = `${url}&status=${status}`;
  }
  if (args?.lane) {
    url = `${url}&lane=${args?.lane}`;
  }
  if (args?.personId) {
    url = `${url}&personId=${args?.personId}`;
  }

  const tokenHeader = await getTokenHeader();
  return axios.get(url,
    { headers: tokenHeader },
  ).then((response) => {
    if (response.data.data.length > 0) {
      return {
        data: response.data.data.reduce((acc, match) => {
          try {
            acc.push(new Match(match));
          } catch (e) {
            console.log(`Error parsing matchList match: ${e}`);
          }
          return acc;
        }, []),
        lanes: response.data.lanes || [],
        pagination: response.data.pagination,
      };
    }
    return {
      data: [],
      lanes: response.data.lanes || [],
      pagination: new Pagination(),
    };
  }).catch((error) => {
    ApiFail(error);
    throw new Error(error);
  });
};
