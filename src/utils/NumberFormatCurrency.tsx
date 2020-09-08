import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';


function NumberFormatCurrency(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      allowNegative={false}
      thousandSeparator
      prefix='$'
    />
  );
}

NumberFormatCurrency.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumberFormatCurrency;
