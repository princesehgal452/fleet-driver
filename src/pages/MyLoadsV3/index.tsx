import React from 'react';
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { IRecommendedLane } from 'models/interfaces/shared/IRecommendedLane';
import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { Tutorial } from 'services/constants';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';

import FOAppBar from 'components/v3/FOAppBar';
import LoadByLaneHorizontalList from 'components/v3/LoadByLaneHorizontalList';
import Tutorials from 'components/v3/Tutorials';
import FODottedDivider from 'components/v3/FODottedDivider';
import SecondaryActionButton from 'components/v3/FOAppBar/SecondaryActionButton';

import TrackingActiveIcon from 'assets/images/png/tracking/TrackingActiveIcon.png';
import TrackingInactiveIcon from 'assets/images/png/tracking/TrackingInactiveIcon.png';
import ActiveLoadsIcon from 'assets/images/png/ActiveLoadsIcon.png';

import RecommendedLoads from './RecommendedLoads';

import styles from './styles';

type IMyLoadsV3Props =
  IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class MyLoadsV3 extends React.Component<IMyLoadsV3Props> {
  handleLaneSelect = (laneItem: IRecommendedLane & IOperatingLane) => {
    const { history } = this.props;
    const laneIndex = laneItem.lane || laneItem.name;
    const pickup = laneItem.start_lane || laneItem.pickup.city;
    const dropoff = laneItem.end_lane || laneItem.dropoff.city;
    history.push(`/driver/viewV3/loadsByLane/${laneIndex}/${pickup}/${dropoff}`);
  };

  redirectActiveLoads = () => {
    const { history } = this.props;
    history.push('/driver/viewV3/activeLoads');
  };

  redirectTracking = () => {
    const { history } = this.props;
    history.push('/driver/trackingSessionsV3');
  };

  render() {
    const { driverAppStore, classes } = this.props;
    const { userStore: { FOUser: { operatingLanes }, trackedMatchID }, matchStore: { recommendedMatches } } = driverAppStore as DriverAppStore;
    const ActionButton = () => (
      <Box display='inline' onClick={this.redirectTracking}>
        <img
          src={trackedMatchID ? TrackingActiveIcon : TrackingInactiveIcon}
          alt='Tracking'
          className={classes.actionButton}
        />
      </Box>
    );

    const SecondaryAction = () => (
      <SecondaryActionButton
        text='Active Loads'
        startIcon={<img src={ActiveLoadsIcon} alt='Active Loads' height={22} />}
        endIcon={<ChevronRightOutlinedIcon color='primary' />}
        onClick={this.redirectActiveLoads}
      />
    );

    return (
      <Box height='100%' className={classes.root}>
        <FOAppBar
          pageTitle='My Loads'
          actionButtons={<ActionButton />}
          secondaryActionButtons={<SecondaryAction />}
        />
        <Box pt={2} px={2} pb={1.5}>
          <LoadByLaneHorizontalList
            title='Loads By Lane'
            listItems={[...operatingLanes, ...recommendedMatches?.lanes]}
            handleLaneSelect={this.handleLaneSelect}
          />
        </Box>
        <FODottedDivider />
        <Box p={2}>
          <RecommendedLoads title='Recommended For You' recommendedMatches={recommendedMatches} />
        </Box>
        <Tutorials tutorialKey={Tutorial.MY_LOADS_PAGE} />
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(MyLoadsV3));
