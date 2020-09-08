import React from 'react';
import { observer } from 'mobx-react';
import { History, Location } from 'history';
import { match, RouteComponentProps, withRouter } from 'react-router-dom';
import { Check, CloudUpload, Phone } from '@material-ui/icons';
import FOFullPageDialog from '../../../../../../components/FOFullPageDialog';
import FOCardActionListItem from '../../../../../../components/FOCardActionListItem';
import PODInvoiceDialogContent from './PODInvoiceDialogContent';
import PODInvoiceDialogActions from './PODInvoiceDialogActions';
import MatchDocumentsStore from '../../../../../../models/dataStructures/Match/MatchDocumentsStore';
import Load from '../../../../../../models/dataStructures/Load';
import { ROUTES } from '../../../../../../services/constants';


const toggleDialogHandler = (match: match, location: Location, history: History, load: Load, showCallDialog?: () => void) => (show: boolean) => async () => {
  const { bookedOrCompletedMatch, getLoadDetailsPath } = load;
  if (bookedOrCompletedMatch) {
    const { documents } = bookedOrCompletedMatch;

    // If all documents has been accepted dont show this dialog.
    if (show && accepted(documents)) {
      return;
    }
    // Prevent closing dialog when loading in progress
    if (!show && loading(documents)) {
      return;
    }
    if (awaiting(load) && showCallDialog && !location.pathname.includes(ROUTES.POD_INVOICE_SHOW)) {
      return showCallDialog();
    }
    const inDetailsPage = location.pathname.includes(getLoadDetailsPath);

    // If closing, default behavior is history.back(), but if the user opened the page directly via URL, use history.push to load details page
    if (inDetailsPage && !show) {
      (history.length < 2) ? history.push(getLoadDetailsPath) : history.back();
    }
    // If trying to open from my loads page, first go to details page and then open
    if (!inDetailsPage && show) {
      // Cannot push 2 routes sequentially
      setTimeout(history.push, 0, `${getLoadDetailsPath}`);
      setTimeout(history.push, 5, `${getLoadDetailsPath}/${ROUTES.POD_INVOICE_SHOW}`);
    }
    // If already in details page and then open immediately
    if (inDetailsPage && show) {
      history.push(`${getLoadDetailsPath}/${ROUTES.POD_INVOICE_SHOW}`);
    }
  }
};

const getButtonText = (load: Load) => {
  const { bookedOrCompletedMatch, firstDropoffCrossedDropoffDate, completedMatch } = load;
  if (bookedOrCompletedMatch) {
    const { documents: { invoice, pod, tender } } = bookedOrCompletedMatch;
    // Complete
    if ((firstDropoffCrossedDropoffDate || completedMatch) && (
      // Complete (Invoice Rejected + No Tender Upload + No POD Upload)
      (invoice && invoice.rejected && !pod && !tender) ||
      // Complete (+ POD Accepted + Invoice Accepted + No Tender Upload)
      (pod && pod.rejected && !invoice) ||
      (pod && invoice && invoice.accepted && pod.accepted) ||
      (
        // Complete (+ POD Accepted + Invoice Accepted + No Tender Upload)
        pod && invoice && !tender &&
        pod.accepted && invoice.accepted))) {
      return 'Complete';
    }
    // Upload POD & Invoice
    if (!invoice && !pod) {
      return 'Upload POD & Invoice';
    }
    // Upload Invoice (Invoice not uploaded, POD Accepted) | Upload Invoice (Invoice not uploaded, POD not accepted)
    if ((!invoice && pod && (pod.accepted || pod.pending))) {
      return 'Upload Invoice';
    }
    // Upload POD (POD not uploaded, Invoice accepted) | Upload POD (POD not uploaded, Invoice not accepted)
    if ((!pod && (invoice && (invoice.accepted || invoice.pending)))) {
      return 'Upload POD';
    }
    if (pod && pod.rejected && invoice && invoice.rejected) {
      return 'POD & Invoice Rejected';
    }
    // POD Rejected
    if (pod && pod.rejected) {
      return 'POD Rejected';
    }
    // Invoice Rejected
    if (invoice && invoice.rejected) {
      return 'Invoice Rejected';
    }
    if (pod && invoice && pod.rejected && invoice.rejected) {
      return 'POD & Invoice Rejected';
    }
    if (pod && pod.rejected) {
      return 'Upload POD';
    }
    // Awaiting POD Acceptance
    if (pod && pod.pending) {
      return 'Awaiting POD Acceptance';
    }
    // Awaiting Invoice Acceptance
    if (invoice && invoice.pending) {
      return 'Awaiting Invoice Acceptance';
    }
    if (pod && invoice && invoice.accepted && pod.accepted) {
      return 'Documents Accepted';
    }
  }
  return 'Upload POD & Invoice';
};

const getButtonIcon = (load: Load) => {
  const buttonText = getButtonText(load);
  if (buttonText.toLocaleLowerCase().includes('awaiting')) {
    return Phone;
  }
  if (buttonText.toLocaleLowerCase().includes('complete')) {
    return Check;
  }
  return CloudUpload;
};

const awaiting = (load: Load) => getButtonText(load).toLocaleLowerCase().includes('awaiting');

const loading = (documentsStore: MatchDocumentsStore) => Boolean(documentsStore && (
  (documentsStore.invoice && documentsStore.invoice.loading) ||
  (documentsStore.pod && documentsStore.pod.loading)
));

const rejected = (documentsStore?: MatchDocumentsStore) => Boolean(documentsStore && (
  (documentsStore.invoice && documentsStore.invoice.rejected) ||
  (documentsStore.pod && documentsStore.pod.rejected)
));

const accepted = (documentsStore?: MatchDocumentsStore) => Boolean(documentsStore && (
  (documentsStore.invoice && documentsStore.invoice.accepted) &&
  (documentsStore.pod && documentsStore.pod.accepted)
));

interface IPODInvoiceButtonOwnProps {
  load: Load;
  blue?: boolean;
  showCallDialog?: () => void;
}

type IPODInvoiceButtonProps = IPODInvoiceButtonOwnProps & RouteComponentProps;

const PODInvoiceButton = observer(({ load, match, history, location, blue, showCallDialog }: IPODInvoiceButtonProps) => {
  const toggleDialog = toggleDialogHandler(match, location, history, load, showCallDialog);
  const { bookedOrCompletedMatch } = load;

  return (
    <>
      <FOCardActionListItem
        text={getButtonText(load)}
        color='primary'
        lightGreen={getButtonIcon(load) === Check}
        blue={blue}
        Icon={getButtonIcon(load)}
        variant='contained'
        onClick={toggleDialog(true)}
      />
      <FOFullPageDialog
        dialogTitle='Upload Documents'
        open={location.pathname.includes('podinvoice')}
        closeHandler={toggleDialog(false)}
        dialogActionContent={bookedOrCompletedMatch && (
          <PODInvoiceDialogActions
            onClickHandler={toggleDialog(false)}
            loading={loading(bookedOrCompletedMatch.documents)}
          />
        )}
      >
        {bookedOrCompletedMatch && bookedOrCompletedMatch.documents && (
          <PODInvoiceDialogContent
            matchDocumentsStore={bookedOrCompletedMatch.documents}
          />
        )}
      </FOFullPageDialog>
    </>
  );
});

export default withRouter(PODInvoiceButton);

