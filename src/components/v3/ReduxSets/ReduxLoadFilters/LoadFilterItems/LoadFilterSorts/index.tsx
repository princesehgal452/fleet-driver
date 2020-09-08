import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form';
import FOFiltersAccordion from 'components/v3/FOFiltersAccordion';
import LoadFilterSorts from './LoadFilterSorts';


const LoadFilterPartners = memo(({ input, fieldName, options }) => {

  return (
    <FOFiltersAccordion title='PARTNERS'>
      <Grid container spacing={2}>
        {options.map((partner) => (
          <Grid item xs>
            <Field
              component={LoadFilterSorts}
              name={fieldName}
              partner={partner}
            />
          </Grid>
        ))}
      </Grid>
    </FOFiltersAccordion>
  );
});

export default LoadFilterPartners;
