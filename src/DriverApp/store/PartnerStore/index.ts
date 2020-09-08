import { action, computed, observable } from 'mobx';
import ReactGA from 'react-ga';
import { History } from 'history';
import firebase, { Unsubscribe } from 'firebase/app';
import 'firebase/auth';
import queryStringParser from 'query-string';
import StoreBase from '../StoreBase';
import { DriverAppStore } from '../DriverAppStore';
import bigroadTheme from '../../../theme/bigroad';
import geotabTheme from '../../../theme/geotab';
import ApiLayer from '../../../services/APIServices/ApiLayer';
import history from '../../../utils/history';
import config from '../../../../config';
import { parseQueryParamsToSingleOutput } from '../../../utils/utility';
import PostGeotabAuthtoken from '../../../services/APIServices/Auth/PostGeotabAuthtoken';
import PostCreateServiceAccount from '../../../services/APIServices/Geotab/PostGeotabCreateServiceAccount';


export default class PartnerStore extends StoreBase {
  rootStore: DriverAppStore;
  authListener: Unsubscribe | null = null;
  @observable geotabServer = window.location.hostname;
  @observable geotabUser = null;
  @observable geotabSession = null;

  constructor(rootStore: DriverAppStore) {
    super();
    this.rootStore = rootStore;
  }

  @computed get theme() {
    if (this.rootStore.configStore.isBigroad) {
      return bigroadTheme;
    }
    if (this.rootStore.configStore.isGeotab) {
      return geotabTheme;
    }
    return bigroadTheme;
  }

  @computed get isGeotabAdmin() {
    return this.geotabUser?.securityGroups?.length > 0 && this.geotabUser?.securityGroups[0]?.id === 'GroupEverythingSecurityId';
  }

  storeGeotabUser = (geotabUser) => {

    this.geotabUser = geotabUser;
  };

  storeGeotabSession = (geotabSession) => {
    this.geotabSession = geotabSession;
  };

  @action.bound
  createServiceAccount = async () => {
    if (this.isGeotabAdmin && this.geotabSession) {
      try {
        const response = await PostCreateServiceAccount(
          this.geotabServer, this.geotabSession.database, this.geotabSession.userName, this.geotabSession.sessionId,
        );
        this.rootStore.userStore.setFleet(response);
      } catch (e) {
        this.rootStore.snackbarStore.enqueueSnackbarStore('Error creating service account', { variant: 'error' });
        throw e;
      }
    }
  };

  authErrorHandler = (history: History) => {
    const { configStore: { isGeotab } } = this.rootStore;
    if (isGeotab) {
      this.checkGeotabLogin(history);
    } else {
      this.redirectToBigRoadSSOUrl();
    }
  };

  // Authentication Stage 1: Check the bigroad token
  checkBigRoadLogin = (history: History) => {
    const { location } = window;
    const parsedQueryParams = queryStringParser.parse(location.search);

    /**
     * SSO Login with BigRoad
     * If there is an auth token present in the url then we need to reauthenticate with
     * our backend to ensure that the token is valid. This is regardless of whether the user is
     * currently logged in or not.
     * When the user is redirected from bigroad's SSO login it will always have a '?authToken=..'.
     */
    const email = parseQueryParamsToSingleOutput(parsedQueryParams.email);
    const authToken = parseQueryParamsToSingleOutput(parsedQueryParams.authToken);

    if (authToken && email) {
      ApiLayer.checkBigRoadToken(email, authToken)
      .then((data) => this.handleBigRoadToken(data, email, authToken, history))
      .catch(this.redirectToBigRoadSSOUrl);
    } else {
      this.setupFirebaseAuthListenerBigroad(history);
    }
  };

  // Authentication Stage 2: Process the checked bigroad token
  handleBigRoadToken = (data, email: string, authToken: string, history: History) => {
    const { userStore: { preserveAuthQueryParams } } = this.rootStore;

    preserveAuthQueryParams(email, authToken);

    if (data && data.custom_token) {
      // We use firebase's custom token sign in as it takes care of maintaining the user's login
      // state using browser cookies. It also enables access to the currentUser object to
      // any component in the app.
      firebase.auth()
      .signInWithCustomToken(data.custom_token)
      .then(() => this.setupFirebaseAuthListenerBigroad(history))
      .catch(this.redirectToBigRoadSSOUrl);
    } else {
      this.redirectToBigRoadSSOUrl();
    }
  };

  // Authentication Stage 3: Setup the listener
  // Should be set up after auth sign in is called
  setupFirebaseAuthListenerBigroad = (history: History) => {
    if (!this.authListener) {
      this.authListener = firebase.auth()
      .onAuthStateChanged((user) => {
        this.removeBigroadQueryParams();
        if (user) {
          ApiLayer.me()
          .then(async (foUser) => {
            if (foUser && foUser.user) {
              await this.setupUser(foUser);
            } else {
              this.authErrorHandler(history);
            }
          })
          .catch(() => this.authErrorHandler(history));
        } else {
          this.authErrorHandler(history);
        }
        // This is to handle any errors in Firebase Logins.
      }, () => this.authErrorHandler(history));
    }
  };

  // Authentication Stage 4: Clean url pathname
  removeBigroadQueryParams = () => {
    const { location: { search, pathname } } = window;
    const parsedQueryParams = queryStringParser.parse(search);
    let cleanedSearch = search;

    const authToken = parseQueryParamsToSingleOutput(parsedQueryParams.authToken);
    const email = parseQueryParamsToSingleOutput(parsedQueryParams.email);

    if (authToken) {
      cleanedSearch = search.replace(`&authToken=${authToken}`, '');
    }
    if (email) {
      cleanedSearch = search.replace(`&email=${email}`, '');
    }
    history.push(`${pathname}/${cleanedSearch}`);
  };

  // Authentication Stage 5: Setup the user.
  setupUser = async (foUser) => {
    const { userStore } = this.rootStore;

    userStore.setFOUser(foUser.user);
    if (userStore.dispatcher) {
      try {
        await userStore.getDispatcherDrivers();
      } catch (error) {
        this.redirectToBigRoadSSOUrl();
      }
    }
    await userStore.downloadCurrentCoordinatesAsync();
    userStore.setLogin(true);
    ReactGA.set({ userId: foUser.user.firebaseUID });
  };

  redirectToBigRoadSSOUrl = () => {
    const { location: { search, origin, pathname } } = window;
    // Set the redirect to the current url without all the query params.
    let ssoQueryParams = `?redirect=${origin}${pathname}${search}`;
    // If the current url has src=br and email='' then append email as
    // a query param. This happens for when users are redirected (after clicking a button)
    // from big road's mobile application to this application.
    const parsedQueryParams = queryStringParser.parse(search);

    const email = parseQueryParamsToSingleOutput(parsedQueryParams.email);
    const src = parseQueryParamsToSingleOutput(parsedQueryParams.src);

    if (email && src === 'br') {
      ssoQueryParams = `${ssoQueryParams}&email=${email}`;
    }
    window.location.href = `${config.bigRoadSSOUrl}${ssoQueryParams}`;
  };

  checkGeotabLogin = async () => {
    const { userStore: { setLogin, loggedIn }, snackbarStore: { enqueueSnackbarStore } } = this.rootStore;
    if (!loggedIn) {
      const { geotab } = window;
      // May need this in the future if we use geotab addin api. But if we don't need it for authorization, then this should be removed
      if (geotab) {
        geotab.addin.fleetops = this.geotabAddinfunction;
      } else {
        const geotabAuthResponse = await PostGeotabAuthtoken(
          'mypreview2.geotab.com', 'Fleetops', 'marjan@fleetrover.com', 'ydBNURenFKlpxrHk4VzOFQ',
        );
        await this.handleGeotabToken(geotabAuthResponse.custom_token, { name: 'marjan@fleetrover.com' });
      }
    }
  };

  handleGeotabToken = async (customToken: string, geotabUser) => {
    const { userStore: { preserveAuthQueryParams } } = this.rootStore;

    preserveAuthQueryParams(geotabUser.name, customToken);

    // We use firebase's custom token sign in as it takes care of maintaining the user's login
    // state using browser cookies. It also enables access to the currentUser object to
    // any component in the app.
    try {
      await firebase.auth().signInWithCustomToken(customToken);
      this.setupFirebaseAuthListenerGeotab(geotabUser);
    } catch {
      this.redirectToBigRoadSSOUrl();
    }
  };

  setupFirebaseAuthListenerGeotab = (geotabUser) => {
    if (!this.authListener) {
      this.authListener = firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          ApiLayer.me()
          .then(async (foUser) => {
            if (foUser && foUser.user) {
              this.storeGeotabUser(geotabUser);
              await this.setupUser(foUser);
            } else {
              this.authErrorHandler(history);
            }
          })
          .catch(() => console.log('me error'));
        } else {
          console.log('auth state change error');
        }
        // This is to handle any errors in Firebase Logins.
      }, () => console.log('firebase error'));
    }
  };

  geotabAddinfunction = () => {
    let api;
    let state;
    const { handleGeotabToken, storeGeotabSession, geotabServer, rootStore: { userStore: { setFleet } } } = this;

    function getUserConfiguration() {
      // The api object exposes a method we can call to get the current user identity. This is useful for
      // determining user context, such as regional settings, language preference and name. Use the api
      // to retrieve the currently logged on user object.
      api.getSession((session) => {
        const currentUser = session.userName;

        api.call('Get', {
          typeName: 'User',
          search: {
            name: currentUser,
          },
        }, async (result) => {
          if (result.length === 0) {
            throw new Error('Unable to find currently logged on user.');
          }

          const user = result[0];

          try {
            const geotabAuthResponse = await PostGeotabAuthtoken(
              geotabServer, session.database, session.userName, session.sessionId,
            );
            await handleGeotabToken(geotabAuthResponse.custom_token, user);
            storeGeotabSession(session);
            setFleet(geotabAuthResponse.fleet);
          } catch (e) {
            console.log(e);
          }
        }, (error) => {
          throw new Error(`Error while trying to load currently logged on user. ${error}`);
        });
      });
    }

    return {
      /**
       * initialize() is called only once when the Add-In is first loaded. Use this function to initialize the
       * Add-In's state such as default values or make API requests (MyGeotab or external) to ensure interface
       * is ready for the user.
       * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
       * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
       * @param {function} initializeCallback - Call this when your initialize route is complete. Since your initialize routine
       *        might be doing asynchronous operations, you must call this method when the Add-In is ready
       *        for display to the user.
       */
      initialize(freshApi, freshState, initializeCallback) {
        api = freshApi;
        state = freshState;

        initializeCallback();
      },

      /**
       * focus() is called whenever the Add-In receives focus.
       *
       * The first time the user clicks on the Add-In menu, initialize() will be called and when completed, focus().
       * focus() will be called again when the Add-In is revisited. Note that focus() will also be called whenever
       * the global state of the MyGeotab application changes, for example, if the user changes the global group
       * filter in the UI.
       *
       * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
       * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
       */
      focus(freshApi, freshState) {
        console.log('focus');
        api = freshApi;
        state = freshState;
        getUserConfiguration();
      },

      /**
       * blur() is called whenever the user navigates away from the Add-In.
       *
       * Use this function to save the page state or commit changes to a data store or release memory.
       *
       * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
       * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
       */
      blur() {
      },
    };
  };
}
