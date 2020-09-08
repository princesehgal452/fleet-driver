import React, { useState, useRef } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import { observer } from 'mobx-react';
import PhoneNumberInput from 'components/v3/Form/PhoneNumberInput';
import EditIconButton from './EditIconButton';
import styles from './styles';

interface ITextFieldComponentOwnProps {
  field: any;
  onSave?: (Field) => void;
  phoneNumber?: boolean;
  editable?: boolean;
}

export type ITextFieldComponentProps = ITextFieldComponentOwnProps & TextFieldProps & WithStyles<typeof styles>;


const TextFieldComponent = observer(({ field, phoneNumber, editable = false, error, onSave, onChange, InputProps, classes, ...custom }: ITextFieldComponentProps) => {
  const [editing, setEditing] = useState(!editable);
  const { error: errorField, helperText } = field;
  const errorValue = errorField || error;
  const textInput = useRef<HTMLDivElement>(null);
  const inputComponent = phoneNumber ? PhoneNumberInput : undefined;
  const toggleEditing = () => {
    if (onSave && editing) {
      onSave(field);
    } else {
      setImmediate(() => {
        if (textInput && textInput.current) {
          textInput.current.focus();
        }
      });
    }
    setEditing(!editing);
  };
  const helperTextValue = errorValue ? (errorValue || ' ') : (helperText || ' ');
  const required = Boolean(field.rules && field.rules.includes('required'));
  return (
    <TextField
      {...field.bind({ onChange: onChange || field.onChange })}
      disabled={!editing}
      InputLabelProps={{
        classes: {
          asterisk: classes.labelAsterisk,
        },
      }}
      InputProps={{
        ...InputProps,
        inputComponent,
        endAdornment: (
          <InputAdornment position='end'>
            {InputProps?.endAdornment}
            {editable && (
              <EditIconButton
                editing={editing}
                onClick={toggleEditing}
              />
            )}
          </InputAdornment>
        ),
        classes: {
          root: classes.root,
          disabled: classes.disabled,
          underline: classes.underline,
        },
      }}
      inputRef={textInput}
      error={Boolean(errorValue)}
      helperText={helperTextValue}
      fullWidth
      required={required}
      {...custom}
    />
  );
});


export default withStyles(styles)(TextFieldComponent);
