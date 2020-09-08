import React, { Suspense } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { mixpanelTrack } from '../../../services/FOMixpanel';
import { Tab, Tabs, IconButton, Grid } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Tutorials from '../../components/Tutorials';
import Load from '../../../models/dataStructures/Load';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import RecommendedMatchesView from '../../components/DriverMatchesView/RecommendedMatchesView';
import DispatchableDriverMatchesView from '../../components/DriverMatchesView/DispatchableDriverMatchesView';
import LaneLoads from '../../components/DriverMatchesView/LaneLoads';
import ActiveMatchesView from '../../components/DriverMatchesView/ActiveMatchesView';
import OnboardNewDriverModal from '../../components/OnboardNewDriverModal';
import { DriverAppStore } from '../../store/DriverAppStore';
import { MatchTabStatus, MIXPANEL_EVENTS, ROUTES, Tutorial } from '../../../services/constants';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';

// Disable lazy loading due to geotab
// const OnboardNewDriverModal = lazy(() =>
//   import(/* webpackChunkName: 'OnboardNewDriverModal' */  '../../components/OnboardNewDriverModal'));

const styles = {
  dispatchableDriverLogout: {
    opacity: 0,
  },
};

interface IDriverMatchTabsRouteParams {
  type: MatchTabStatus;
  laneIndex: string;
}

interface IDriverViewMatchesPageState {
  currentTab: number;
  showNewDriverDialog: boolean;
  matchDetailPath: string;
  exitCount: number;
}

type IDriverViewMatchesPageProps =
  IDriverAppStore
  & RouteComponentProps<IDriverMatchTabsRouteParams>
  & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class DriverViewMatchesPage extends React.Component<IDriverViewMatchesPageProps, IDriverViewMatchesPageState> {
  tabStates = Object.freeze({
    loads: 0,
    active: 1,
  });

  constructor(props) {
    super(props);
    const { match: { params: { type } } } = this.props;
    const tabState = this.tabStates[type];
    this.trackTabMixpanel(tabState);
    this.state = {
      currentTab: tabState,
      showNewDriverDialog: false,
      matchDetailPath: '',
      exitCount: 0,
    };
  }

  get showingLanes() {
    const { match: { params: { laneIndex } } } = this.props;
    return laneIndex !== undefined;
  }

  onItemClick = (load: Load) => {
    const { history, driverAppStore } = this.props;
    const {
      searchStore: { setSelectedLoad },
      matchStore: { setSelectedMatch },
      userStore: { defaultDriver, defaultDriverCompletedOnboarding },
    } = driverAppStore as DriverAppStore;
    setSelectedMatch(null);
    setSelectedLoad(load);
    let redirectPath;
    if (load.matchId === load.loadId) {
      redirectPath = `/driver/load/${load.id}/detail`;
    } else {
      redirectPath = `/driver/match/${load.matchId}/detail`;
    }
    if (defaultDriver && !defaultDriverCompletedOnboarding) {
      this.setState({
        showNewDriverDialog: true,
        matchDetailPath: redirectPath,
      });
    } else {
      history.push(redirectPath);
    }
  };

  setLaneState = (index: number) => {
    const { history } = this.props;
    history.push(`/driver/view/loads/lane/${index}`);
  };

  handleChangeIndex = (value) => {
    this.setState({ currentTab: value });
    const { history } = this.props;
    const { currentTab: currentTabValue } = this.state;
    if (value !== currentTabValue) {
      this.setState({ currentTab: value });
      this.trackTabMixpanel(value);
      const type = Object.keys(this.tabStates).find(key => this.tabStates[key] === value);
      if (type) {
        history.replace(`/driver/view/${type}`);
      }
    }
  };

  handleTabChange = (event, value) => {
    this.handleChangeIndex(value);
  };

  trackTabMixpanel = (value: number) => {
    switch (value) {
      case this.tabStates.active:
        return mixpanelTrack(MIXPANEL_EVENTS.ACTIVE_TAB);
      case this.tabStates.loads:
        return mixpanelTrack(MIXPANEL_EVENTS.LOADS_TAB);
    }
  };

  dismissHandler = () => {
    this.setState({ showNewDriverDialog: false });
  };

  routeToRALPage = () => {
    const { history } = this.props;
    history.push(`/${ROUTES.DRIVER_RAL}`);
  };

  logoutHandler = async () => {
    const { exitCount } = this.state;
    if (exitCount >= 2) { // log user out after clicking exit 3 times
      const { driverAppStore } = this.props;
      const { userStore: { setLogin } } = driverAppStore as DriverAppStore;
      await firebase.auth().signOut();
      setLogin(false);
      window.location.replace('/');
    } else {
      this.incrementExit();
    }
  };

  incrementExit = () => {
    const { exitCount: exitCountCurrent } = this.state;
    this.setState({ exitCount: exitCountCurrent + 1 });
  };

  laneRoute = () => {
    if (this.showingLanes) {
      const { driverAppStore, match: { params: { laneIndex } }, history } = this.props;
      const { matchStore: { recommendedMatches: { lanes } } } = driverAppStore as DriverAppStore;
      if (lanes[laneIndex] && lanes[laneIndex].start_lane && lanes[laneIndex].end_lane) {
        const startLaneFormatted = lanes[laneIndex].start_lane.replace('_', ', ');
        const endLaneFormatted = lanes[laneIndex].end_lane.replace('_', ', ');

        return `${startLaneFormatted} - ${endLaneFormatted}`;
      }
      history.push('/driver/view/loads');
    }
    return '';
  };

  render() {
    const { currentTab, showNewDriverDialog, matchDetailPath, showHowToMyLoads } = this.state;

    const { driverAppStore, classes, match: { params: { laneIndex } } } = this.props;
    const {
      userStore, matchStore: {
        recommendedMatches, activeLoads, activeDispatchableDriverLoads, laneMatches, activeDispatcherLoads,
      },
    } = driverAppStore as DriverAppStore;
    const { dispatchableDriver, defaultDriver, dispatcher, getCurrentCoordinates, trackedMatchID, hideTracking } = userStore;

    return (
      <Grid container className='search-loads-page'>
        {dispatchableDriver && (
          <Grid container>
            <Grid item xs={12}>
              <FOAppBarPage
                pageTitle={this.showingLanes ? this.laneRoute() : 'My Loads'}
                showBackButton={this.showingLanes}
                renderTracking={Boolean(trackedMatchID && !hideTracking)}
                hideSettingsButton
                actionButtons={
                  <Grid item>
                    <IconButton
                      color='inherit'
                      className={classes.dispatchableDriverLogout}
                      onClick={this.logoutHandler}
                    >
                      <ExitToApp />
                    </IconButton>
                  </Grid>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <DispatchableDriverMatchesView
                activeLoads={activeDispatchableDriverLoads}
                userStore={userStore}
                onItemClick={this.onItemClick}
                currentCoordinates={getCurrentCoordinates.get()}
              />
            </Grid>
          </Grid>
        )}
        {(defaultDriver || dispatcher) && (
          <Grid container>
            <Grid item xs={12}>
              <FOAppBarPage
                pageTitle={this.showingLanes ? this.laneRoute() : 'My Loads'}
                renderTracking={Boolean(trackedMatchID && !hideTracking)}
                showBackButton={this.showingLanes}
                secondaryControls={
                  defaultDriver ? (
                    <Tabs
                      value={currentTab}
                      onChange={this.handleTabChange}
                      variant='fullWidth'
                    >
                      <Tab label='Recommended' />
                      <Tab label='Active' />
                    </Tabs>
                  ) : undefined
                }
              />
            </Grid>
            <Suspense fallback={<></>}>
              <OnboardNewDriverModal
                showNewDriverDialog={showNewDriverDialog}
                redirectPath={matchDetailPath}
                dismissHandler={this.dismissHandler}
              />
            </Suspense>
            {defaultDriver && (
              <>
                {currentTab === 0 && (
                  <Grid item xs={12}>
                    {laneIndex === undefined ? (
                      <RecommendedMatchesView
                        recommendedMatches={recommendedMatches}
                        userStore={userStore}
                        onItemClick={this.onItemClick}
                        currentCoordinates={getCurrentCoordinates.get()}
                        onLaneSelect={this.setLaneState}
                        routeToRALPage={this.routeToRALPage}
                      />
                    ) : (
                      <LaneLoads
                        laneMatches={laneMatches[laneIndex]}
                        userStore={userStore}
                        currentCoordinates={getCurrentCoordinates.get()}
                        onItemClick={this.onItemClick}
                        lane={recommendedMatches.lanes[laneIndex].lane}
                      />
                    )}
                  </Grid>
                )}
                {currentTab === 1 && (
                  <Grid item xs={12}>
                    <ActiveMatchesView
                      activeLoads={activeLoads}
                      userStore={userStore}
                      onItemClick={this.onItemClick}
                      currentCoordinates={getCurrentCoordinates.get()}
                      routeToRALPage={this.routeToRALPage}
                    />
                  </Grid>
                )}
              </>
            )}
            {dispatcher && (
              <Grid item xs={12}>
                <ActiveMatchesView
                  activeLoads={activeDispatcherLoads}
                  userStore={userStore}
                  onItemClick={this.onItemClick}
                  currentCoordinates={getCurrentCoordinates.get()}
                  routeToRALPage={this.routeToRALPage}
                />
              </Grid>
            )}
          </Grid>
        )}
        <Tutorials tutorialKey={Tutorial.MY_LOADS_PAGE} />
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(DriverViewMatchesPage));
