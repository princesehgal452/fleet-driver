import React, { memo, RefObject } from 'react';
import NumberFormat from 'react-number-format';

interface IPhoneNumberInputProps {
  inputRef: RefObject<NumberFormat>;
  onChange: Function;
}

const onValueChangeHandler = (onChange) => (values) => {
  onChange({
    target: {
      value: values.value,
    },
  });
};

const PhoneNumberInput = memo(({ inputRef, onChange, ...other }: IPhoneNumberInputProps) => (
  <NumberFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={onValueChangeHandler(onChange)}
    type='tel'
    format='+1 (###) ### ####'
  />
));

export default PhoneNumberInput;
