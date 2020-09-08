import React from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid, Hidden, IconButton, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Map } from '@material-ui/icons';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import DriversOverviewList from './DriversOverviewList';
import DriversOverviewMap from './DriversOverviewMap';
import FOFullPageDialog from '../../../components/FOFullPageDialog';
import Tutorials from '../../components/Tutorials';
import { Tutorial } from '../../../services/constants';
import { DriverTruck } from '../../../models/dataStructures/DriverTruck';
import { DriverAppStore } from '../../store/DriverAppStore';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';


const styles = (theme: Theme) => ({
  root: {
    height: '100%',
  },
  flexStretch: {
    flexGrow: 1,
  },
});

type IDriversOverviewPageProps = WithStyles<typeof styles> & IDriverAppStore & RouteComponentProps;

interface IDriversOverviewPageState {
  showDriverInvite: boolean;
  showMapDialog: boolean;
  mapInstance: google.maps.Map | null;
  locatedDriver: DriverTruck | null;
}

@inject('driverAppStore')
@observer
class DriversOverviewPage extends React.Component<IDriversOverviewPageProps, IDriversOverviewPageState> {
  constructor(props: IDriversOverviewPageProps) {
    super(props);
    this.state = {
      showDriverInvite: false,
      showMapDialog: false,
      mapInstance: null,
      locatedDriver: null,
    };
  }

  goToDispatchableDriverPage = (personId: string) => () => {
    const { history } = this.props;
    history.push(`/driver/drivers/${personId}`);
  };

  toggleDriverInvite = () => {
    const { showDriverInvite: showDriverInviteCurrentState } = this.state;
    this.setState({ showDriverInvite: !showDriverInviteCurrentState });
  };

  toggleShowMapDialog = () => {
    const { showMapDialog: showMapDialogCurrentState } = this.state;
    this.setState({ showMapDialog: !showMapDialogCurrentState });
  };

  setMapInstance = (mapInstance: google.maps.Map | null) => {
    this.setState({ mapInstance });
  };

  locateHandler = (driver: DriverTruck) => {
    const { mapInstance } = this.state;
    if (mapInstance) {
      mapInstance.panTo(driver.driverCoordinates);
      mapInstance.setZoom(17);
    }
    this.setState({ locatedDriver: driver });
  };

  resetLocatedDriver = () => {
    this.setState({ locatedDriver: null });
  };

  render() {
    const { showDriverInvite, showMapDialog, locatedDriver } = this.state;
    const { classes, driverAppStore } = this.props;
    const { userStore: { FOUser: { drivers } }, configStore } = driverAppStore as DriverAppStore;
    return (
      <Grid container direction='column' className={classes.root}>
        <Grid item>
          <FOAppBarPage
            pageTitle='Drivers'
            actionButtons={(
              <Hidden mdUp>
                <IconButton color='inherit' onClick={this.toggleShowMapDialog}><Map /></IconButton>
              </Hidden>
            )}
          />
        </Grid>
        <Grid container item className={classes.flexStretch + ' driver-page-content'} spacing={1}>
          <Grid item md={6}>
            <DriversOverviewList
              drivers={drivers}
              showDriverInvite={showDriverInvite}
              onDriverClick={this.goToDispatchableDriverPage}
              toggleDriverInvite={this.toggleDriverInvite}
              locateHandler={this.locateHandler}
              locatedDriver={locatedDriver}
              configStore={configStore}
            />
          </Grid>
          <Hidden smDown>
            <Grid item md={6} className={classes.flexStretch}>
              <DriversOverviewMap
                drivers={drivers}
                setMapInstance={this.setMapInstance}
                resetLocatedDriver={this.resetLocatedDriver}
              />
            </Grid>
          </Hidden>
        </Grid>
        <FOFullPageDialog dialogTitle='Drivers Map' open={showMapDialog} closeHandler={this.toggleShowMapDialog}>
          <DriversOverviewMap
            drivers={drivers}
            setMapInstance={this.setMapInstance}
            resetLocatedDriver={this.resetLocatedDriver}
          />
        </FOFullPageDialog>
        <Tutorials tutorialKey={Tutorial.DRIVERS_PAGE} />
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(DriversOverviewPage));
