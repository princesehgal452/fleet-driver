import React from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Button, Grid, Paper, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';
import { DriverTruck } from '../../../models/dataStructures/DriverTruck';
import DispatchableDriverLoads from './DispatchableDriverLoads';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import FODriverOverviewCard from '../../../components/FODriverOverviewCard';
import SettingsDivider from '../DriverSettingsPage/components/SettingsDivider';
import FOGrid from '../../../components/FOGrid';
import DispatchableDriverEquipment from './DispatchableDriverEquipment';
import TruckEquipmentSelect from '../../../Auth/AdditionalInfoPage/components/TruckEquipmentSelect';
import DispatchableDriverSessions from './DispatchableDriverSessions';
import Load from '../../../models/dataStructures/Load';
import ShortCode from '../DriverSettingsPage/components/ShortCode';


const styles = (theme: Theme) => ({});

interface IDispatchableDriversDetailsPage {
  personId: string;
}

type IDispatchableDriversDetailsPageProps =
  WithStyles<typeof styles>
  & IDriverAppStore
  & RouteComponentProps<IDispatchableDriversDetailsPage>;

interface IIDispatchableDriversDetailsPageState {
  dispatchableDriver: DriverTruck | null;
  showTruckSelectDialog: boolean;
}

@inject('driverAppStore')
@observer
class DispatchableDriversDetailsPage extends React.Component<IDispatchableDriversDetailsPageProps, IIDispatchableDriversDetailsPageState> {
  constructor(props) {
    super(props);
    this.state = {
      dispatchableDriver: null,
      showTruckSelectDialog: false,
    };
  }

  componentDidMount() {
    this.setDispatchableDriver();
  }

  setDispatchableDriver = () => {
    const { match: { params: { personId } }, driverAppStore } = this.props;
    const { userStore: { FOUser: { drivers } } } = driverAppStore as DriverAppStore;
    const dispatchableDriver = drivers?.find((driver) => driver.personId === personId);
    if (dispatchableDriver) {
      this.setState({ dispatchableDriver });
    } else {
      this.setState({ dispatchableDriver: null });
    }
  };

  routeToRALPage = () => {
    const { history } = this.props;
    const { dispatchableDriver } = this.state;
    if (dispatchableDriver) {
      history.push(`/driver/requestLoad/${dispatchableDriver.personId}`);
    } else {
      history.push('/driver/requestLoad');
    }
  };

  routeToLoadDetailsPage = (load: Load) => {
    const { history, driverAppStore } = this.props;
    const {
      searchStore: { setSelectedLoad },
      matchStore: { setSelectedMatch },
    } = driverAppStore as DriverAppStore;
    setSelectedMatch(null);
    setSelectedLoad(load);
    let redirectPath;
    if (load.matchId === load.loadId) {
      redirectPath = `/driver/load/${load.id}/detail`;
    } else {
      redirectPath = `/driver/match/${load.matchId}/detail`;
    }
    history.push(redirectPath);
  };

  toggleTruckSelectDialog = () => {
    const { showTruckSelectDialog: showTruckSelectDialogCurrentState } = this.state;
    this.setState({ showTruckSelectDialog: !showTruckSelectDialogCurrentState });
  };

  handleEquipmentSelect = (driver, newEquipmentTypeList: string[]) => {
    driver.updateEquipmentType(newEquipmentTypeList);
  };

  render() {
    const { dispatchableDriver, showTruckSelectDialog } = this.state;
    return (
      <Grid container justify='center'>
        <Grid item xs={12}><FOAppBarPage pageTitle='Drivers' showBackButton /></Grid>
        <Grid item lg={6} md={8} sm={10} xs={12}>
          {dispatchableDriver && (
            <Paper>
              <Grid container>
                <Grid item xs={12}>
                  <FODriverOverviewCard driver={dispatchableDriver} showInitials showLocation />
                </Grid>
                <Grid item xs={12}>
                  <SettingsDivider />
                </Grid>
                <Grid item xs={12}>
                  <DispatchableDriverEquipment driver={dispatchableDriver} onEditClick={this.toggleTruckSelectDialog} />
                </Grid>
                <Grid item xs={12}>
                  <SettingsDivider />
                </Grid>
                <Grid item xs={12}>
                  <DispatchableDriverSessions
                    driver={dispatchableDriver}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SettingsDivider />
                </Grid>
                <Grid item xs={12}>
                  <DispatchableDriverLoads
                    driver={dispatchableDriver}
                    routeToLoadDetailsPage={this.routeToLoadDetailsPage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SettingsDivider />
                </Grid>
                <Grid item xs={12}>
                  <FOGrid>
                    <Button fullWidth color='primary' variant='contained' onClick={this.routeToRALPage}>
                      Request A Load
                    </Button>
                  </FOGrid>
                </Grid>
                <Grid item xs={12}>
                  <FOGrid>
                    <ShortCode title='Send Tracking Link' />
                  </FOGrid>
                </Grid>
              </Grid>
              <TruckEquipmentSelect
                driver={showTruckSelectDialog ? dispatchableDriver : null}
                onClose={this.toggleTruckSelectDialog}
                handleDriverSelect={this.handleEquipmentSelect}
                />
            </Paper>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(DispatchableDriversDetailsPage));
