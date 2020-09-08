import React, { ReactNode, Suspense } from 'react';
import clsx from 'clsx';
import { configure } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import { LocalizationProvider } from '@material-ui/pickers';
import { Box } from '@material-ui/core';
import { MuiThemeProvider, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import Raven from 'raven-js';
import { Helmet } from 'react-helmet';
import queryStringParser from 'query-string';
import SearchLoadsPage from 'DriverApp/pages/SearchLoadsPage';
import SearchLoadsPageV3 from 'pages/SearchLoadsPageV3';
import PostTruckPage from 'DriverApp/pages/PostTruckPage';
import DriverSettingsPage from 'DriverApp/pages/DriverSettingsPage';
import DriverMatchDetailsPage from 'DriverApp/pages/DriverMatchDetailsPage';
import UserPublicCommunicationPreferencesPage from 'DriverApp/pages/UserPublicCommunicationPreferencesPage';
import UserPublicEquipmentPage from 'DriverApp/pages/UserPublicEquipmentPage';
import ErrorBoundary from 'components/v3/ErrorBoundary';
import DriverPage from 'DriverApp/pages/DriverPage';
import NotificationsPage from 'DriverApp/pages/NotificationsPage';
import SplashScreen from 'components/SplashScreen';
import TermsAndConditionsDialog from 'components/TermsAndConditionsContainer/TermsAndConditionsDialog';
import DriverViewMatchesPage from 'DriverApp/pages/DriverViewMatchesPage';
import { trackPageView } from 'utils/utility';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import FOSnackbarProvider from 'components/FOSnackbarProvider';
import FOSnackbar from 'components/FOSnackbar';
import FOSplash from 'components/FOSplash';
import { mixpanelInit } from 'services/FOMixpanel';
import DriversOverviewPage from 'DriverApp/pages/DriversOverviewPage';
import DispatchableDriversDetailsPage from 'DriverApp/pages/DispatchableDriversDetailsPage';
import AdditionalInfoPage from 'Auth/AdditionalInfoPage';
import FOGeotabSplash from 'components/FOGeotabSplash';
import FTAccountAccess from 'DriverApp/pages/FTAccountAccess';
import FTOnboarding from 'DriverApp/pages/FTOnboarding';
import TrackingSessionsPage from 'DriverApp/pages/TrackingSessionsPage';
import TrackingSessionOnboarding from 'DriverApp/components/TrackingSessionOnboarding';
import Favicon from 'assets/images/favicon/favicon_brf.ico';

import MyLoadsV3 from 'pages/MyLoadsV3';
import ActiveLoadsV3 from 'pages/ActiveLoadsV3';
import LoadsByLaneV3 from 'pages/LoadsByLaneV3';
import DriverMatchDetailsPageV3 from 'pages/DriverMatchDetailsPageV3';
import RequestLoadV3 from 'pages/RequestLoadV3';
import MoreSettings from 'pages/MoreSettings';
import TermsOfServicePage from 'pages/TermsOfServicePage';
import TrackingSessionsPageV3 from 'pages/TrackingSessionsPageV3';
import config from '../config';
import RequestDetailsLoadV3 from 'pages/RequestDetailsLoadV3';

const styles = (theme: Theme) => ({
  appContainer: {
    height: '100%',
  },
  geotabAppContainer: {
    overflow: 'hidden',
    '& .driver-page-content': {
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 140px)',
    },
  },
});

// Disable lazy loading due to geotab
// const AdditionalInfoPage = lazy(() =>
//   // tslint:disable-next-line:space-in-parens
//   import(/* webpackChunkName: 'AdditionalInfoPages' */ /* webpackPrefetch: true */ './Auth/AdditionalInfoPage'));

configure({
  enforceActions: 'observed',
}); // Using MobX strictly. This will allow state changes only through actions.

interface IAppState {
}

type IAppProps = RouteComponentProps & IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(config.firebaseConfig);
    }

    // Initialize google analytics
    ReactGA.initialize(config.googleAnalytics.key, {
      // debug: true, // Uncomment to see all calls to Google Analytics.
      // Needs https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna.
    });

    // Initialize mixpanel
    mixpanelInit();

    // Initialize sentry
    Raven.config(config.sentry.key, config.sentry.options).install();
  }

  componentDidMount() {
    const { history, location } = this.props;
    if (location.search && location.search.includes('utm')) {
      trackPageView(location.pathname, location.search);
    } else {
      trackPageView(location.pathname);
    }
    this.locationUnlisten = history.listen(({ location: { pathname } }) => {
      trackPageView(pathname);
    });
  }

  componentWillUnmount() {
    this.locationUnlisten();
  }

  locationUnlisten = () => {
  };

  redirectToMainPage = () => {
    const { driverAppStore, location: { search } } = this.props;
    const {
      userStore: {
        dispatcher, dispatchableDriver,
        dispatcherCompletedOnboarding, dispatchableDriverCompletedOnboarding, hasServiceAccount,
      },
      configStore: { isGeotab },
      partnerStore: { isGeotabAdmin },
    } = driverAppStore as DriverAppStore;

    const searchQuery = search ? `?${queryStringParser.extract(search)}` : '';

    if(isGeotab) {
      if(isGeotabAdmin && !hasServiceAccount && !dispatcherCompletedOnboarding) {
        return <Redirect to={{ pathname: '/ftAccountAccess/createServiceAccount' }} />
      }
      if (isGeotabAdmin && !dispatcherCompletedOnboarding) {
        return <Redirect to={{ pathname: '/ftOnboarding/companyInfo' }} />;
      }
      if (!isGeotabAdmin && !hasServiceAccount && !dispatcherCompletedOnboarding) {
        return <Redirect to={{ pathname: '/ftAccountAccess/createAccount' }} />;
      }
      if (!isGeotabAdmin && !dispatcherCompletedOnboarding) {
        return <Redirect to={{ pathname: '/ftOnboarding/companyInfo' }} />;
      }
    }

    if (dispatcher && !dispatcherCompletedOnboarding) {
      return <Redirect to={{ pathname: '/driver/register/check', search: searchQuery }} />;
    }
    if (dispatchableDriver && !dispatchableDriverCompletedOnboarding) {
      return <Redirect to={{ pathname: '/driver/register/check', search: searchQuery }} />;
    }
    return <Redirect to={{ pathname: '/driver/view/loads', search: searchQuery }} />;
  };

  getPublicRoute = (renderComponent: ReactNode) => (props: RouteComponentProps) => (
    renderComponent
  );

  getProtectedRoute = (renderIfLoggedIn: ReactNode, loggedIn: boolean) => (props: RouteComponentProps) => {
    if (loggedIn) {
      return renderIfLoggedIn;
    }
    const { driverAppStore, history } = this.props;
    const { configStore: { isGeotab }, partnerStore: { checkBigRoadLogin, checkGeotabLogin } } = driverAppStore as DriverAppStore;

    // initiate authentication process asynchronously
    if (isGeotab) {
      checkGeotabLogin();
      return <FOGeotabSplash />;
    }
    checkBigRoadLogin(history);
    return <SplashScreen />;
  };

  render() {
    // return correct component based on login status
    const { driverAppStore, classes } = this.props;
    const { userStore: { loggedIn }, partnerStore: { theme }, configStore: { isGeotab } } = driverAppStore as DriverAppStore;

    return (
      <ErrorBoundary>
        <Helmet
          title='BigRoad Freight'
          link={[{ rel: 'icon', type: 'image/png', href: `${Favicon}` }]}
        />
        <MuiThemeProvider theme={theme}>
          <Box className={clsx(classes.appContainer, { [classes.geotabAppContainer]: isGeotab })}>
            <FOSnackbarProvider isGeotab={isGeotab}>
              <LocalizationProvider dateAdapter={MomentUtils} dateLibInstance={moment}>
                <FOSnackbar />
                <TermsAndConditionsDialog />
                <Switch>
                  {/* <Route exact path='/auth' render={() => this.getRenderIfNotLoggedIn(<AuthHome />)} />
                                  <Route exact path={` /${ROUTES.LOGIN}`} render={() => this.getRenderIfNotLoggedIn(<Login />)} />
                                  <Route exact path='/password/forgot' render={() => <ForgotPassword />} />
                    <Route exact path='/register/:userType' render={props => <Register userType={props.match.params.userType} />} /> */}
                  <Route
                    exact
                    path='/driver/register/:type'
                    render={this.getProtectedRoute(
                      <Suspense fallback={<></>}>
                        <AdditionalInfoPage />
                      </Suspense>, loggedIn,
                    )}
                  />
                  <Redirect exact from='/driver/search' to='/driver/search/results' />
                  <Route
                    path='/driver/search/:type'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <SearchLoadsPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Redirect exact from='/driver/view' to='/driver/view/loads' />
                  <Route
                    path='/driver/view/:type/lane/:laneIndex'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DriverViewMatchesPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/view/:type'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DriverViewMatchesPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/requestLoad'
                    exact
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <PostTruckPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/requestLoad/:personId'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <PostTruckPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/drivers'
                    exact
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DriversOverviewPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/drivers/:personId'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DispatchableDriversDetailsPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/notifications'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <NotificationsPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  {/* <Route */}
                  {/*  path='/driver/chatbot' */}
                  {/*  render={this.getProtectedRoute( */}
                  {/*    <DriverPage> */}
                  {/*      <FOChatbot /> */}
                  {/*    </DriverPage>)} */}
                  {/* /> */}
                  <Route
                    path='/driver/settings'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DriverSettingsPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/match/:matchId/detail'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DriverMatchDetailsPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/load/:loadId/detail'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DriverMatchDetailsPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/trackingSessions'
                    exact
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <TrackingSessionsPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/trackingSessions/:sessionType/:personId'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <TrackingSessionsPage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    exact
                    path='/public/preferences'
                    render={this.getPublicRoute(
                      <UserPublicCommunicationPreferencesPage />,
                    )}
                  />
                  <Route
                    exact
                    path='/public/equipment'
                    render={this.getPublicRoute(
                      <UserPublicEquipmentPage />,
                    )}
                  />
                  <Route
                    exact
                    path='/ftAccountAccess/:type'
                    render={this.getProtectedRoute(
                      <FTAccountAccess />, loggedIn,
                    )}
                  />
                  <Route
                    exact
                    path='/ftOnboarding/:step'
                    render={this.getProtectedRoute(
                      <FTOnboarding />, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/searchV3/:type'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <SearchLoadsPageV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/viewV3'
                    exact
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <MyLoadsV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/viewV3/activeLoads'
                    exact
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <ActiveLoadsV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/viewV3/loadsByLane/:laneIndex/:pickupCity/:dropoffCity'
                    exact
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <LoadsByLaneV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/loadV3/:loadId/detail'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DriverMatchDetailsPageV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/matchV3/:matchId/detail'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <DriverMatchDetailsPageV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/requestLoadV3'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <RequestLoadV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/requestLoadDetailsV3/:ralId'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <RequestDetailsLoadV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/more'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <MoreSettings />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/terms-of-service'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <TermsOfServicePage />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route
                    path='/driver/trackingSessionsV3'
                    render={this.getProtectedRoute(
                      <DriverPage>
                        <TrackingSessionsPageV3 />
                      </DriverPage>, loggedIn,
                    )}
                  />
                  <Route exact path='/redirect' render={this.redirectToMainPage} />
                  <Route render={this.redirectToMainPage} />
                </Switch>
                {loggedIn && (<TrackingSessionOnboarding />)}
                {loggedIn && (<TermsAndConditionsDialog />)}
              </LocalizationProvider>
            </FOSnackbarProvider>
          </Box>
        </MuiThemeProvider>
      </ErrorBoundary>
    );
  }
}

export default withRouter(withStyles(styles)(App));
