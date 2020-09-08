import React, { memo } from 'react';
import { Field } from 'redux-form';
import { InputAdornment } from '@material-ui/core';

import FOFiltersAccordion from 'components/v3/FOFiltersAccordion';
import FOTextField from 'components/v3/FOTextField';


const LoadFilterWeight = memo(({ fieldName }) => (
  <FOFiltersAccordion title='TOTAL WEIGHT'>
    <Field
      name={fieldName}
      component={FOTextField}
      label='Enter max weight'
      fullWidth
      variant='outlined'
      type='number'
      showCheck
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            lbs
          </InputAdornment>
        ),
      }}
    />
  </FOFiltersAccordion>
));

export default LoadFilterWeight;
