import React from 'react';
import NumberFormat from 'react-number-format';


interface IFOAmountFormat {
  value: string | number;
  currency: string;
  perMileRate?: boolean;
}

const FOAmountFormat = React.memo(({ value, currency, perMileRate }: IFOAmountFormat) => (
  <NumberFormat
    value={parseFloat(value)}
    displayType='text'
    prefix='$'
    suffix={` ${perMileRate ? '/mi' : currency}`}
    decimalScale={perMileRate ? 2 : 0}
    decimalSeparator={perMileRate ? '.' : ''}
    fixedDecimalScale={perMileRate}
    thousandSeparator
  />
));

export default FOAmountFormat;
