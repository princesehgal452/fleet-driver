import firebase from 'firebase/app';
import 'firebase/auth';

export const getTokenHeader = async () => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('User not logged in.');
  }
  try {
    const idToken = await currentUser.getIdToken();
    return ({ Authorization: idToken });
  } catch (error) {
    throw new Error('Error generating user token.');
  }
};
