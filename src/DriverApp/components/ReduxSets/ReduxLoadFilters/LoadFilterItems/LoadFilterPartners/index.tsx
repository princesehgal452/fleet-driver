import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form';
import FOFiltersAccordion from 'components/FOFiltersAccordion';
import LoadFilterPartnerCard from './LoadFilterPartnersCard';


const LoadFilterPartners = memo(({ fieldName, options }) => {

  return (
    <FOFiltersAccordion title='PARTNERS'>
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item xs>
            <Field
              component={LoadFilterPartnerCard}
              name={fieldName}
              partner={option}
            />
          </Grid>
        ))}
      </Grid>
    </FOFiltersAccordion>
  );
});

export default LoadFilterPartners;
