import React, { SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Clear from '@material-ui/icons/Clear';
import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';
import FOAppbar from '../../../../../../../components/FOAppBar';
import FOSelectListItem from '../../../../../../../components/FOSelectListItem';
import InviteNewDriver from '../../../../../InviteNewDriver';
import { DriverTruck } from '../../../../../../../models/dataStructures/DriverTruck';
import { UserStore } from '../../../../../../store/UserStore';
import { SnackbarStore } from '../../../../../../store/SnackbarStore';
import NewDriversAvailableDialogContent from './NewDriversAvailableDialogContent';
import DispatchedDriversBlocker from './DispatchedDriversBlocker';
import Load from '../../../../../../../models/dataStructures/Load';
import DispatchableDriversListItem from './DispatchableDriversListItem';
import { InteractionEventTypes } from '../../../../../../../services/constants';
import ConfigStore from '../../../../../../store/ConfigStore';
import { getAppContainer } from '../../../../../../../utils/utility';


const styles = (theme: Theme) => ({
  formSection: {
    padding: theme.spacing(2),
    height: '100%',
    overflowY: 'auto' as 'auto',
  },
  driverName: {
    color: theme.palette.secondary.main,
    weight: 'bold',
  },
  actionContainer: {
    height: '100%',
    paddingTop: theme.spacing(1),
  },
  button: {
    minWidth: '265px',
  },
  link: {
    color: theme.palette.secondary.main,
  },
});

interface DispatcherDialogContentOwnProps {
  load: Load;
  loading: boolean;
  onCloseHandler: (event: SyntheticEvent<Element>) => void;
  dispatchLoad: () => void;
  toggleDriverInvitation: () => void;
  setDriverSelected: (driver: DriverTruck) => void;
  openDriverInvitation: boolean;
  selectedDriver: DriverTruck | null;
  drivers?: DriverTruck[];
  userStore: UserStore;
  snackbarStore: SnackbarStore;
  configStore: ConfigStore;
  loadBookedAndNotAssigned?: boolean;
}

type DispatcherDialogContentProps = DispatcherDialogContentOwnProps & WithStyles<typeof styles>;

@observer
class DispatcherDialogContent extends React.Component<DispatcherDialogContentProps> {
  state = {
    newDriversAvailableDialogOpen: false,
    addNewDriverModeActive: false,
  };

  componentDidMount() {
    const { userStore: { newDriversAvailable } } = this.props;
    if (newDriversAvailable) {
      this.setState({ newDriversAvailableDialogOpen: true });
    }
  }

  closeNewDriversAvailableDialog = () => {
    this.setState({ newDriversAvailableDialogOpen: false });
  };

  previouslySentToThisDriverBlock = (driver: DriverTruck) => {
    const { load } = this.props;
    // Only block when load is not booked yet but sent to driver
    return Boolean(load.matches.find((match) => (
      Boolean(match.interactions.find((interaction) => (
        interaction.truckId === driver.truckId) && interaction.eventType === InteractionEventTypes.DISPATCHED)))));
  };

  driverItemClickHandler = (driver: DriverTruck) => () => {
    const { setDriverSelected } = this.props;
    setDriverSelected(driver);
    this.setState({ addNewDriverModeActive: false });
  };

  addItemClickHandler = () => {
    this.setState({ addNewDriverModeActive: true });
    const { toggleDriverInvitation } = this.props;
    toggleDriverInvitation();
  };

  handleToggleDriverInvitation = () => {
    this.setState({ addNewDriverModeActive: false });
    const { toggleDriverInvitation } = this.props;
    toggleDriverInvitation();
  };

  render() {
    const { newDriversAvailableDialogOpen, addNewDriverModeActive } = this.state;
    const {
      onCloseHandler, openDriverInvitation, selectedDriver, drivers, load, loading, loadBookedAndNotAssigned,
      dispatchLoad, userStore, snackbarStore, classes, configStore: { isGeotab },
    } = this.props;
    return (
      <>
        <FOAppbar position='static' disableGutters color='primary'>
          <Grid container alignItems='center' justify='space-between' wrap='nowrap'>
            <Grid item>
              <Grid container alignItems='center'>
                <IconButton color='inherit' onClick={onCloseHandler}>
                  <Clear />
                </IconButton>
                <Typography variant='h5' color='inherit'>
                  Select Driver
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </FOAppbar>
        <Grid container className={classes.formSection} justify='space-between'>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {drivers && drivers.map((driver) => driver.equipmentTypeList.length > 0 && (
                    <Grid item xs={12} key={driver.truckId}>
                      <DispatchedDriversBlocker block={this.previouslySentToThisDriverBlock(driver)}>
                        <FOSelectListItem
                          onClick={this.driverItemClickHandler(driver)}
                          selected={Boolean(selectedDriver && (selectedDriver.truckId === driver.truckId) && !addNewDriverModeActive)}
                        >
                          <DispatchableDriversListItem userStore={userStore} driverTruck={driver} load={load} />
                        </FOSelectListItem>
                      </DispatchedDriversBlocker>
                    </Grid>
                  ))}
                  {
                    !isGeotab && (
                    <Grid item xs={12} key='invite-driver'>
                      <FOSelectListItem
                        onClick={this.addItemClickHandler}
                        selected={addNewDriverModeActive}
                        isAddNew
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography variant='h6'>
                              Add new driver
                            </Typography>
                          </Grid>
                        </Grid>
                      </FOSelectListItem>
                    </Grid>
                    )
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction='column'
              wrap='nowrap'
              justify='flex-end'
              className={classes.actionContainer}
              alignItems='center'
            >
              {drivers && drivers.length > 0 && (
                <Grid item>
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    onClick={dispatchLoad}
                    className={classes.button}
                    disabled={loading || !selectedDriver}
                  >
                    {loadBookedAndNotAssigned ? 'Assign Load' : 'Send Load'}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={newDriversAvailableDialogOpen} TransitionComponent={Zoom} container={getAppContainer}>
          <NewDriversAvailableDialogContent
            userStore={userStore}
            snackbarStore={snackbarStore}
            closeHandler={this.closeNewDriversAvailableDialog}
          />
        </Dialog>
        <InviteNewDriver open={openDriverInvitation} closeHandler={this.handleToggleDriverInvitation} />
      </>
    );
  }
}

export default withStyles(styles)(DispatcherDialogContent);
