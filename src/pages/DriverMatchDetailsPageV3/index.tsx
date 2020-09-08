import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import FOAppBar from 'components/v3/FOAppBar';
import MatchDetailContent from './components/MatchDetailContent';
import styles from './styles';

type IDriverMatchDetailsPageV3Props = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class DriverMatchDetailsPageV3 extends React.Component<IDriverMatchDetailsPageV3Props> {
  componentDidMount() {
    this.downloadLoadOrMatch();
  }

  handleGoBack = () => {
    const { history, location } = this.props;
    if (location?.state?.redirectFrom === 'search') {
      history.push('/driver/searchV3/results', { redirectFrom: 'loadDetails' });
    } else if (location?.state?.redirectFrom === 'requestLoad') {
      history.push('/driver/requestLoadV3', { redirectFrom: 'loadDetails' });
    } else {
      history.back();
    }
  };

  downloadLoadOrMatch = async () => {
    const { match: { params }, driverAppStore } = this.props;
    const { loadId, matchId } = params as any;
    const {
      matchStore, searchStoreV3, userStore: { currentCoordinates, downloadCurrentCoordinatesAsync },
    } = driverAppStore as DriverAppStore;
    if (matchId) {
      await matchStore.downloadMatch(matchId);
      if (matchStore.selectedMatch && matchStore.selectedMatch.parentLoad) {
        const { downloadLoadWithDistanceInMiles, calculateDeadheadInMiles } = matchStore.selectedMatch.parentLoad;
        setTimeout(downloadLoadWithDistanceInMiles, 1500);
        if (!currentCoordinates.lat && !currentCoordinates.lng) {
          const coordinates = await downloadCurrentCoordinatesAsync();
          setTimeout(calculateDeadheadInMiles, 1500, coordinates);
        } else {
          setTimeout(calculateDeadheadInMiles, 1500, currentCoordinates);
        }
      }
    } else if (loadId) {
      await searchStoreV3.downloadLoad(loadId);
      if (searchStoreV3.selectedLoad) {
        const { downloadLoadWithDistanceInMiles, calculateDeadheadInMiles } = searchStoreV3.selectedLoad;
        setTimeout(downloadLoadWithDistanceInMiles, 1500);
        if (!currentCoordinates.lat && !currentCoordinates.lng) {
          const coordinates = await downloadCurrentCoordinatesAsync();
          setTimeout(calculateDeadheadInMiles, 1500, coordinates);
        } else {
          setTimeout(calculateDeadheadInMiles, 1500, currentCoordinates);
        }
      }
    }
  };

  render() {
    const { match: { params }, driverAppStore, classes } = this.props;
    const { loadId, matchId } = params as any;
    const { matchStore, searchStoreV3 } = driverAppStore as DriverAppStore;
    const { selectedMatch } = matchStore;
    const { selectedLoad } = searchStoreV3;
    return (
      <Box className={classes.root}>
        <FOAppBar
          pageTitle='Load Details'
          showBackButton
          backButtonAction={this.handleGoBack}
        />
        <MatchDetailContent
          isLoading={matchId ? matchStore.loading : searchStoreV3.searchResults.loading}
          load={matchId ? (selectedMatch && selectedMatch.parentLoad) : selectedLoad}
        />
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(DriverMatchDetailsPageV3));
