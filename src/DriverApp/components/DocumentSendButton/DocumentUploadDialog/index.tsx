import React, { memo } from 'react';
import { Dialog } from '@material-ui/core';
import DocumentsUploadDialogContent from '../DocumentsUploadDialogContent';
import FOTransitionUp from '../../../../components/FOTransitionUp';
import { getAppContainer } from '../../../../utils/utility';


interface IDocumentUploadDialogOwnProps {
  open: boolean;
  closeHandler: () => void;
}

type IDocumentUploadDialogProps = IDocumentUploadDialogOwnProps;

const DocumentUploadDialog = memo(({ open, closeHandler }: IDocumentUploadDialogProps) => (
  <Dialog open={open} fullScreen TransitionComponent={FOTransitionUp} container={getAppContainer}>
    <DocumentsUploadDialogContent closeHandler={closeHandler} />
  </Dialog>
));

export default DocumentUploadDialog;
