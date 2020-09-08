import React, { useEffect } from 'react';
import FileViewer from 'react-file-viewer';
import { observer } from 'mobx-react';
import { CircularProgress, DialogContent, makeStyles } from '@material-ui/core';
import MatchDocumentStore from '../../../../../../models/dataStructures/Match/MatchDocumentsStore/MatchDocumentStore';


const downloadDocumentHandler = (downloadDocument: () => void) => () => {
  downloadDocument();
};

const useStyles = makeStyles({
  fileViewer: {
    '& .pg-viewer-wrapper': {
      overflowY: 'unset',
    },
  },
});

interface IDocumentButtonDialogContentProps {
  document: MatchDocumentStore;
}

const DocumentButtonDialogContent = observer(({ document: { hasDocument, objectURL, type, loading, downloadDocument } }: IDocumentButtonDialogContentProps) => {
  const classes = useStyles();

  useEffect(downloadDocumentHandler(downloadDocument), []);
  return (
    <DialogContent>
      {loading && <CircularProgress />}
      {hasDocument && (
        <div className={classes.fileViewer}>
          <FileViewer
            fileType={type}
            filePath={objectURL}
            errorComponent={<div>Error</div>}
          />
        </div>
      )}
    </DialogContent>
  );
});

export default DocumentButtonDialogContent;
