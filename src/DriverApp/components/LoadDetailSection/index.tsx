import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MatchDetailInfoCol from '../../pages/DriverMatchDetailsPage/components/MatchDetailInfoCol';
import { MatchDetailMultiLocationCheck } from '../../pages/DriverMatchDetailsPage/components/MatchDetailMultiLocationCheck';
import MatchDetailShipmentNotes from '../../pages/DriverMatchDetailsPage/components/MatchDetailShipmentNotes';
import { DetailSection } from '../DetailSection';


@observer
class LoadDetailSection extends React.Component {
  static propTypes = {
    equipmentTypeFormatted: PropTypes.string,
    weightWithUnits: PropTypes.string,
    freightType: PropTypes.string,
    isMultipleDropOffPickup: PropTypes.bool,
    pickupQty: PropTypes.number,
    dropoffQty: PropTypes.number,
    matchId: PropTypes.string,
    loadId: PropTypes.string,
    loadContentDetails: PropTypes.object,
    dispatchableDriver: PropTypes.bool,
  };

  render() {
    const {
      equipmentTypeFormatted, weightWithUnits, freightType, isMultipleDropOffPickup,
      pickupQty, dropoffQty, loadContentDetails, dispatchableDriver,
    } = this.props;
    return (
      <DetailSection sectionTitle='Load Details'>
        <Grid item xs={12} className='match-detail-page__sectionBody'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MatchDetailInfoCol title='Freight Type' value={freightType || '-'} />
            </Grid>
            <Grid item xs={6}>
              <MatchDetailInfoCol title='Total Weight' value={weightWithUnits} />
            </Grid>
            {isMultipleDropOffPickup && (
              <Grid item xs={12}>
                <MatchDetailMultiLocationCheck
                  pickupQty={pickupQty}
                  dropoffQty={dropoffQty}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {!dispatchableDriver && (
          <Grid item xs={12}>
            <MatchDetailShipmentNotes loadContentDetails={loadContentDetails} />
          </Grid>
        )}
      </DetailSection>
    );
  }
}

export default LoadDetailSection;
