import React, { Dispatch, useState } from 'react';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import { Button, Dialog, DialogContent, DialogTitle, Grid, makeStyles, Theme } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { DateTimePicker } from '@material-ui/pickers';
import FOAppBarPage from '../../../../../../components/FOAppBar/FOAppBarPage';
import RequestCallbackActionCancelConfirmation from './RequestCallbackActionCancelConfirmation';
import FOGrid from '../../../../../../components/FOGrid';
import Load from '../../../../../../models/dataStructures/Load';
import { getAppContainer } from '../../../../../../utils/utility';


const useStyles = makeStyles((theme: Theme) => ({
  noGutter: {
    padding: 0,
  },
  dateHighlight: {
    backgroundColor: theme.palette.primary.main,
  },
  contentGridContainer: {
    height: '100%',
  },
  selectionContent: {
    flex: 1,
  },
  datepicker: {
    width: '100%',
    '& .MuiPickersBasePicker-container': {
      alignItems: 'center',
    },
    '& .MuiPickersBasePicker-container > div': {
      width: '100%',
    },
    '& .MuiPickerDTToolbar-toolbar > div': {
      maxWidth: 325,
    },
  },
}));

const sendRequestedDate = (requestedDate: Moment | Date, initiateRequestCallback: (requestedDate: number) => Promise<void>, closeHandler: () => void) => async () => {
  try {
    await initiateRequestCallback(moment(requestedDate).unix());
    closeHandler();
  } catch (error) {
    console.log(error);
  }
};

const cancelRequestedDate = (cancelRequestCallback: () => Promise<void>, closeHandler: () => void, setShowCancelDialog: Dispatch<boolean>) => async () => {
  try {
    await cancelRequestCallback();
    setShowCancelDialog(false);
    closeHandler();
  } catch (error) {
    console.log(error);
  }
};

const toggleTouchedDatepicker = (setTouchedDatepicker: Dispatch<boolean>, state: boolean) => () => setTouchedDatepicker(state);
const toggleShowCancelDialog = (setShowCancelDialog: Dispatch<boolean>, state: boolean) => () => setShowCancelDialog(state);

interface IRequestCallbackActionButtonContentOwnProps {
  load: Load;
  closeHandler: () => void;
  active: boolean;
}

type IRequestCallbackActionButtonContentProps = IRequestCallbackActionButtonContentOwnProps;

const RequestCallbackActionButtonContent = observer(({
                                                       load:
                                                         { initiateRequestCallback, cancelRequestCallback, anyMatchActiveRequestedCallback, requestCallbackStore: { loading } },
                                                       active, closeHandler,
                                                     }: IRequestCallbackActionButtonContentProps) => {
  const classes = useStyles();
  const [requestedDate, setRequestedDate] = useState(anyMatchActiveRequestedCallback && anyMatchActiveRequestedCallback.metadata && anyMatchActiveRequestedCallback.metadata.requestedTimestamp
    ? moment.unix(anyMatchActiveRequestedCallback.metadata.requestedTimestamp) : new Date(Date.now() + (15 * 60 * 1000)));

  const [touchedDatepicker, setTouchedDatepicker] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const showSendButton = (active && touchedDatepicker) || (!active);

  return (
    <>
      <DialogTitle disableTypography className={classes.noGutter}>
        <FOAppBarPage
          pageTitle='Select Date & Time'
          backButtonIcon={<Clear />}
          backButtonAction={closeHandler}
          showBackButton
          hideSettingsButton
        />
      </DialogTitle>
      <DialogContent className={classes.noGutter}>
        <Grid container direction='column' className={classes.contentGridContainer} wrap='nowrap'>
          <Grid item className={classes.selectionContent}>
            <div className={classes.datepicker} onClick={toggleTouchedDatepicker(setTouchedDatepicker, true)}>
              <DateTimePicker
                autoOk
                disablePast
                hideTabs
                minutesStep={15}
                variant='static'
                value={requestedDate}
                onChange={setRequestedDate}
                DialogProps={{
                  container: getAppContainer
                }}
              />
            </div>
          </Grid>
          <Grid item>
            <FOGrid justify='center'>
              {showSendButton && (
                <Grid item xs={12} md={3}>
                  <Button
                    onClick={sendRequestedDate(requestedDate, initiateRequestCallback, closeHandler)}
                    disabled={loading}
                    color='primary'
                    variant='contained'
                    fullWidth
                  >
                    {active ? 'Change Request' : 'Send Request'}
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} />
              {active && (
                <Grid item xs={12} md={3}>
                  <Button
                    onClick={toggleShowCancelDialog(setShowCancelDialog, true)}
                    disabled={loading}
                    fullWidth
                  >
                    Cancel Request
                  </Button>
                </Grid>
              )}
            </FOGrid>
          </Grid>
        </Grid>
        <Dialog open={showCancelDialog} container={getAppContainer}>
          <RequestCallbackActionCancelConfirmation
            loading={loading}
            cancelHandler={cancelRequestedDate(cancelRequestCallback, closeHandler, setShowCancelDialog)}
            goBackHandler={toggleShowCancelDialog(setShowCancelDialog, false)}
          />
        </Dialog>
      </DialogContent>
    </>
  );
});

export default RequestCallbackActionButtonContent;

