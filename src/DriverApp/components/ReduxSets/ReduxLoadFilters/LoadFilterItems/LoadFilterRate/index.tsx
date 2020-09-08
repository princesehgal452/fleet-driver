import React, { memo, useCallback } from 'react';
import { Field } from 'redux-form';
import FOFiltersAccordion from 'components/FOFiltersAccordion';
import FOReduxSlider from 'components/FOReduxFields/FOReduxSlider';


const bottomLabels = ['$', '$/MILE'];
const max = 10;

const LoadFilterRate = memo(({ fieldName }) => {
  const valueLabelFormatHandler = useCallback((value) => {
    if (value === max) {
      return `${max}+`;
    }
    return value;
  }, []);

  return (
    <FOFiltersAccordion title='MINIMUM RATE'>
      <Field
        name={fieldName}
        component={FOReduxSlider}
        max={max}
        step={0.1}
        track='inverted'
        valueLabelFormat={valueLabelFormatHandler}
        valueLabelDisplay='on'
        bottomLabels={bottomLabels}
      />
    </FOFiltersAccordion>
  );
});

export default LoadFilterRate;
