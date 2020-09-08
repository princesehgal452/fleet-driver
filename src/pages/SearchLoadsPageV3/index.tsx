import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { Tutorial } from 'services/constants';
import { getGreetings } from 'utils/utility';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';

import FOGreetingAppBar from 'components/FOGreetingAppBar';
import Tutorials from 'components/v3/Tutorials';

import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';
import SearchLoadsContent from 'components/v3/SearchLoadsContent';
import SearchPreferredLanes from 'components/v3/SearchPreferredLanes';
import SavePreferredLanes from 'components/v3/SearchPreferredLanes/SavePreferredLanes';
import styles from './styles';


interface ISearchLoadsPageState {
  isDrawerOpen: boolean;
  allowSaveLane: boolean;
  selectedLane: IOperatingLane | null;
  prefillSearchQuery;
  isLoading: boolean;
}

type ISearchLoadsPageProp = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SearchLoadsPageV3 extends React.Component<ISearchLoadsPageProp, ISearchLoadsPageState> {
  constructor(props: ISearchLoadsPageProp) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      allowSaveLane: false,
      selectedLane: null,
      prefillSearchQuery: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    if (location?.state?.redirectFrom === 'loadDetails') {
      this.setState({ isLoading: false, isDrawerOpen: true });
    } else {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location, driverAppStore } = this.props;
    const { isLoading } = this.state;
    if (location?.state?.redirectFrom === 'loadDetails' && prevState.isLoading && !isLoading) {
      const { searchStoreV3: { searchResults: { previousQuery } } } = driverAppStore as DriverAppStore;
      this.setState({ prefillSearchQuery: previousQuery });
    }
  }

  reflectDrawerStateCallback = (isDrawerOpen) => {
    if (!isDrawerOpen) {
      this.setState({ selectedLane: null, allowSaveLane: false, prefillSearchQuery: null });
    }
    this.setState({ isDrawerOpen });
  };

  closeDrawerHandler = () => {
    this.setState({ isDrawerOpen: false, prefillSearchQuery: null });
  };

  triggerFindLoad = (selectedLane: IOperatingLane = null) => () => {
    this.setState({ selectedLane, isDrawerOpen: true });
  };

  triggerSaveLane = (selectedLane?: IOperatingLane = null) => (e) => {
    e.stopPropagation();
    this.setState({ selectedLane, allowSaveLane: true, isDrawerOpen: true });
  };

  handleCloseSaveLane = () => {
    this.setState({ allowSaveLane: false, selectedLane: null, isDrawerOpen: false });
  };

  render() {
    const { classes, driverAppStore } = this.props;
    const { userStore: { userFirstName } } = driverAppStore as DriverAppStore;
    const { isDrawerOpen, selectedLane, allowSaveLane, prefillSearchQuery, isLoading } = this.state;

    if (isLoading) { // Added to prevent user from seeing drawer slide up with results when navigation back from load details
      return <div />;
    }

    return (
      <Box className={classes.root} height='100%'>
        <Box className={classes.rootGrandient} height='100%'>
          <FOGreetingAppBar
            pageTitle={
              (
                <>
                  {`${getGreetings()},`}
                  <br />
                  {userFirstName}
                </>
              )
            }
          />
          <Grid container className='driver-page-content'>
            <SearchPreferredLanes
              handleLaneSelect={this.triggerFindLoad}
              triggerSaveLane={this.triggerSaveLane}
              closeSaveLaneDrawer={this.handleCloseSaveLane}
            />
          </Grid>
          <FOSwipeableBottomDrawer
            minHeight={120}
            isDrawerOpen={isDrawerOpen}
            reflectDrawerState={this.reflectDrawerStateCallback}
          >
            {allowSaveLane ? (
              <SavePreferredLanes
                selectedOperatingLane={selectedLane}
                closeSaveLaneDrawer={this.handleCloseSaveLane}
                triggerSaveLane={this.triggerSaveLane}
              />
            ) : (
              <SearchLoadsContent
                reflectDrawerState={this.reflectDrawerStateCallback}
                isDrawerOpen={isDrawerOpen}
                selectedOperatingLane={selectedLane}
                prefillSearchQuery={prefillSearchQuery}
              />
            )}
          </FOSwipeableBottomDrawer>
          <Tutorials tutorialKey={Tutorial.SEARCH_PAGE} />
        </Box>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(SearchLoadsPageV3));
