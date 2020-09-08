import React, { memo } from 'react';
import NumberFormat from 'react-number-format';


const NumberFormatPhone = memo((props) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange(values.value);
      }}
      format='+1 (###) ### ####'
    />
  );
});

export default NumberFormatPhone;
