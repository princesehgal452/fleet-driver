import React, { memo } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import FOButtonLoader from '../../../../../../components/FOButtonLoader';


interface IOperatingLanesDeleteDialogContentProps {
  loading: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
}

const OperatingLanesDeleteDialogContent = memo(({ loading, confirmHandler, closeHandler }: IOperatingLanesDeleteDialogContentProps) => (
  <div>
    <DialogTitle>
      Delete Lane
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this lane?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button disabled={loading} onClick={closeHandler}>Cancel</Button>
      <Button variant='contained' color='primary' disabled={loading} onClick={confirmHandler}>
        <FOButtonLoader loading={loading}>
          Delete
        </FOButtonLoader>
      </Button>
    </DialogActions>
  </div>
));

export default OperatingLanesDeleteDialogContent;
