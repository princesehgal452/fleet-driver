import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import RALPageTruck from 'assets/images/png/RALPageTruck.png';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';

import FOAppBar from 'components/v3/FOAppBar';
import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';
import RALPostContent from 'components/v3/RALPostContent';
import PageSubtitle from 'components/v3/PageSubtitle';
import RequestedLoadsList from './RequestedLoadsList';
import styles from './styles';

type IRequestLoadV3Props = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

interface IRequestLoadV3State {
  isDrawerOpen: boolean;
  prefillSearchQuery;
}

@inject('driverAppStore')
@observer
class RequestLoadV3 extends React.Component<IRequestLoadV3Props, IRequestLoadV3State> {
  constructor(props: IRequestLoadV3Props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      prefillSearchQuery: null,
    };
  }

  componentDidMount() {
    const { location, driverAppStore } = this.props;
    if (location?.state?.redirectFrom === 'loadDetails') {
      const { searchStoreV3: { searchResults: { previousQuery } } } = driverAppStore as DriverAppStore;
      this.setState({ isDrawerOpen: true, prefillSearchQuery: previousQuery });
    }
    this.downloadTrucks();
  }

  reflectDrawerStateCallback = (isDrawerOpen) => {
    this.setState({ isDrawerOpen });
  };

  closeDrawerHandler = () => {
    this.setState({ isDrawerOpen: false });
  };

  downloadTrucks = () => {
    const { driverAppStore } = this.props;
    const { truckStore: { postedTrucks: { downloadResults } } } = driverAppStore as DriverAppStore;
    downloadResults();
  };

  redirectToRALDetails = (ralId: string) => () => {
    const { history } = this.props;
    history.push(`/driver/requestLoadDetailsV3/${ralId}`);
  };

  render() {
    const { classes } = this.props;
    const { isDrawerOpen, prefillSearchQuery } = this.state;
    return (
      <Box className={classes.root}>
        <FOAppBar
          noBorder
          position='static'
          pageTitle='Request A Load'
        />
        <Box className={classes.horizontalListContainer}>
          <RequestedLoadsList
            title='Loads you Requested'
            handleLoadSelect={this.redirectToRALDetails}
          />
        </Box>
        <Grid container>
          <Grid item xs={12}>
            <PageSubtitle title='Request a Load' py={1} px={2} />
          </Grid>
        </Grid>
        <Grid container justify='center'>
          <Grid item>
            <Box p={2}>
              <img src={RALPageTruck} width={100} height={100} alt='RAL truck' />
            </Box>
          </Grid>
        </Grid>
        <FOSwipeableBottomDrawer
          minHeight={120}
          isDrawerOpen={isDrawerOpen}
          reflectDrawerState={this.reflectDrawerStateCallback}
          drawerCloseBgGrey
        >
          <RALPostContent
            reflectDrawerState={this.reflectDrawerStateCallback}
            isDrawerOpen={isDrawerOpen}
            prefillSearchQuery={prefillSearchQuery}
          />
        </FOSwipeableBottomDrawer>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(RequestLoadV3));
