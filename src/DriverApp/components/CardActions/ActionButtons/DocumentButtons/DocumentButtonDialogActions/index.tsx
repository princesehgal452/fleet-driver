import React from 'react';
import { observer } from 'mobx-react';
import { Button, Grid } from '@material-ui/core';


interface IDocumentButtonDialogActionsProps {
  loading: boolean;
  showDownload: boolean;
  onAccept: () => void;
  onReject: () => void;
  onDownload: () => void;
}

const DocumentButtonDialogActions = observer(({ loading, showDownload, onAccept, onReject, onDownload }: IDocumentButtonDialogActionsProps) => (
  <Grid container justify='flex-end' spacing={1}>
    {showDownload ? (
      <Grid item xs={12} md='auto'>
        <Button variant='contained' color='primary' onClick={onDownload} fullWidth>Download Tender</Button>
      </Grid>
    ) : (
      <>
        <Grid item xs md='auto'>
          <Button variant='outlined' onClick={onReject} disabled={loading} fullWidth>Reject Tender</Button>
        </Grid>
        <Grid item xs md='auto'>
          <Button variant='contained' color='primary' onClick={onAccept} disabled={loading} fullWidth>
            Accept Tender
          </Button>
        </Grid>
      </>
    )}
  </Grid>
));

export default DocumentButtonDialogActions;
