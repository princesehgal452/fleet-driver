import React from 'react';
import { observer } from 'mobx-react';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';


interface IMatchCancelButtonDialogContent {
  goBackHandler: () => void;
  cancelHandler: () => void;
  loading: boolean;
}

const MatchCancelButtonDialogContent = observer(({ goBackHandler, cancelHandler, loading }: IMatchCancelButtonDialogContent) => {
  return (
    <>
      <DialogTitle>
        Are you sure?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Cancelling a load may result in fewer shipment opportunities in the future.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={goBackHandler} disabled={loading}>
          Go Back
        </Button>
        <Button variant='contained' color='primary' disabled={loading} onClick={cancelHandler}>
          {loading ? <CircularProgress size={22} /> : 'Cancel'}
        </Button>
      </DialogActions>
    </>
  );
});

export default MatchCancelButtonDialogContent;
