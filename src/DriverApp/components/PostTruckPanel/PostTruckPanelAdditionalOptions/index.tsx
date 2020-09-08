import React, { memo } from 'react';
import { Field } from 'redux-form';
import { Grid, InputAdornment } from '@material-ui/core';
import FOMultiSelect from '../../../../components/FOMultiSelect';
import FODateField from '../../../../components/FODateField';
import FOTextField from '../../../../components/FOTextField';
import ReduxNumberFormatCurrency from '../../../../utils/ReduxNumberFormatCurrency';
import { SubmitClearLocation } from '../../LocationPanel/SubmitClearLocation';
import { MILES_TYPES, TRUCKS_EQUIPMENT_TYPES } from '../../../../services/constants';


interface IPostTruckPanelAdditionalOptionsProps {
  clearValues: () => void;
  minDate?: Date;
  validateDates: (event, newValue) => void;
  pristine: boolean;
  submitting?: boolean;
  loading: boolean;
  fullRowFields?: boolean;
}

const PostTruckPanelAdditionalOptions = memo(({
  clearValues, minDate, validateDates, submitting, loading, pristine, fullRowFields,
}: IPostTruckPanelAdditionalOptionsProps) => (
  <Grid
    container
    spacing={1}
    className='input-section post-truck-panel post-truck-panel__details'
  >
    <Grid item xs={12} className='details-col'>
      <Field
        component={FOMultiSelect}
        className='input-field'
        name='equipmentTypeList'
        label='Equipment(s)'
        fullWidth
        multi
        native='true'
        options={TRUCKS_EQUIPMENT_TYPES}
        hideClearIcon
      />
    </Grid>
    <Grid item xs={fullRowFields ? 12 : 6} className='details-col'>
      <Field
        component={FODateField}
        className='input-field'
        name='availableDate'
        label='Available Date'
        minDate={new Date()}
        onChange={validateDates}
        invalidLabel=''
        fullWidth
        disableOpenOnEnter
        animateYearScrolling={false}
      />
    </Grid>
    <Grid item xs={fullRowFields ? 12 : 6} className='details-col'>
      <Field
        component={FODateField}
        className='input-field'
        name='expiresOn'
        label='Expires On'
        minDate={minDate || new Date()}
        invalidLabel=''
        fullWidth
        disableOpenOnEnter
        animateYearScrolling={false}
      />
    </Grid>
    <Grid item xs={fullRowFields ? 12 : 6} md={fullRowFields ? 12 : 4} className='details-col'>
      <Field
        component={FOMultiSelect}
        className='input-field'
        name='radius'
        label='Deadhead'
        // menuPosition='top'
        fullWidth
        adornments={{
          endAdornment: (
            <InputAdornment position='end'>
              Miles
            </InputAdornment>),
        }}
        options={MILES_TYPES}
        hideClearIcon
      />
    </Grid>
    <Grid item xs={fullRowFields ? 12 : 6} md={fullRowFields ? 12 : 4} className='details-col'>
      <Field
        component={FOTextField}
        className='input-field'
        name='perMileRate'
        label='Rate'
        InputProps={{
          inputComponent: ReduxNumberFormatCurrency,
          endAdornment: (
            <InputAdornment position='end'>
              $/Mile
            </InputAdornment>),
        }}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} md={fullRowFields ? 12 : 4}>
      <SubmitClearLocation
        clearValues={clearValues}
        pristine={pristine}
        submitting={submitting}
        loading={loading}
        buttonLabel='Send Request'
      />
    </Grid>
  </Grid>
));

export default PostTruckPanelAdditionalOptions;
