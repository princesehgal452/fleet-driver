import React, { RefObject, useEffect, useRef } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Send from '@material-ui/icons/Send';
import FOTextField from '../../../../components/FOTextField';
import { required, validateEmail } from '../../../../services/formValidations';


const formName = 'DocumentSendButtonEmailInput';

const dataHandler = (shareDocumentHandler: (email) => () => void) => (data) => {
  shareDocumentHandler(data.documentSendEmail)();
};

const InputPropsOptions = (handleSubmit, error, shareDocumentHandler: (email) => () => void, sendingDocuments) => ({
  endAdornment: (
    <InputAdornment position='end'>
      <IconButton
        color='primary'
        disabled={error || sendingDocuments}
        onClick={handleSubmit(dataHandler(shareDocumentHandler))}
      >
        {sendingDocuments ? <CircularProgress /> : <Send />}
      </IconButton>
    </InputAdornment>),
});

const setRefHandler = (fieldRefHandler: RefObject<HTMLDivElement>) => () => {
  fieldRefHandler.current && fieldRefHandler.current.focus();
};

interface IDocumentSendButtonEmailInputOwnProps {
  shareDocumentHandler: (email) => () => void;
  sendingDocuments: boolean;
}

type IDocumentSendButtonEmailInputProps = IDocumentSendButtonEmailInputOwnProps & InjectedFormProps;

const DocumentSendButtonEmailInput = ({ handleSubmit, invalid, sendingDocuments, shareDocumentHandler }: IDocumentSendButtonEmailInputProps) => {
  const textInput = useRef(null);
  useEffect(setRefHandler(textInput), []);

  return (
    <Field
      component={FOTextField}
      name='documentSendEmail'
      label='Enter An Email Address'
      variant='outlined'
      fullWidth
      inputRef={textInput}
      withRef
      disabled={sendingDocuments}
      InputProps={InputPropsOptions(handleSubmit, invalid, shareDocumentHandler, sendingDocuments)}
      validate={[required, validateEmail]}
    />
  );
};

const DocumentSendButtonEmailInputForm = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(DocumentSendButtonEmailInput);

const DocumentSendButtonEmailInputFormConnect = connect(
  () => ({}),
  {},
  null,
  { forwardRef: true },
)(DocumentSendButtonEmailInputForm);

export default DocumentSendButtonEmailInputFormConnect;
