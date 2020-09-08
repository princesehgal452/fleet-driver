import React, { useCallback } from 'react';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import ReduxDateSelector from 'DriverApp/components/ReduxSets/ReduxDateSelector';

interface ILoadDatePickerProps {
  dateField;
  onClose: () => void;
  staticPicker?: boolean;
}

const LoadDatePicker = observer(({ dateField, onClose, staticPicker }: ILoadDatePickerProps) => {
  return (
    <Grid container justify='center'>
      <Grid item>
        <ReduxDateSelector
          staticPicker={staticPicker}
          label='Select Date'
          dateField={dateField}
          onClose={onClose}
        />
      </Grid>
    </Grid>
  );
});

export default LoadDatePicker;
