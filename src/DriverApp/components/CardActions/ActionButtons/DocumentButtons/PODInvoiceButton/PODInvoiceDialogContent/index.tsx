import React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { DocumentKeys } from '../../../../../../../services/constants';
import FOUploadField from '../../../../../../../components/FOUploadField';
import MatchDocumentsStore from '../../../../../../../models/dataStructures/Match/MatchDocumentsStore';
import FOGrid from '../../../../../../../components/FOGrid';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
}));

const updateMatchPODInvoice = (matchDocumentsStore: MatchDocumentsStore) => async (label: DocumentKeys, file: File) => {
  let matchDocumentStore = matchDocumentsStore[label];
  if (!matchDocumentStore) {
    matchDocumentStore = matchDocumentsStore.addMatchDocumentStore(label);
  }
  if (matchDocumentStore) {
    await matchDocumentStore.uploadMatchDocument(file);
  }
};

const formName = 'matchPODInvoiceDocuments';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IPODInvoiceDialogContentOwnProps {
  matchDocumentsStore: MatchDocumentsStore;
}

type IPODInvoiceDialogContentProps = IPODInvoiceDialogContentOwnProps & InjectedFormProps;

const PODInvoiceDialogContent = observer(({ matchDocumentsStore }: IPODInvoiceDialogContentProps) => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <FOGrid spacing={1} hSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Please upload the following documents
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Let’s start by selecting each document listed below
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            component={FOUploadField}
            name={DocumentKeys.INVOICE}
            label="Invoice"
            fullWidth
            uploadDocumentAction={updateMatchPODInvoice(matchDocumentsStore)}
            prefilled={matchDocumentsStore.invoice && matchDocumentsStore.invoice.url}
            error={matchDocumentsStore.invoice && matchDocumentsStore.invoice.rejected}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={FOUploadField}
            name={DocumentKeys.POD}
            label="Proof of Delivery"
            fullWidth
            uploadDocumentAction={updateMatchPODInvoice(matchDocumentsStore)}
            prefilled={matchDocumentsStore.pod && matchDocumentsStore.pod.url}
            error={matchDocumentsStore.pod?.rejected}
          />
        </Grid>
      </FOGrid>
    </form>
  );
});

const PODInvoiceDialogContentForm = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(PODInvoiceDialogContent);

const PODInvoiceDialogContentFormConnect = connect(
  () => ({}),
  null,
  null,
  { forwardRef: true },
)(PODInvoiceDialogContentForm);

export default PODInvoiceDialogContentFormConnect;
