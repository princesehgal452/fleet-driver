import React, { Dispatch } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import { Phone } from '@material-ui/icons';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Load from '../../../../../models/dataStructures/Load';
import RequestCallbackActionButton from '../RequestCallbackActionButton';
import BookShipmentActionButton from '../BookShipmentActionButton';
import DispatcherSendAssignButton from '../DispatcherSendAssignButton';
import TenderButton from '../DocumentButtons/TenderButton';
import PODInvoiceButton from '../DocumentButtons/PODInvoiceButton';
import DownloadMatchDocumentsButton from '../DocumentButtons/DownloadMatchDocumentsButton';
import FOCardActionListItem, { FOCardActionListItemButtonHeight } from '../../../../../components/FOCardActionListItem';
import { DriverAppStore } from '../../../../store/DriverAppStore';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5, 1),
  },
  actionGrid: {
    // This should be the same height as the button in CardActionListItem.
    // This is done so that in summary max 2 buttons are shown. Other buttons
    // will move on the next row but will be hidden.
    maxHeight: FOCardActionListItemButtonHeight,
    overflow: 'hidden',
  },
}));

interface IDispatcherButtons {
  load: Load;
  driverAppStore: DriverAppStore;
  toggleShowOnboarding: () => void;
  setLoadDetailPath: Dispatch<string>;
  showCallDialog: () => void;
  detailsPage: boolean;
  showComplete: boolean;
  showPOD: boolean;
  showInvoice: boolean;
  showTenderUpload: boolean;
  showDownloadDocuments: boolean;
  showBookButton: boolean;
}

const DispatcherButtons = observer(({
                                      load, driverAppStore, showBookButton, showTenderUpload,
                                      toggleShowOnboarding, setLoadDetailPath, detailsPage,
                                      showInvoice, showPOD, showComplete, showCallDialog, showDownloadDocuments,
                                    }: IDispatcherButtons) => {

  const classes = useStyles();

  if (!load.certfiedLoad) {
    return (
      <Grid container alignItems='stretch' className={classNames(classes.root, { [classes.actionGrid]: !detailsPage })}>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={6}>
            <DispatcherSendAssignButton load={load} />
          </Grid>
          <Grid item xs={6}>
            <RequestCallbackActionButton
              load={load}
              toggleShowOnboarding={toggleShowOnboarding}
              setLoadDetailPath={setLoadDetailPath}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (load.isCancelled) {
    return (
      <Grid container alignItems='stretch' className={classNames(classes.root, { [classes.actionGrid]: !detailsPage })}>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={12}>
            <FOCardActionListItem text='Load Cancelled' variant='contained' red />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  const { userStore } = driverAppStore;
  return (
    <Grid container alignItems='stretch' className={classNames(classes.root, { [classes.actionGrid]: !detailsPage })}>
      <Grid container alignItems='center' spacing={1}>
        {showTenderUpload && load.bookedOrCompletedMatch && (
          <Grid item xs={detailsPage ? 6 : 12}>
            <TenderButton load={load} />
          </Grid>
        )}
        {(showInvoice || showPOD) && (
          <Grid item xs={detailsPage ? 6 : 12}>
            <PODInvoiceButton
              load={load}
              blue={detailsPage}
              showCallDialog={showComplete ? showCallDialog : undefined}
            />
          </Grid>
        )}
        {!((load.bookedMatch || load.transitMatch) && load.anyMatchAutomatedTrackingAssigned) && (
          <Grid item xs={6}>
            <DispatcherSendAssignButton load={load} />
          </Grid>
        )}
        {showBookButton && (
          <Grid item xs={6}>
            <BookShipmentActionButton
              load={load}
              lightGreen={!showTenderUpload}
              userStore={userStore}
              toggleShowOnboarding={toggleShowOnboarding}
              setLoadDetailPath={setLoadDetailPath}
              showCallDialog={(load.anyMatchBookedPending || load.bookedMatch) && showCallDialog}
              Icon={(load.anyMatchBookedPending || load.bookedMatch) && Phone}
            />
          </Grid>
        )}
        {showDownloadDocuments && load.bookedOrCompletedMatch && (
          <Grid item xs={6}>
            <DownloadMatchDocumentsButton bookedMatch={load.bookedOrCompletedMatch} />
          </Grid>
        )}
        <Grid item xs={6}>
          <RequestCallbackActionButton
            load={load}
            toggleShowOnboarding={toggleShowOnboarding}
            setLoadDetailPath={setLoadDetailPath}
          />
        </Grid>
      </Grid>
    </Grid>
  );
});

export default DispatcherButtons;
