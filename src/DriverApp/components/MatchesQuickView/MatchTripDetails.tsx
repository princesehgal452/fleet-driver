import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import MatchDetailInfoCol from '../../pages/DriverMatchDetailsPage/components/MatchDetailInfoCol';


@observer
class MatchTripDetails extends React.Component {
  static propTypes = {
    load: PropTypes.object,
  };

  componentDidMount() {
    const { load } = this.props;
    setTimeout(load.downloadLoadWithDistanceInMiles, 1500);
  }

  render() {
    const { load } = this.props;
    // console.log(load);
    // console.log(load.distanceInMiles, load.equipmentTypeFormatted);
    return (
      <Grid container>
        <Grid item xs={6}>
          <MatchDetailInfoCol title='Deadhead' value={load.distanceInMiles} />
        </Grid>
        <Grid item xs={6}>
          <MatchDetailInfoCol title='Truck' value={load.equipmentTypeFormatted} />
        </Grid>
      </Grid>
    );
  }
}


MatchTripDetails.propTypes = {
  load: PropTypes.object.isRequired,
};

export default MatchTripDetails;
