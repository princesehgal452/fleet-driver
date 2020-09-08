import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
// import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import './SelectWrapped.scss';


const styles = theme => ({
  root: {
    flexGrow: 2,
    height: 250,
  },
  chip: {
    margin: theme.spacing(0.25),
    backgroundColor: '#FFEAD2',
    border: '1px solid #F6851F',
    height: 28,
  },
});

class Option extends React.Component {
  static propTypes = {
    option: PropTypes.any,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
  };

  handleChange = (event) => {
    event.preventDefault();
    const { onSelect, option } = this.props;
    onSelect(option, event);
  };

  renderOption = () => {
    const { option, isSelected } = this.props;
    return (
      <FormControlLabel
        className='col-checkbox'
        control={(
          <Checkbox
            checked={isSelected}
            onChange={this.handleChange}
            onTouchEnd={this.handleChange}
            value={option.value}
          />
        )}
        onClick={this.handleChange}
        onTouchEnd={this.handleChange}
        label={option.label}
      />
    );
  };

  render() {
    return (
      <div className='popover-container'>
        {this.renderOption()}
      </div>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;
  return (
    <Select
      optionComponent={Option}
      noResultsText={(
        <Typography>
          No results found
        </Typography>
      )}
      arrowRenderer={arrowProps => (arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
      clearRenderer={() => <ClearIcon />}
      valueComponent={(valueProps) => {
        const { value, children, onRemove } = valueProps;
        const onDelete = (event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };
        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }
        return (
          <div className='Select-value'>
            {children}
          </div>
        );
      }}
      {...other}
    />
  );
}

SelectWrapped.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SelectWrapped);
