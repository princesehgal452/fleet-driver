import React, { Dispatch, lazy, Suspense, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import Load from '../../../../models/dataStructures/Load';
import { DriverAppStore } from '../../../store/DriverAppStore';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import DefaultDriverButtons from './DefaultDriverButtons';
import DispatcherButtons from './DispatcherButtons';
import LoadContactDialogContents from './LoadContactDialogContents';
import OnboardNewDriverModal from '../../OnboardNewDriverModal';
import { getAppContainer } from '../../../../utils/utility';


const toggleShowDialog = (show: boolean, setShowDialog: Dispatch<boolean>) => () => setShowDialog(!show);

interface IActionButtonsOwnProp {
  load: Load | null;
}

type IActionButtonsProp = IActionButtonsOwnProp & IDriverAppStore & RouteComponentProps;

const ActionButtons = inject('driverAppStore')(observer((
  { load, driverAppStore, location }: IActionButtonsProp,
) => {
  const { userStore } = driverAppStore as DriverAppStore;
  const { defaultDriver, dispatchableDriver, dispatcher } = userStore;

  const [redirectPath, setRedirectPath] = useState('');
  const [showOnboardDialog, setShowOnboardDialog] = useState(false);
  const [showLoadContactDialog, setShowLoadContactDialog] = useState(false);

  const searchPage = location.pathname.includes('search');
  const loadDetailsPage = location.pathname.includes('load');
  const detailsPage = location.pathname.includes('detail');
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

  const showBookButton = Boolean(!hideLoadSmartBook && load && ((!load.bookedOrCompletedMatch || (load.anyMatchBookedPending && !load.bookedOrCompletedMatch)) && !(showInvoice || showPOD)));

  const toggleShowOnboarding = toggleShowDialog(showOnboardDialog, setShowOnboardDialog);
  const toggleShowLoadContact = toggleShowDialog(showLoadContactDialog, setShowLoadContactDialog);

  return (
    load ? (
      <>
        <Suspense fallback={<></>}>
          <OnboardNewDriverModal
            showNewDriverDialog={showOnboardDialog}
            redirectPath={redirectPath}
            dismissHandler={toggleShowOnboarding}
          />
        </Suspense>
        {defaultDriver && (
          <DefaultDriverButtons
            load={load}
            userStore={userStore}
            setLoadDetailPath={setRedirectPath}
            toggleShowOnboarding={toggleShowOnboarding}
            detailsPage={detailsPage}
            showCallDialog={toggleShowLoadContact}
            showPOD={showPOD}
            showInvoice={showInvoice}
            showTenderUpload={showTenderUpload}
            showDownloadDocuments={showDownloadDocuments}
            showBookButton={showBookButton}
            showComplete={showComplete}
          />
        )}
        {dispatcher && (
          <DispatcherButtons
            load={load}
            driverAppStore={driverAppStore as DriverAppStore}
            toggleShowOnboarding={toggleShowOnboarding}
            detailsPage={detailsPage}
            setLoadDetailPath={setRedirectPath}
            showComplete={showComplete}
            showCallDialog={toggleShowLoadContact}
            showPOD={showPOD}
            showInvoice={showInvoice}
            showTenderUpload={showTenderUpload}
            showDownloadDocuments={showDownloadDocuments}
            showBookButton={showBookButton}
          />
        )}
        <Dialog open={showLoadContactDialog} onClose={toggleShowLoadContact} container={getAppContainer}>
          <LoadContactDialogContents load={load} />
        </Dialog>
      </>
    ) : null
  );
}));

export default withRouter(ActionButtons);
