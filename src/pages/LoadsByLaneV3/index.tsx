import React from 'react';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IRecommendedLane } from 'models/interfaces/shared/IRecommendedLane';
import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';

import FOAppBar from 'components/v3/FOAppBar';
import FODottedDivider from 'components/FODottedDivider';
import LoadByLaneHorizontalList from 'components/v3/LoadByLaneHorizontalList';

import LaneLoadsList from './LaneLoads';
import styles from './styles';


type ILoadsByLaneV3Props = IDriverAppStore & WithStyles<typeof styles> & RouteComponentProps;

@inject('driverAppStore')
@observer
class LoadsByLaneV3 extends React.Component<ILoadsByLaneV3Props> {
  handleLaneSelect = (laneItem: IRecommendedLane | IOperatingLane) => {
    const { history } = this.props;
    const laneIndex = laneItem.lane || laneItem.name;
    const pickup = laneItem.start_lane || laneItem.pickup.city;
    const dropoff = laneItem.end_lane || laneItem.dropoff.city;
    history.push(`/driver/viewV3/loadsByLane/${laneIndex}/${pickup}/${dropoff}`);
  };


  getOtherLanes = () => {
    const { driverAppStore, match: { params: { laneIndex } } } = this.props;
    const { userStore: { FOUser: { operatingLanes } }, matchStore: { recommendedMatches } } = driverAppStore as DriverAppStore;
    const allLanes = [...operatingLanes, ...recommendedMatches?.lanes];
    const laneIndexFormatted = decodeURIComponent(laneIndex);
    return allLanes.filter((laneItem) => (laneItem?.lane !== laneIndexFormatted && laneItem?.name !== laneIndexFormatted));
  };

  render() {
    const { driverAppStore, classes, match: { params: { laneIndex, pickupCity, dropoffCity } } } = this.props;
    const { matchStore: { loadsByLane } } = driverAppStore as DriverAppStore;
    return (
      <Box height='100%' className={classes.root}>
        <FOAppBar
          pageTitle='Loads By Lane'
          showBackButton
        />
        <Box p={2}>
          <LaneLoadsList
            laneMatches={loadsByLane}
            lane={laneIndex}
            pickupCity={pickupCity}
            dropoffCity={dropoffCity}
          />
        </Box>
        <FODottedDivider />
        <Box pt={2} px={2} pb={1}>
          <LoadByLaneHorizontalList
            title='Other Lanes'
            listItems={this.getOtherLanes()}
            handleLaneSelect={this.handleLaneSelect}
          />
        </Box>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(LoadsByLaneV3));
