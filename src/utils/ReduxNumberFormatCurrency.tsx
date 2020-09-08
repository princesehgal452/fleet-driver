import React, { RefObject } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';


interface IReduxNumberFormatCurrency {
  inputRef: RefObject<NumberFormat>;
  onChange: Function;
}

class ReduxNumberFormatCurrency extends React.PureComponent<IReduxNumberFormatCurrency> {
  onChangeHandler = ({ value }: NumberFormatValues) => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { inputRef, onChange, ...other } = this.props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={this.onChangeHandler}
        thousandSeparator
        allowNegative={false}
      />
    );
  }
}

export default ReduxNumberFormatCurrency;
