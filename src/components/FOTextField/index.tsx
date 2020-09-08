import React, { memo, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@material-ui/core';
import { Check } from '@material-ui/icons';


const FOTextField = memo(({
  input,
  label,
  helperText,
  helperTextClasses,
  meta: { touched, error, active },
  onKeyPress,
  InputProps,
  showCheck,
  ...custom
}) => {
  const textInput = useRef(null);

  const onAccept = useCallback((e) => {
    input.onBlur(e);
    textInput.current.blur();
  }, []);

  const onKeyPressHandler = useCallback((e) => {
    if (e.key === 'Enter') {
      onAccept(e);
    }
    onKeyPress && onKeyPress();
  }, []);

  const InputPropsHandler = useMemo(() => {
    if (showCheck && active) {
      return {
        ...InputProps,
        endAdornment: (
          <>
            {InputProps.endAdornment}
            <IconButton color='primary' onClick={onAccept}>
              <Check />
            </IconButton>
          </>
        ),
      };
    }
    return InputProps;
  }, [InputProps, showCheck, active]);

  return (
    <TextField
      label={label}
      error={touched && !!error}
      focused={active}
      inputRef={textInput}
      helperText={error ? (touched && error) : (helperText || '')}
      InputProps={InputPropsHandler}
      {...input}
      {...custom}
      onKeyPress={onKeyPressHandler}
      FormHelperTextProps={{ className: `${helperTextClasses}` }}
    />
  );
});

FOTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  helperTextClasses: PropTypes.object,
};

export default FOTextField;
