import React, { memo } from 'react';
import { Field } from 'redux-form';
import DistanceFilters from '../../DistanceFilters';


interface IProps {
  invertColors?: boolean;
}

const DistanceFiltersField = memo(({ invertColors }: IProps) => (
  <Field
    component={DistanceFilters}
    name='laneSize'
    props={{ invertColors }}
  />
));

export default DistanceFiltersField;
