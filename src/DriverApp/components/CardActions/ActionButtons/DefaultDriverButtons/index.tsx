import React, { Dispatch } from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { Phone } from '@material-ui/icons';
import classNames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { UserStore } from '../../../../store/UserStore';
import Load from '../../../../../models/dataStructures/Load';
import RequestCallbackActionButton from '../RequestCallbackActionButton';
import BookShipmentActionButton from '../BookShipmentActionButton';
import TenderButton from '../DocumentButtons/TenderButton';
import PODInvoiceButton from '../DocumentButtons/PODInvoiceButton';
import DownloadMatchDocumentsButton from '../DocumentButtons/DownloadMatchDocumentsButton';
import FOCardActionListItem, { FOCardActionListItemButtonHeight } from '../../../../../components/FOCardActionListItem';


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

interface IDefaultDriverButtons {
  load: Load;
  userStore: UserStore;
  toggleShowOnboarding: () => void;
  showCallDialog: () => void;
  setLoadDetailPath: Dispatch<string>;
  detailsPage: boolean;
  showComplete: boolean;
  showPOD: boolean;
  showInvoice: boolean;
  showTenderUpload: boolean;
  showDownloadDocuments: boolean;
  showBookButton: boolean;
}

const DefaultDriverButtons = observer(({
  load, userStore, setLoadDetailPath, toggleShowOnboarding, showComplete, showBookButton,
  showCallDialog, detailsPage, showPOD, showInvoice, showTenderUpload, showDownloadDocuments,
}: IDefaultDriverButtons) => {
  const classes = useStyles();

  if (!load.certfiedLoad) {
    return (
      <Grid container alignItems='stretch' className={classNames(classes.root, { [classes.actionGrid]: !detailsPage })}>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={12}>
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

  return (
    <Grid container alignItems='stretch' className={classNames(classes.root, { [classes.actionGrid]: !detailsPage })}>
      <Grid container alignItems='center' spacing={1}>
        {showTenderUpload && load.bookedOrCompletedMatch && (
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

export default DefaultDriverButtons;
