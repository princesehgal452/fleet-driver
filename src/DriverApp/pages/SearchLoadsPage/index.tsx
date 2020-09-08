import React, { Suspense } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import { Grid } from '@material-ui/core';
import SearchPanel from '../../components/SearchPanel';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import DriverSearchResults from '../../components/DriverSearchResults';
import Tutorials from '../../components/Tutorials';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { ISearchQuery } from '../../../models/interfaces/shared/ISearchQuery';
import { DriverAppStore } from '../../store/DriverAppStore';
import { mixpanelTrack } from '../../../services/FOMixpanel';
import { MIXPANEL_EVENTS, Tutorial } from '../../../services/constants';
import OnboardNewDriverModal from '../../components/OnboardNewDriverModal';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import './SearchLoadsPage.scss';


const styles = (theme: Theme) => ({
  driverPageContent: {
    maxHeight: 'calc(100vh - 385px) !important',
  },
});

interface ISearchLoadsPageState {
  collapsedSearchForm: boolean;
  pristine: boolean;
  currentSearchQuery: ISearchQuery;
  historySearchQuery: ISearchQuery;
  showNewDriverDialog: boolean;
  loadDetailPath: string;
  searchButtonPopover: boolean;
}

interface ISearchLoadsPageRouteParams {
  type: string;
}

type ISearchLoadsPageProp =
  IDriverAppStore
  & RouteComponentProps<ISearchLoadsPageRouteParams>
  & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SearchLoadsPage extends React.Component<ISearchLoadsPageProp, ISearchLoadsPageState> {
  search = debounce(async (searchQuery, pageNumber = 1) => {
    const { driverAppStore, history } = this.props;
    const { searchStore } = driverAppStore as DriverAppStore;
    const { historySearchQuery } = this.state;
    this.setState({
      pristine: false,
      collapsedSearchForm: true,
      currentSearchQuery: searchQuery,
    });
    const search = isEmpty(searchQuery) ? historySearchQuery : searchQuery;
    await searchStore.downloadSearchResults(pageNumber, search);
    this.setState({
      historySearchQuery: search,
      currentSearchQuery: {},
    });
  }, 1000);

  constructor(props: ISearchLoadsPageProp) {
    super(props);
    this.state = {
      collapsedSearchForm: true,
      pristine: true,
      currentSearchQuery: {},
      historySearchQuery: {},
      showNewDriverDialog: false,
      loadDetailPath: '',
      searchButtonPopover: false,
    };
  }

  componentDidMount() {
    const { driverAppStore, match: { params: { type } }, location: { search } } = this.props;
    const { searchStore } = driverAppStore as DriverAppStore;
    if (type === 'past') {
      searchStore.setSelectedLoad(null);
      searchStore.searchResults.setResults([]);
    }
  }

  showNearbyLoadsForFirstTimeUser = async () => {

    const { driverAppStore } = this.props;
    const {
      searchStore, userStore: { defaultDriverCompletedOnboarding, downloadCurrentCoordinatesAsync },
    } = driverAppStore as DriverAppStore;
    const firstTimeSearchDone = localStorage.getItem('firstTimeSearchDone');
    try {
      const coordinates = await downloadCurrentCoordinatesAsync();
      if (coordinates.lng && coordinates.lat) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinates }, (results) => {
          if (results && results.length) {
            this.updateSearchQuery({
              pickupLocation: {
                address: results[0].formatted_address,
                coordinates: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                },
              },
              radius: {
                amount: 500,
                unit: 'mile',
              },
            });
          }
          this.setState({ searchButtonPopover: true });
        });
        localStorage.setItem('firstTimeSearchDone', JSON.stringify(true));
      }
    } catch (error) {
      console.log('Could not query search results for first time user');
    }
  };

  updateSearchQuery = (searchQuery) => {
    this.setState({
      currentSearchQuery: searchQuery,
    });
  };

  handleHistorySearch = (searchQuery) => {

    this.setState({ historySearchQuery: searchQuery });
    this.handleSearch(searchQuery);
  };

  handleSearch = (searchQuery) => {
    const { history, match: { params }, driverAppStore } = this.props;
    const { searchStore: { searchResults: { setLoading } } } = driverAppStore as DriverAppStore;
    const { type } = params as any;

    this.updateSearchQuery(searchQuery);
    setLoading(true);
    this.search(searchQuery);
    if (type === 'past') {
      history.push('/driver/search/results');
    }
  };

  handlePageChange = (selectedPage) => {
    const { driverAppStore } = this.props;
    const { searchStore } = driverAppStore as DriverAppStore;
    searchStore.downloadSearchResults(selectedPage);
  };

  handlePanelExpanded = () => {
    const { collapsedSearchForm } = this.state;
    this.setState({
      collapsedSearchForm: !collapsedSearchForm,
    });
    mixpanelTrack(MIXPANEL_EVENTS.ADVANCED_OPTIONS, {
      Location: 'Search Page',
      State: collapsedSearchForm ? 'Collapsed' : 'Expanded',
    });
  };

  handleResultClick = (selectedLoad) => {
    const { driverAppStore, history } = this.props;
    const {
      searchStore, userStore: {
        defaultDriver, defaultDriverCompletedOnboarding,
      },
      matchStore: {
        setSelectedMatch,
      },
    } = driverAppStore as DriverAppStore;
    setSelectedMatch(null);
    if (defaultDriver && !defaultDriverCompletedOnboarding) {
      this.setState({
        showNewDriverDialog: true,
        loadDetailPath: `/driver/load/${selectedLoad.id}/detail`,
      });
    } else {
      searchStore.setSelectedLoad(selectedLoad);
      history.push(`/driver/load/${selectedLoad.id}/detail`);
    }
  };

  dismissHandler = () => {
    this.setState({ showNewDriverDialog: false });
  };

  render() {
    const {
      collapsedSearchForm, currentSearchQuery, showNewDriverDialog, pristine,
      loadDetailPath, searchButtonPopover,
    } = this.state;
    const { classes, driverAppStore, match: { params: { type } } } = this.props;
    const { searchStore, truckStore, userStore: { getCurrentCoordinates, hideTracking, trackedMatchID }, configStore: { isGeotab } } = driverAppStore as DriverAppStore;
    const showingResults = type === 'results';

    console.log('pristine');
    console.log(pristine);

    return (
      <div>
        <FOAppBarPage
          pageTitle={'Search Loads'}
          renderTracking={Boolean(trackedMatchID && !hideTracking)}
          secondaryControls={
            <Grid container>
              <Grid item xs={12}>
                <SearchPanel
                  onSearch={this.handleSearch}
                  loading={searchStore.searchResults.loading}
                  recentSearches={searchStore.recentSearches}
                  collapsedSearchForm={collapsedSearchForm}
                  onExpanded={this.handlePanelExpanded}
                  searchButtonPopover={searchButtonPopover}
                  currentSearchQuery={currentSearchQuery}
                  pagination={searchStore.searchResults.pagination}
                  onHistorySearchClick={this.handleHistorySearch}
                  onNearbyLoadsClick={this.showNearbyLoadsForFirstTimeUser}
                  type={type}
                />
              </Grid>
            </Grid>
          }
        />
        <Grid container className={`driver-page-content ${isGeotab && classes.driverPageContent}`}>
          <DriverSearchResults
            searchResultsStore={searchStore.searchResults}
            pristine={pristine}
            loading={searchStore.searchResults.loading}
            searchResultsList={searchStore.searchResults.results}
            pageCount={searchStore.searchResults.pagination.totalPages}
            currentPage={searchStore.searchResults.pagination.page}
            currentCoordinates={currentSearchQuery.pickupLocation ?
              // this is used to calculate deadhead, show deadhead from pickup location, else from user's current location
              currentSearchQuery.pickupLocation.coordinates : getCurrentCoordinates.get()}
            onPageChange={this.handlePageChange}
            onResultClick={this.handleResultClick}
            truckStore={truckStore}
          />
        </Grid>
        <Suspense fallback={<></>}>
          <OnboardNewDriverModal
            showNewDriverDialog={showNewDriverDialog}
            redirectPath={loadDetailPath}
            dismissHandler={this.dismissHandler}
          />
        </Suspense>
        <Tutorials tutorialKey={Tutorial.SEARCH_PAGE} />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SearchLoadsPage));
