import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { match, RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Send from '@material-ui/icons/Send';
import DocumentSendButtonEmailInput from './DocumentSendButtonEmailInput';
import { UserStore } from '../../store/UserStore';
import DocumentUploadDialog from './DocumentUploadDialog';
import { ROUTES } from '../../../services/constants';


const setStateTrue = (setStateHandler: Dispatch<SetStateAction<boolean>>) => () => {
  setStateHandler(true);
};

const setStateFalse = (setStateHandler: Dispatch<SetStateAction<boolean>>) => () => {
  setStateHandler(false);
};

const shareDocumentHandler = (shareDocument: (email) => void, setSendingDocuments: Dispatch<SetStateAction<boolean>>) => (email: string) => async () => {
  setSendingDocuments(true);
  await shareDocument(email);
  setSendingDocuments(false);
};

const setShowUploadTrue = (history: History, match: match, { isWebview, queryEmail, queryAuthToken }: UserStore) => () => {
  if (isWebview) {
    window.open(`${match.url}/${ROUTES.DOCUMENTS_SHOW}?email=${queryEmail}&authToken=${queryAuthToken}`);
  } else {
    history.push(`${match.url}/${ROUTES.DOCUMENTS_SHOW}`);
  }
};
const setShowUploadFalse = (history: History, match: match) => () => (history.length < 2) ? history.push(match.url) : history.back();

interface IDocumentSendButtonOwnProps {
  email?: string;
  sendText: string;
  userStore: UserStore;
  showSend?: boolean;
}

type IDocumentSendButtonProps = IDocumentSendButtonOwnProps & RouteComponentProps;

const DocumentSendButton = memo(({ email, sendText, userStore, showSend, location, history, match }: IDocumentSendButtonProps) => {
  const { FOUser: { documents }, shareDocuments } = userStore;
  const [confirmSend, setConfirmSend] = useState(false);
  const [sendingDocuments, setSendingDocuments] = useState(false);

  const showUploadDocuments = location.pathname.includes(ROUTES.DOCUMENTS_SHOW);

  return (
    <div>
      <Flipper flipKey={confirmSend}>
        {(confirmSend || showSend) ? (email
            ? (
              <Flipped flipId='documentSendButton'>
                <Button
                  color='primary'
                  variant='outlined'
                  fullWidth
                  disabled={sendingDocuments}
                  onClick={shareDocumentHandler(shareDocuments, setSendingDocuments)(email)}
                >
                  <Flipped inverseFlipId='documentSendButton' translate>
                    <Grid container spacing={1} alignItems='center' justify='space-between'>
                      <Grid item>
                        {sendingDocuments ? <CircularProgress size={24} color='primary' /> : email}
                      </Grid>
                      <Send />
                    </Grid>
                  </Flipped>
                </Button>
              </Flipped>
            ) : (
              <Flipped flipId='documentSendButton'>
                <div>
                  <DocumentSendButtonEmailInput
                    shareDocumentHandler={shareDocumentHandler(shareDocuments, setSendingDocuments)}
                    sendingDocuments={sendingDocuments}
                  />
                </div>
              </Flipped>
            )
        ) : (
          <Flipped flipId='documentSendButton'>
            <Button
              color='primary'
              variant='contained'
              onClick={documents ? setStateTrue(setConfirmSend) : setShowUploadTrue(history, match, userStore)}
              fullWidth
            >
              <Flipped inverseFlipId='documentSendButton' translate>
                <div>
                  {documents ? sendText : 'Upload documents'}
                </div>
              </Flipped>
            </Button>
          </Flipped>
        )}
      </Flipper>
      <DocumentUploadDialog open={showUploadDocuments} closeHandler={setShowUploadFalse(history, match)} />
    </div>
  );
});

export default withRouter(DocumentSendButton);
