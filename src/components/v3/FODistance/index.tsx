import React, { memo } from 'react';
import NumberFormat from 'react-number-format';


interface IFODistance {
  distance?: number;
  unit?: string;
}

const FODistance = memo(({ distance, unit = 'mi' }: IFODistance) => (
  distance ? (
    <>
      <NumberFormat value={distance} displayType='text' thousandSeparator decimalScale={0} /> {unit}
    </>
  ) : (<>-</>)));

export default FODistance;
