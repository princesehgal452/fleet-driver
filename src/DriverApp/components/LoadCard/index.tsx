import React from 'react';
import PropTypes from 'prop-types';
import { Theme, withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import withRouter from 'react-router-dom/withRouter';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardItemWrapper } from '../CardList/CardItemWrapper';
import LocationPriceLoadInfo from '../LocationsPriceLoadInfo';
import ActionButtons from '../CardActions/ActionButtons';
import MatchesTypeGroup from '../MatchesTypeGroup';
import CertifiedLoad from '../../../components/CertfiedLoad';
import MatchHelperText from '../../pages/DriverMatchDetailsPage/components/MatchHelperText';
import { DriverAppStore } from '../../store/DriverAppStore';


const styles = (theme: Theme) => ({
  loadList: {
    zIndex: 1,
  },
});

@inject('driverAppStore')
@observer
class LoadCard extends React.Component {
  static propTypes = {
    driverAppStore: PropTypes.object,
    collectionItem: PropTypes.object,
    currentCoordinates: PropTypes.object,
    dispatchableDriver: PropTypes.bool,
    dispatcher: PropTypes.bool,
    onItemClick: PropTypes.func,
  };

  componentDidMount() {
    const { collectionItem, currentCoordinates } = this.props;
    if (!collectionItem.typegroup) {
      const { load } = collectionItem;
      const loadItem = load || collectionItem;
      setTimeout(loadItem.downloadLoadWithDistanceInMiles, 1500);
      setTimeout(loadItem.calculateDeadheadInMiles, 1500, currentCoordinates);
    }
  }

  goToDetailPage = () => {
    const { collectionItem, onItemClick } = this.props;
    const { load } = collectionItem;
    const loadItem = load || collectionItem;
    onItemClick(loadItem);
  };

  render() {
    const { collectionItem, dispatchableDriver, dispatcher, classes, driverAppStore } = this.props;
    const { configStore : { isGeotab } } = driverAppStore as DriverAppStore;
    const { load } = collectionItem;
    const loadItem = load || collectionItem;
    return (
      <>
        {collectionItem.typegroup
          ? (
            <CardItemWrapper id={collectionItem.id}>
              <Grid item xs={12}>
                <MatchesTypeGroup type={collectionItem.text.type} />
              </Grid>
            </CardItemWrapper>
          )
          : (
            <CardItemWrapper id={loadItem.id}>
              <Grid item xs={12}>
                <CertifiedLoad certfied={loadItem.certfiedLoad} isGeotab={isGeotab}>
                  <Grid item xs={12}>
                    <CardActionArea onClick={this.goToDetailPage}>
                      <LocationPriceLoadInfo
                        pickup={loadItem.pickups[0]}
                        dropoff={loadItem.dropoffs[0]}
                        distance={loadItem.distanceInMiles}
                        radius={loadItem.deadheadInMiles}
                        equipmentTypeList={loadItem.equipmentTypeFormatted}
                        flatRate={loadItem.flatRate}
                        perMileRate={loadItem.perMileRate}
                        distanceLoading={loadItem.distanceStore.loading}
                        noRateText='Call for price'
                        matchDriverName={dispatcher && loadItem.driverTruckName}
                        dispatchableDriver={dispatchableDriver}
                        loadSmart={loadItem.loadSmart}
                        companyLogo={loadItem.companyLogo}
                        companyName={loadItem.contact?.companyName}
                      />
                    </CardActionArea>
                  </Grid>
                  <Grid item xs={12}>
                    <ActionButtons load={loadItem} />
                  </Grid>
                  <Grid item xs={12}>
                    <MatchHelperText load={loadItem} />
                  </Grid>
                </CertifiedLoad>
              </Grid>
            </CardItemWrapper>
          )}
      </>
    );
  }
}

export default withRouter(withStyles(styles)(LoadCard));
