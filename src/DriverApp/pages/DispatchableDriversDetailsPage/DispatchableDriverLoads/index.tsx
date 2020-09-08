import React from 'react';
import { observer } from 'mobx-react';
import { CircularProgress, Grid, Tab, Tabs } from '@material-ui/core';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import FOGrid from '../../../../components/FOGrid';
import AvailableLoads from './AvailableLoads';
import RecommendedLoads from './RecommendedLoads';
import Load from '../../../../models/dataStructures/Load';


interface IDispatchableDriverLoadsProps {
  driver: DriverTruck;
  routeToLoadDetailsPage: (load: Load) => void;
}

interface IDispatchableDriverLoadsState {
  tabState: TabStates;
}

enum TabStates {
  AVAILABLE,
  RECOMMENDED,
}

@observer
class DispatchableDriverLoads extends React.Component<IDispatchableDriverLoadsProps, IDispatchableDriverLoadsState> {
  constructor(props: IDispatchableDriverLoadsProps) {
    super(props);
    this.state = {
      tabState: TabStates.AVAILABLE,
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ tabState: value });
  };

  render() {
    const { driver, routeToLoadDetailsPage } = this.props;
    const { tabState } = this.state;

    return (
      <FOGrid>
        <Grid item xs={12}>
          <Tabs
            indicatorColor='primary'
            textColor='primary'
            value={tabState}
            onChange={this.handleTabChange}
            variant='fullWidth'
          >
            <Tab label='Available Loads' value={TabStates.AVAILABLE} />
            <Tab label='Recommended' value={TabStates.RECOMMENDED} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {tabState === TabStates.AVAILABLE && (
            <AvailableLoads driver={driver} routeToLoadDetailsPage={routeToLoadDetailsPage} />
          )}
          {tabState === TabStates.RECOMMENDED && (
            <RecommendedLoads driver={driver} routeToLoadDetailsPage={routeToLoadDetailsPage} />
          )}
        </Grid>
      </FOGrid>
    );
  }
}

export default DispatchableDriverLoads;
