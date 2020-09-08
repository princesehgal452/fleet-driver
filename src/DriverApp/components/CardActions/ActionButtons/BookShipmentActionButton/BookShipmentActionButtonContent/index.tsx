import React from 'react';
import { observer } from 'mobx-react';
import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Load from '../../../../../../models/dataStructures/Load';
import { SnackbarStore } from '../../../../../store/SnackbarStore';
import { mixpanelLoadProperties, mixpanelTrack } from '../../../../../../services/FOMixpanel';
import { MIXPANEL_EVENTS } from '../../../../../../services/constants';


const bookButtonHandler = (bookShipment: () => Promise<void>, closeHandler: () => void, { enqueueSnackbarStore }: SnackbarStore, load: Load) => async () => {
  try {
    await bookShipment();
    enqueueSnackbarStore('Booking request successfully submitted', { variant: 'success' });
    mixpanelTrack(MIXPANEL_EVENTS.BOOK_CONFIRM_CLICKED, { ...mixpanelLoadProperties(load) });
    closeHandler();
  } catch (error) {
  }
};

interface IBookShipmentActionButtonContentOwnProps {
  load: Load;
  closeHandler: () => void;
}

type IBookShipmentActionButtonContentProps = IBookShipmentActionButtonContentOwnProps;

const BookShipmentActionButtonContent = observer(({ load, closeHandler }: IBookShipmentActionButtonContentProps) => {

  const { loadBookingStore: { loading }, bookShipment, rootStore: { snackbarStore }, sourcePascalCase } = load;
  return (
    <>
      <DialogTitle>
        Book Shipment With {sourcePascalCase}
      </DialogTitle>
      <DialogContent>
        <Typography>
          For this shipment you will be working with <b>{sourcePascalCase}</b>, a BRF Certified partner.
        </Typography>
        <br />
        <Typography>
          <b>{sourcePascalCase}'s</b> team of dedicated professionals will work with you throughout the transportation of this
          freight.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} disabled={loading}>Cancel</Button>
        <Button
          variant='contained'
          color='primary'
          onClick={bookButtonHandler(bookShipment, closeHandler, snackbarStore, load)}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Book'}
        </Button>
      </DialogActions>
    </>
  );
});

export default BookShipmentActionButtonContent;

