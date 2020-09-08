import React from 'react';
import { observer } from 'mobx-react';
import { Button, CircularProgress, DialogActions, DialogTitle } from '@material-ui/core';


interface IRequestCallbackActionCancelConfirmation {
  goBackHandler: () => void;
  cancelHandler: () => void;
  loading: boolean;
}

const RequestCallbackActionCancelConfirmation = observer(({ goBackHandler, cancelHandler, loading }: IRequestCallbackActionCancelConfirmation) => {
  return (
    <>
      <DialogTitle>
        Are you sure you want to cancel this callback?
      </DialogTitle>
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

export default RequestCallbackActionCancelConfirmation;
