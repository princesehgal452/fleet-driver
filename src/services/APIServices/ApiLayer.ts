import axios from 'axios';
import 'firebase/auth';
import { ApiFail } from '../../utils/ErrorService';
import config from '../../../config';
import { FO_USER_TYPES } from '../constants';
import { getTokenHeader } from './GetTokenHeader';
import Load from '../../models/dataStructures/Load';
import Match from '../../models/dataStructures/Match';


class ApiLayer {
  /* V2 endpoints */

  // Matches
  /**
   * Get a match.
   * @param {string} matchId
   */
  static async getMatch(matchId) {
    if (!matchId) {
      return Promise.reject(new Error('Invalid matchId provided.'));
    }
    const tokenHeader = await getTokenHeader();
    return axios.get(`${config.apiUrlV2}/matches/${matchId}`, { headers: tokenHeader }).then((response) => {
      if (response.data.data) {
        try {
          return new Match(response.data.data);
        } catch (error) {
          throw new Error(`Error casting to Match: ${error}`);
        }
      }
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  // Loads
  /**
   * Return single load
   * @param {string} brokerId
   * @param {string} status
   */
  static async getLoad(loadId) {
    if (!loadId) {
      return Promise.reject(new Error('Invalid loadId provided.'));
    }
    const tokenHeader = await getTokenHeader();
    return axios.get(`${config.apiUrlV2}/loads/${loadId}`, { headers: tokenHeader }).then((response) => {
      if (response.data && response.data.data) {
        return new Load(response.data.data);
      }
    }).catch((error) => {
      console.log(error);
      ApiFail(error);
      throw new Error(error);
    });
  }

  // User
  /**
   * Creates a new user.
   * @param {string} email
   * @param {string} password
   * @param {string} userType One of FO_USER_TYPES
   * @param {boolean} agreeToTermsAndConditions
   */
  static createNewUser(email, password, userType, agreedToTermsAndConditions) {
    if (!email) {
      return Promise.reject(new Error('Invalid email provided.'));
    }
    if (!password) {
      return Promise.reject(new Error('Invalid password provided.'));
    }
    if (!userType || (userType !== FO_USER_TYPES.broker && userType !== FO_USER_TYPES.driver)) {
      return Promise.reject(
        new Error(`Invalid user type provided. Should be one of ${FO_USER_TYPES.broker}, ${FO_USER_TYPES.driver}`),
      );
    }
    const data = {
      email,
      password,
      userType,
      agreedToTermsAndConditions,
    };
    return axios({
      data,
      method: 'POST',
      url: `${config.apiUrlV2}/users/`,
    }).then((response) => {
      if (response.data.data) {
        return { user: response.data.data };
      }
      return {};
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  /**
   * Gets info of the currently logged in user.
   */
  static async me() {
    const tokenHeader = await getTokenHeader();
    return axios.get(`${config.apiUrlV2}/users/me`, { headers: tokenHeader }).then((response) => {
      if (response.data && response.data.data) {
        return { user: response.data.data };
      }
      return {};
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  /**
   * Submits onboarding data for a new user.
   * @param {object} data
   */
  static async onboardUser(data) {
    if (!data) {
      return Promise.reject(new Error('Invalid data provided.'));
    }
    const tokenHeader = await getTokenHeader();

    return axios({
      data,
      method: 'PATCH',
      url: `${config.apiUrlV2}/users/me/onboarding`,
      headers: tokenHeader,
    }).then((response) => {
      if (response.data && response.data.data) {
        return { user: response.data.data };
      }
      return {};
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  // Auth
  /**
   * Checks if big roads SSO token is valid or not.
   * @param {string} email
   * @param {string} token BigRoad SSO token
   */
  static checkBigRoadToken(email: string, token: string) {
    return axios({
      method: 'POST',
      url: `${config.apiUrlV2}/auth/bigroad`,
      data: {
        email,
        token,
      },
    }).then((response) => response.data.data)
    .catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  /**
   * Update users settings.
   * @param {object} settings
   */
  static async updateSettings(settings) {
    if (!settings) {
      return Promise.reject(new Error('Invalid settings provided.'));
    }
    const tokenHeader = await getTokenHeader();
    return axios({
      method: 'POST',
      url: `${config.apiUrlV2}/users/me/settings`,
      headers: tokenHeader,
      data: settings,
    }).then((response) => {
      if (response.data && response.data.data) {
        return { user: response.data.data };
      }
      return {};
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  // Truck
  // Post
  static async postMyTruck(data) {
    if (!data) {
      return Promise.reject(new Error('Invalid data provided'));
    }
    const tokenHeader = await getTokenHeader();
    return axios({
      method: 'POST',
      url: `${config.apiUrlV2}/postmytruck/`,
      headers: tokenHeader,
      data,
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  // Truck
  // DELETE
  static async deletePostedTruck(postedTruckId, personId?: string) {
    const tokenHeader = await getTokenHeader();
    const url = `${config.apiUrlV2}/postmytruck/${postedTruckId}`;

    return axios({
      method: 'DELETE',
      url,
      headers: tokenHeader,
      data: personId ? ({ personId }) : undefined,
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  // / //////////////////////////////////////////////////////////////////// 3rd Party
  // --------------------------------------------------------------------------
  static getDistance(originLat, originLon, destinationLat, destinationLong): Promise<google.maps.DistanceMatrixResponse> {
    const origin = new google.maps.LatLng(originLat, originLon);
    const destination = new google.maps.LatLng(destinationLat, destinationLong);
    const service = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      }, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          resolve(response);
        } else {
          reject(status);
        }
      });
    });
  }

  static getCurrentCoordinates() {
    return axios({
      method: 'POST',
      url: `${config.geolocationAPI}`,
    }).then((response) => response.data)
    .catch((error) => {
      ApiFail(error);
      console.log('Error getting current coordinates.');
      throw new Error(error);
    });
  }

  // RAL matches
  /**
   * Get RAL matches.
   * @param {string} ralId
   */
  static async getRALMatches(ralId) {
    if (!ralId) {
      return Promise.reject(new Error('Invalid RAL ID provided.'));
    }
    const tokenHeader = await getTokenHeader();
    return axios.get(`${config.apiUrlV2}/matches/ral/${ralId}`, { headers: tokenHeader }).then((response) => {
      if (response.data.data) {
        try {
          return response.data.data;
        } catch (error) {
          throw new Error(`Error : ${error}`);
        }
      }
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }

  static async sendTrackingLink(data) {
    const tokenHeader = await getTokenHeader();
    return axios.post(`${config.apiUrlV2}/users/me/trackingLink/send`, data, { headers: tokenHeader }).then((response) => {
      if (response.data.data) {
        try {
          return response.data.data;
        } catch (error) {
          throw new Error(`Error : ${error}`);
        }
      }
    }).catch((error) => {
      ApiFail(error);
      throw new Error(error);
    });
  }
}

export default ApiLayer;
