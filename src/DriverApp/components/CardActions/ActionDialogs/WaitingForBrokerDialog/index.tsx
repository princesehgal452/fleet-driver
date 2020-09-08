import React, { EventHandler, SyntheticEvent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Load from '../../../../../models/dataStructures/Load';
import FOButtonBlue from '../../../../../components/Buttons/FOButtonBlue';
import Typography from '@material-ui/core/Typography/Typography';
import { Button } from '@material-ui/core';
import { getAppContainer } from '../../../../../utils/utility';


interface IWaitingDialog {
  open: boolean;
  load: Load;
  closeHandler: EventHandler<SyntheticEvent>;
}

const WaitingForBrokerDialog = React.memo(({ open, load, closeHandler }: IWaitingDialog) => (
  <Dialog open={open} onClose={closeHandler} container={getAppContainer}>
    <DialogTitle disableTypography>
      <Typography variant='display3'>
        Bid Sent
      </Typography>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Your bid has been sent to the broker for consideration.
        <br />
        <br />
        We'll notify when they respond.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' color='primary' onClick={closeHandler} autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
));

export default WaitingForBrokerDialog;
