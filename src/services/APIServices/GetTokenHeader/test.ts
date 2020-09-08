import firebase from 'firebase/app';
import 'firebase/auth';
import { getTokenHeader } from './index';
import config from '../../../../config';


describe('Get Token Header', () => {
  // let firebaseApp: firebase.app.App;
  // beforeAll(async () => {
  //   if (!firebase.apps.length) {
  //     firebaseApp = await firebase.initializeApp(config.firebaseConfig);
  //   }
  // });
  test('Raises error for user not logged in', async () => {
    const spy = jest.spyOn(firebase, 'auth');
    spy.mockReturnValue({
      currentUser: null,
    });
    try {
      await getTokenHeader();
    } catch (error) {
      expect(error.message).toBe('User not logged in.');
    }
  });
  test('Raises error if cannot generate Id token for user', async () => {
    const spy = jest.spyOn(firebase, 'auth');
    spy.mockReturnValue({
      currentUser: {
        getIdToken: () => {
          throw new Error();
        },
      },
    });
    try {
      await getTokenHeader();
    } catch (error) {
      expect(error.message).toBe('Error generating user token.');
    }
  });
  test('Returns string authToken for logged in User with Id token', async () => {
    const token = 'test_token';
    const spy = jest.spyOn(firebase, 'auth');
    spy.mockReturnValue({
      currentUser: {
        getIdToken: () => (token),
      },
    });
    const tokenHeader = await getTokenHeader();
    expect(tokenHeader.Authorization).toBe(token);
  });
  // afterAll(async () => {
  //   await firebaseApp.delete();
  // });
});
