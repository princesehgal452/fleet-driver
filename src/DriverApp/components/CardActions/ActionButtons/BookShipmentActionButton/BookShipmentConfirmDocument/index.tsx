import React, { memo } from 'react';
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';


interface IBookShipmentConfirmDocument {
  cancelHandler: () => void;
  uploadClickHandler: () => void;
}

const BookShipmentConfirmDocument = memo(({ cancelHandler, uploadClickHandler }: IBookShipmentConfirmDocument) => {
  return (
    <>
      <DialogTitle>
        Document Upload
      </DialogTitle>
      <DialogContent>
        <Typography>
          Please upload your W9, Insurance and Carrier Authority to proceed
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={uploadClickHandler}>
          Upload
        </Button>
      </DialogActions>
    </>
  );
});

export default BookShipmentConfirmDocument;
