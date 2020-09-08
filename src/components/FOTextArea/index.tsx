import React from 'react';
import TextField from '@material-ui/core/TextField';

const FOTextArea = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && !!error}
    helperText={touched && error}
    multiline
    rowsMax='6'
    {...input}
    {...custom}
  />
);

export default FOTextArea;
