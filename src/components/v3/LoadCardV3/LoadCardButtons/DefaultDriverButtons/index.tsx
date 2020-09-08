import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import Load from 'models/dataStructures/Load';
import { UserStore } from 'DriverApp/store/UserStore';
import RequestCallback from '../RequestCallback';
import BookShipment from '../BookShipment';

interface IDefaultDriverButtons {
  load: Load;
  userStore: UserStore;
  showCallDialog: () => void;
  showComplete: boolean;
  showPOD: boolean;
  showInvoice: boolean;
  showTenderUpload: boolean;
  showDownloadDocuments: boolean;
  showBookButton: boolean;
  showRequestCall: boolean;
}

const DefaultDriverButtons = observer(({
  load,
  userStore,
  showComplete,
  showBookButton,
  showCallDialog,
  showPOD,
  showInvoice,
  showTenderUpload,
  showDownloadDocuments,
  showRequestCall,
}: IDefaultDriverButtons) => {

  /*
  if (!load.certfiedLoad) {
    return (
      <Grid container alignItems='stretch' className={classes.root}>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={12}>
            <RequestCallbackActionButton
              load={load}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
  */

  /*
  if (load.isCancelled) {
    return (
      <Grid container alignItems='stretch' className={classes.root}>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={12}>
            <FOCardActionListItem text='Load Cancelled' variant='contained' red />
          </Grid>
        </Grid>
      </Grid>
    );
  }
  */

  return (
    <Grid container wrap='nowrap' spacing={1} justify='flex-end'>
      {/* {showTenderUpload && load.bookedOrCompletedMatch && (
        <Grid item xs={detailsPage ? 6 : 12}>
          <TenderButton
            load={load}
            showCallDialog={((!load.bookedOrCompletedMatch.documents.tender)
              || (load.bookedOrCompletedMatch.documents.tender && load.bookedOrCompletedMatch.documents.tender.rejected)) ? showCallDialog : undefined}
          />
        </Grid>
      )}
      {(showInvoice || showPOD) && (
        <Grid item xs={detailsPage ? 6 : 12}>
          <PODInvoiceButton
            load={load}
            blue={detailsPage}
            showCallDialog={showCallDialog}
          />
        </Grid>
      )}
          {showDownloadDocuments && load.bookedOrCompletedMatch && (
            <Grid item xs={6}>
              <DownloadMatchDocumentsButton bookedMatch={load.bookedOrCompletedMatch} />
            </Grid>
          )} 
      */}
      {
        showRequestCall && (
          <Grid item>
            <RequestCallback load={load} />
          </Grid>
        )
      }
      {showBookButton && (
        <Grid item>
          <BookShipment
            load={load}
            // lightGreen={!showTenderUpload}
            // userStore={userStore}
            // toggleShowOnboarding={toggleShowOnboarding}
            // setLoadDetailPath={setLoadDetailPath}
            // showCallDialog={(load.anyMatchBookedPending || load.bookedMatch) && showCallDialog}
            // Icon={(load.anyMatchBookedPending || load.bookedMatch) && Phone}
          />
        </Grid>
      )}
    </Grid>
  );
});

export default DefaultDriverButtons;
