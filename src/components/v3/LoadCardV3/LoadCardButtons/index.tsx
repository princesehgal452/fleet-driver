import React, { Dispatch, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Load from 'models/dataStructures/Load';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import DefaultDriverButtons from './DefaultDriverButtons';

const toggleShowDialog = (show: boolean, setShowDialog: Dispatch<boolean>) => () => setShowDialog(!show);

interface ILoadCardButtonsOwnProp {
  load: Load | undefined;
}

type ILoadCardButtonsProp = ILoadCardButtonsOwnProp & IDriverAppStore & RouteComponentProps;

const LoadCardButtons = inject('driverAppStore')(observer((
  { load, driverAppStore, location }: ILoadCardButtonsProp,
) => {
  const { userStore } = driverAppStore as DriverAppStore;

  const [showLoadContactDialog, setShowLoadContactDialog] = useState(false);

  const searchPage = location.pathname.includes('search');
  const loadDetailsPage = location.pathname.includes('load');
  const hideLoadSmartBook = Boolean(load && load.loadSmart && (searchPage || loadDetailsPage));

  const showComplete = Boolean(load && load.bookedOrCompletedMatch
    && (load.firstDropoffCrossedDropoffDate || load.completedMatch)
    // check
    && load.bookedOrCompletedMatch.documents.invoice && load.bookedOrCompletedMatch.documents.invoice.pending
    && load.bookedOrCompletedMatch.documents.pod && load.bookedOrCompletedMatch.documents.pod.pending
    && ((
      load.bookedOrCompletedMatch.documents.pod && load.bookedOrCompletedMatch.documents.pod.rejected
        && !load.bookedOrCompletedMatch.documents.invoice) || (
    // Complete (+ POD Accepted + Invoice Accepted + No Tender Upload)
      load.bookedOrCompletedMatch.documents.pod && load.bookedOrCompletedMatch.documents.invoice && !load.bookedOrCompletedMatch.documents.tender
        && load.bookedOrCompletedMatch.documents.pod.accepted && load.bookedOrCompletedMatch.documents.invoice.accepted)
    ));

  const showTenderUpload = Boolean(!showComplete && load && !load.firstDropoffCrossedDropoffDate && !load.completedMatch && load.bookedOrCompletedMatch && (
    (!load.bookedOrCompletedMatch.documents.tender)
    || (load.bookedOrCompletedMatch.documents.tender && !load.bookedOrCompletedMatch.documents.tender.accepted)));

  const showPOD = Boolean(!showTenderUpload && load && load.bookedOrCompletedMatch && (load.firstDropoffCrossedDropoffDate || load.completedMatch));

  const showInvoice = Boolean(!showTenderUpload && load && load.bookedOrCompletedMatch && (load.firstDropoffCrossedDropoffDate || load.completedMatch));

  const showDownloadDocuments = Boolean(!showTenderUpload && load && load.bookedOrCompletedMatch && load.bookedOrCompletedMatch.documents.hasSomeDocuments && (
    (load.bookedOrCompletedMatch.documents.invoice && !load.bookedOrCompletedMatch.documents.invoice.rejected)
    || (load.bookedOrCompletedMatch.documents.pod && !load.bookedOrCompletedMatch.documents.pod.rejected) || (
      (!load.bookedOrCompletedMatch.documents.tender || load.bookedOrCompletedMatch.documents.tender.accepted)
    )));

  const showBookButton = Boolean(!hideLoadSmartBook && load && (load.loadId || load?.matchId) && ((!load.bookedOrCompletedMatch || (load.anyMatchBookedPending && !load.bookedOrCompletedMatch)) && !(showInvoice || showPOD)));

  const showRequestCall = Boolean(load && (load.loadId || load?.matchId));
  const toggleShowLoadContact = toggleShowDialog(showLoadContactDialog, setShowLoadContactDialog);

  return (
    load ? (
      <DefaultDriverButtons
        load={load}
        userStore={userStore}
        showCallDialog={toggleShowLoadContact}
        showPOD={showPOD}
        showInvoice={showInvoice}
        showTenderUpload={showTenderUpload}
        showDownloadDocuments={showDownloadDocuments}
        showBookButton={showBookButton}
        showComplete={showComplete}
        showRequestCall={showRequestCall}
      />
    ) : null
  );
}));

export default withRouter(LoadCardButtons);
