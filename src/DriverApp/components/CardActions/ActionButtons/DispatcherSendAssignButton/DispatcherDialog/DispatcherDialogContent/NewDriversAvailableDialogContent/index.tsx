import React from 'react';
import { observer } from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DispatcherSelectConfirmDrivers from '../../../../../../DispatcherSelectConfirmDrivers';
import { UserStore } from '../../../../../../../store/UserStore';
import { SnackbarStore } from '../../../../../../../store/SnackbarStore';
import { DialogActions } from '@material-ui/core';
import FOTransitionUp from '../../../../../../../../components/FOTransitionUp';
import { getAppContainer } from '../../../../../../../../utils/utility';


interface INewDriversAvailableDialogContentOwnProps {
  userStore: UserStore;
  snackbarStore: SnackbarStore;
  closeHandler: () => void;
}

@observer
class NewDriversAvailableDialogContent extends React.Component<INewDriversAvailableDialogContentOwnProps> {
  state = {
    showDispatcherDriverSelect: false,
  };

  yesButtonHandler = () => {
    this.setState({ showDispatcherDriverSelect: true });
  };

  render() {
    const { userStore, snackbarStore, closeHandler } = this.props;
    const { showDispatcherDriverSelect } = this.state;
    return (
      <>
        <DialogTitle>
          New drivers added to your fleet
        </DialogTitle>
        <DialogContent>
          <Typography>
            Do you want to confirm their authority now?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>No</Button>
          <Button variant='text' color='primary' onClick={this.yesButtonHandler}>Yes</Button>
        </DialogActions>
        <Dialog open={showDispatcherDriverSelect} fullScreen TransitionComponent={FOTransitionUp} container={getAppContainer}>
          <DispatcherSelectConfirmDrivers
            userStore={userStore}
            snackbarStore={snackbarStore}
            closeHandler={closeHandler}
          />
        </Dialog>
      </>
    );
  }
}

export default NewDriversAvailableDialogContent;
