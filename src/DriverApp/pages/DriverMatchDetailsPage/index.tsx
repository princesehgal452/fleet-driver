import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MatchDetailContent from './components/MatchDetailContent';
import { WithFOLoading } from '../../../components/WithFOLoading';
import FOErrorImage from '../../../components/FOErrorImage';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import { ROUTES } from '../../../services/constants';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';

import LoadNotFound from '../../../assets/images/svg/load-not-exist.svg';


const MatchDetailContentWithFOLoading = WithFOLoading(MatchDetailContent);

const styles = (theme: Theme) => ({
  link: {
    color: theme.palette.secondary.main,
  },
});

type IDriverMatchDetailsPageProps = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class DriverMatchDetailsPage extends React.Component<IDriverMatchDetailsPageProps> {
  componentDidMount() {
    this.downloadLoadOrMatch();
  }

  downloadLoadOrMatch = async () => {
    const { match: { params }, driverAppStore } = this.props;
    const { loadId, matchId } = params as any;
    const {
      matchStore, searchStore, userStore: { currentCoordinates, downloadCurrentCoordinatesAsync },
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
      await searchStore.downloadLoad(loadId);
      if (searchStore.selectedLoad) {
        const { downloadLoadWithDistanceInMiles, calculateDeadheadInMiles } = searchStore.selectedLoad;
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
    const { matchStore, searchStore, userStore: { dispatchableDriver } } = driverAppStore as DriverAppStore;
    const { selectedMatch, error: MatchStoreError } = matchStore;
    const { selectedLoad, searchResults: { error: SearchStoreError } } = searchStore;
    let error;
    if (matchId) {
      error = MatchStoreError;
    } else if (loadId) {
      error = SearchStoreError;
    }
    return (
      <>
        {error
          ? (
            <FOErrorImage
              image={<LoadNotFound />}
              title='Sorry, this load is no longer available.'
              caption={<Link to={`/${ROUTES.DRIVER_RAL}`} className={classes.link}>You can request a load</Link>}
            />
          )
          : (
            <Grid container>
              <Grid item xs={12}>
                <FOAppBarPage pageTitle='Load Details' showBackButton hideSettingsButton={dispatchableDriver} />
              </Grid>
              <Grid item xs={12}>
                <MatchDetailContent
                  isLoading={matchId ? matchStore.loading : searchStore.searchResults.loading}
                  load={matchId ? (selectedMatch && selectedMatch.parentLoad) : selectedLoad}
                  loadId={matchId ? (selectedMatch && selectedMatch?.parentLoad?.id) : selectedLoad?.id}
                  matchProp={selectedMatch}
                  matchId={selectedMatch?.id}
                />
              </Grid>
            </Grid>
          )
        }
      </>
    );
  }
}

export default withRouter(withStyles(styles)(DriverMatchDetailsPage));
