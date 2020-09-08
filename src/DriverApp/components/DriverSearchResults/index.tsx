import React from 'react';
import { observer } from 'mobx-react';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import DriverSearchNoResults from './DriverSearchNoResults';
import LoadCard from '../LoadCard';
import CardList from '../CardList';
import Load from '../../../models/dataStructures/Load';
import TruckStore from '../../store/TruckStore';
import { CollectionsStore } from '../../store/CollectionsStore';
import { ICoordinate } from '../../../models/interfaces/shared/ICoordinate';
import SettingLoadSVG from '../../../assets/images/svg/driver/setting-load.svg';

import './DriverSearchResults.scss';


interface IDriverSearchResultsOwnProps {
  pristine: boolean;
  loading: boolean;
  onResultClick: (selectedLoad: Load) => void;
  onPageChange: (selectedPage: number) => void;
  searchResultsStore: CollectionsStore;
  truckStore: TruckStore;
  currentCoordinates: ICoordinate;
  searchResultsList: Load[];
  pageCount: number;
  currentPage: number;
}

@observer
class DriverSearchResults extends React.Component<IDriverSearchResultsOwnProps> {
  state = {
    showNoResults: false,
  };

  componentDidUpdate(prevProps: Readonly<IDriverSearchResultsOwnProps>) {
    const { pristine, searchResultsStore } = this.props;
    if (!searchResultsStore.loading && (searchResultsStore.results.length === 0) && !pristine) {
      this.setShowNoResults(true);
    } else {
      this.setShowNoResults(false);
    }
  }

  setShowNoResults = debounce((showNoResultsNewState) => {
    this.setState({ showNoResults: showNoResultsNewState });
  }, 500);

  render() {
    const { showNoResults } = this.state;
    const {
      onPageChange, onResultClick, searchResultsStore, currentCoordinates, truckStore,
    } = this.props;

    return (
      <Grid container>
        {!showNoResults
          ? (<SettingLoadSVG className='default_truck_image' />)
          : (<DriverSearchNoResults searchResultsStore={searchResultsStore} truckStore={truckStore} />
          )}
        <Grid item xs={12}>
          <CardList
            cardListId='Search Results'
            collectionStore={searchResultsStore}
            CardItemComponent={LoadCard}
            currentCoordinates={currentCoordinates}
            onItemClick={onResultClick}
            fetchPageOverride={onPageChange}
          />
        </Grid>
      </Grid>
    );
  }
}

export default DriverSearchResults;
