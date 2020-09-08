import React from 'react';
import { observer } from 'mobx-react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import FOTransitionUp from '../../../../../../components/FOTransitionUp';
import Load from '../../../../../../models/dataStructures/Load';
import { UserStore } from '../../../../../store/UserStore';
import { SnackbarStore } from '../../../../../store/SnackbarStore';
import { DriverTruck } from '../../../../../../models/dataStructures/DriverTruck';
import DispatcherDialogContent from './DispatcherDialogContent';
import ConfigStore from '../../../../../store/ConfigStore';
import { getAppContainer } from '../../../../../../utils/utility';


const styles = (theme: Theme) => ({});

interface IDispatcherDialogOwnProps {
  open: boolean;
  load: Load;
  loading: boolean;
  userStore: UserStore;
  configStore: ConfigStore;
  snackbarStore: SnackbarStore;
  dispatchLoad: (arg1: DriverTruck | null) => void;
  onCloseHandler: () => void;
  loadBookedAndNotAssigned?: boolean;
}

type IDispatcherDialogProps = IDispatcherDialogOwnProps & WithStyles<typeof styles>;

interface IDispatcherDialogState {
  showSuccess: boolean;
  openDriverInvitation: boolean;
  loading: boolean;
  selectedDriver: DriverTruck | null;
}

@observer
class DispatcherDialog extends React.Component<IDispatcherDialogProps, IDispatcherDialogState> {
  constructor(props: IDispatcherDialogProps) {
    super(props);
    this.state = {
      showSuccess: false,
      selectedDriver: null,
      openDriverInvitation: false,
      loading: this.props.loading || false,
    };
  }

  reset = () => {
    this.setState({ selectedDriver: null });
  };

  setDriverSelected = (driver: DriverTruck) => {
    this.setState({ selectedDriver: driver });
  };

  toggleDriverInvitation = () => {
    const { openDriverInvitation: openDriverInvitationValue } = this.state;
    this.setState({ openDriverInvitation: !openDriverInvitationValue });
  };

  handleDispatchLoad = () => {
    const { selectedDriver } = this.state;
    const { dispatchLoad } = this.props;
    dispatchLoad(selectedDriver);
  };

  componentDidUpdate(prevProps, prevState) {
    const { loading } = this.props;
    if (prevProps.loading !== loading) {
      this.setState({ loading });
    }
  }

  render() {
    const { open, load, userStore, configStore, snackbarStore, onCloseHandler, loading, loadBookedAndNotAssigned } = this.props;
    const { dispatchableDrivers } = userStore;
    const { selectedDriver, openDriverInvitation } = this.state;

    return (
      <>
        <Dialog open={open} fullScreen TransitionComponent={FOTransitionUp} onExited={this.reset} container={getAppContainer}>
          <DispatcherDialogContent
            load={load}
            onCloseHandler={onCloseHandler}
            drivers={dispatchableDrivers}
            loadBookedAndNotAssigned={loadBookedAndNotAssigned}
            dispatchLoad={this.handleDispatchLoad}
            openDriverInvitation={openDriverInvitation}
            selectedDriver={selectedDriver}
            setDriverSelected={this.setDriverSelected}
            toggleDriverInvitation={this.toggleDriverInvitation}
            loading={loading}
            snackbarStore={snackbarStore}
            userStore={userStore}
            configStore={configStore}
          />
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(DispatcherDialog);
