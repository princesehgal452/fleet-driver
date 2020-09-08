import React, { useCallback } from 'react';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import ReduxDateSelector from 'components/v3/ReduxSets/ReduxDateSelector';

interface ILoadDatePickerProps {
  dateField;
  onClose: () => void;
  staticPicker?: boolean;
  disableReselect?: boolean;
}

const LoadDatePicker = observer(({ dateField, onClose, staticPicker, disableReselect }: ILoadDatePickerProps) => {
  return (
    <Grid container justify='center'>
      <Grid item>
        <ReduxDateSelector
          staticPicker={staticPicker}
          label='Select Date'
          dateField={dateField}
          onClose={onClose}
          disableReselect={disableReselect}
        />
      </Grid>
    </Grid>
  );
});

export default LoadDatePicker;
