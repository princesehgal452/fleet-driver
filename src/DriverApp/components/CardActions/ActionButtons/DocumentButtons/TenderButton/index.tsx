import React from 'react';
import { observer } from 'mobx-react';
import { History, Location } from 'history';
import { saveAs } from 'file-saver';
import { match, RouteComponentProps, withRouter } from 'react-router-dom';
import { Phone, InsertDriveFileOutlined } from '@material-ui/icons';
import FOFullPageDialog from '../../../../../../components/FOFullPageDialog';
import Load from '../../../../../../models/dataStructures/Load';
import FOCardActionListItem from '../../../../../../components/FOCardActionListItem';
import DocumentButtonDialogContent from '../DocumentButtonDialogContent';
import { ROUTES } from '../../../../../../services/constants';
import DocumentButtonDialogActions from '../DocumentButtonDialogActions';


const toggleDialogHandler = (match: match, location: Location, history: History, load: Load, showCallDialog?: () => void) => (show: boolean) => async () => {
  const { bookedOrCompletedMatch, getLoadDetailsPath } = load;
  if (bookedOrCompletedMatch) {
    const { documents: { tender } } = bookedOrCompletedMatch;
    if (showCallDialog) {
      showCallDialog();
    }
    if (!tender) {
      return;
    }
    // If tender has rejected dont show this dialog.
    if (show && tender.rejected) {
      return;
    }
    // Prevent closing dialog when loading in progress
    if (!show && tender.loading) {
      return;
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
      setTimeout(history.push, 5, `${getLoadDetailsPath}/${ROUTES.TENDER_SHOW}`);
    }
    // If already in details page and then open immediately
    if (inDetailsPage && show) {
      history.push(`${getLoadDetailsPath}/${ROUTES.TENDER_SHOW}`);
    }
  }
};

const buttonAction = (action: 'accept' | 'reject' | 'download', match: match, location: Location, history: History, load: Load) => async () => {
  const { bookedOrCompletedMatch, rootStore: { matchStore: { reloadMatchResults }, snackbarStore: { enqueueSnackbarStore } } } = load;
  if (bookedOrCompletedMatch) {
    const { documents: { tender } } = bookedOrCompletedMatch;
    if (!tender) {
      return;
    }
    if (action === 'download' && tender.blob) {
      saveAs(tender.blob, `${bookedOrCompletedMatch.matchId}_${tender.documentKey}.${tender.type}`);
    } else {
      try {
        // When user goes to my loads page, he will re-download
        await tender.actionDocument(action);
        await reloadMatchResults();
        toggleDialogHandler(match, location, history, load)(false)();
        enqueueSnackbarStore(`Tender ${action}ed`, { variant: action === 'accept' ? 'success' : 'default' });
      } catch (error) {
      }
    }
  }
};

const getButtonText = (load: Load) => {
  const { bookedOrCompletedMatch } = load;
  if (bookedOrCompletedMatch) {
    const { documents: { tender } } = bookedOrCompletedMatch;
    if (tender) {
      if (tender.pending) {
        return 'View Tender';
      }
      if (tender.accepted) {
        return 'Download Tender';
      }
      if (tender.rejected) {
        return 'Awaiting New Tender';
      }
    }
  }
  return 'Awaiting Tender';
};

const getButtonIcon = (load: Load) => {
  const { bookedOrCompletedMatch } = load;
  if (bookedOrCompletedMatch) {
    const { documents: { tender } } = bookedOrCompletedMatch;
    if (tender) {
      if (tender.pending) {
        return InsertDriveFileOutlined;
      }
      if (tender.accepted) {
        return InsertDriveFileOutlined;
      }
      if (tender.rejected) {
        return Phone;
      }
    }
  }
  return Phone;
};

interface ITenderButtonOwnProps {
  load: Load;
  showCallDialog?: () => void;
}

type ITenderButtonProps = ITenderButtonOwnProps & RouteComponentProps;

const TenderButton = observer(({ load, match, history, location, showCallDialog }: ITenderButtonProps) => {
  const toggleDialog = toggleDialogHandler(match, location, history, load, showCallDialog);

  const { bookedOrCompletedMatch } = load;

  const accepted = Boolean(bookedOrCompletedMatch && bookedOrCompletedMatch.documents.tender && bookedOrCompletedMatch.documents.tender.accepted);
  const tenderLoading = Boolean(bookedOrCompletedMatch && bookedOrCompletedMatch.documents.tender && bookedOrCompletedMatch.documents.tender.loading);

  return (
    <>
      <FOCardActionListItem
        text={getButtonText(load)}
        Icon={getButtonIcon(load)}
        variant='contained'
        color='primary'
        onClick={toggleDialog(true)}
      />
      <FOFullPageDialog
        dialogTitle='Tender Documents'
        open={location.pathname.includes('tender')}
        closeHandler={toggleDialog(false)}
        dialogActionContent={bookedOrCompletedMatch && (
          <DocumentButtonDialogActions
            loading={tenderLoading}
            showDownload={accepted}
            onDownload={buttonAction('download', match, location, history, load)}
            onAccept={buttonAction('accept', match, location, history, load)}
            onReject={buttonAction('reject', match, location, history, load)}
          />
        )}
      >
        {bookedOrCompletedMatch && bookedOrCompletedMatch.documents.tender && (
          <DocumentButtonDialogContent
            document={bookedOrCompletedMatch.documents.tender}
          />
        )}
      </FOFullPageDialog>
    </>
  );
});

export default withRouter(TenderButton);
