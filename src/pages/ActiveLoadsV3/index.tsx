import React from 'react';
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import FOAppBar from 'components/v3/FOAppBar';
import ActiveMatchesView from './ActiveMatchesView';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
});


type IActiveLoadsV3Props =
  IDriverAppStore & WithStyles<typeof styles> & RouteComponentProps;

@inject('driverAppStore')
@observer
class ActiveLoadsV3 extends React.Component<IActiveLoadsV3Props> {

  redirectToRAL = () => {
    const { history } = this.props;
    history.push('/driver/requestLoadV3');
  };

  render() {
    const { driverAppStore, classes } = this.props;
    const { matchStore: { activeLoads } } = driverAppStore as DriverAppStore;

    return (
      <Box height='100%' className={classes.root}>
        <FOAppBar
          pageTitle='Active Loads'
          showBackButton
        />
        <Box p={2} mb={8}>
          <ActiveMatchesView activeLoads={activeLoads} routeToRALPage={this.redirectToRAL} />
        </Box>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(ActiveLoadsV3));
