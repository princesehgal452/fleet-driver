import React from 'react';
import { observer } from 'mobx-react';
import { Check } from '@material-ui/icons';
import Load from '../../../../../models/dataStructures/Load';
import { makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5, 1),
  },
}));

interface IMatchHelperText {
  load: Load;
}

const MatchHelperText = observer(({ load }: IMatchHelperText) => {
  const { completedMatch } = load;
  if (!completedMatch) {
    return null;
  }
  const classes = useStyles();
  const { documents: { invoice, pod } } = completedMatch;
  // Upload Invoice (Invoice not uploaded, POD Accepted)
  if (pod && pod.accepted && !invoice) {
    return <Typography color='primary' className={classes.root}><Check />&nbsp;POD Accepted</Typography>;
  }
  // Upload POD (POD not uploaded, Invoice accepted)
  if (!pod && invoice && invoice.accepted) {
    return <Typography color='primary' className={classes.root}><Check />&nbsp;Invoice Accepted</Typography>;
  }
  // POD Rejected | POD Rejected (No Tender Upload) | POD Rejected (Tender Not Accepted)
  if (pod && pod.rejected && invoice && invoice.pending) {
    return <Typography color='primary' className={classes.root}>Re-upload POD</Typography>;
  }
  // Invoice Rejected | Invoice Rejected (No Tender Upload) | Invoice Rejected (Tender Not Accepted)
  if (pod && pod.pending && invoice && invoice.rejected) {
    return <Typography color='primary' className={classes.root}>Re-upload POD</Typography>;
  }
  // POD & Invoice Rejected | POD & Invoice Rejected (No Tender Upload) | POD & Invoice Rejected (Tender Not Accepted)
  if (pod && invoice && pod.rejected && invoice.rejected) {
    return <Typography color='primary' className={classes.root}>Re-upload</Typography>;
  }
  // Invoice Rejected (POD Accepted) | Invoice Rejected (POD Accepted + No Tender Upload) | Invoice Rejected (POD Accepted + Tender Not Accepted)
  if (pod && invoice && pod.accepted && invoice.rejected) {
    return <Typography color='primary' className={classes.root}>Re-upload Invoice - POD Accepted</Typography>;
  }
  // POD Rejected (Invoice Accepted) | POD Rejected (Invoice Accepted + No Tender Upload) | POD Rejected (Invoice Accepted + Tender Not Accepted)
  if (pod && invoice && pod.rejected && invoice.accepted) {
    return <Typography color='primary' className={classes.root}>Re-upload POD - Invoice Accepted</Typography>;
  }
  // POD Rejected (No Invoice Uploaded) | POD Rejected (No Invoice Uploaded, No Tender Uploaded) | POD Rejected (Invoice Not Uploaded, Tender Not Accepted)
  if (pod && !invoice && pod.rejected) {
    return <Typography color='primary' className={classes.root}>Re-upload POD - Upload Invoice</Typography>;
  }
  // Invoice Rejected (No POD Uploaded) | Complete (Invoice Rejected + No Tender Upload + No POD Upload) | Invoice Rejected (POD Not Uploaded, Tender Not Accepted)
  if (!pod && invoice && invoice.rejected) {
    return <Typography color='primary' className={classes.root}>Re-upload Invoice - Upload POD</Typography>;
  }
  return null;
});

export default MatchHelperText;
