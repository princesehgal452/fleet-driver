import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../../../config';
import { PostCurrentCoordinates } from './index';


describe('Post Current Coordinates', () => {
  // let firebaseApp: firebase.app.App;
  // beforeAll(async () => {
  //   if (!firebase.apps.length) {
  //     firebaseApp = await firebase.initializeApp(config.firebaseConfig);
  //   }
  // });
  test('Returns success', async () => {
    const location = {
      lat: 23.213,
      lon: 331.3123213,
      accuracy: 800,
    };
    const mockResponse = {
      data: {
        _id: '5bfdab2e4b8cc6000c9483e3',
        asOf: '11/27/2018',
        bearing: '',
        hosStatus: 'NEGOTIATE_ACCEPT',
        personId: '758',
        position: {
          lon: `${location.lon}`,
          lat: `${location.lat}`,
          accuracy: `${location.accuracy}`,
        },
        speed: '0',
        source: 'web-ip',
      },
    };
    const token = 'test_token';
    const spyTokenHeader = jest.spyOn(firebase, 'auth');
    spyTokenHeader.mockReturnValue({
      currentUser: {
        getIdToken: () => (token),
      },
    });
    const spyAxiosPost = jest.spyOn(axios, 'post');
    spyAxiosPost.mockResolvedValue({ data: mockResponse });
    const apiResponse = await PostCurrentCoordinates(location.lat, location.lon, location.accuracy);
    await expect(apiResponse).toEqual(mockResponse);
  });
  // afterAll(async () => {
  //   await firebaseApp.delete();
  // });
});

