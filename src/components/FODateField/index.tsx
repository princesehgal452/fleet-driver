import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateIcon from '@material-ui/icons/DateRange';
import { TextField } from '@material-ui/core';
import { getAppContainer } from '../../utils/utility';

class FODateField extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
  };

  handleDateChange = (setDialogClose) => (date) => {
    const { input } = this.props;
    input.onChange(date);
    setDialogClose();
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      renderInput,
      setDialogClose,
      ...custom
    } = this.props;
    return (
      <DatePicker
        label={label}
        clearable
        renderInput={renderInput || ((props) => <TextField {...props} />)}
        // handle clearing outside => pass plain array if you are not controlling value outside
        value={input.value || null}
        onChange={this.handleDateChange(setDialogClose)}
        error={touched && !!error}
        helperText={(touched && error) || ' '}
        {...custom}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <DateIcon />
            </InputAdornment>
          ),
        }}
        DialogProps={{
          container: getAppContainer
        }}
      />
    );
  }
}

export default FODateField;
