import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const FOCheckField = ({ 
  className,
  input,
  label,
  name,
  ...custom
}) => (
  <FormControlLabel
    className={className}
    control={
      <Checkbox
        label={label}
        checked={input.value ? true : false}
        onChange={input.onChange}
        name={name}
        {...custom}
      />
    }
    label={label}
  />
);

FOCheckField.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
};

export default FOCheckField;
