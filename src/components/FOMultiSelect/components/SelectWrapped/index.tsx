import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  chip: {
    margin: theme.spacing(0.25),
    backgroundColor: '#FFEAD2',
    border: '1px solid #F6851F',
    height: 28,
  },
});

class Option extends React.PureComponent {
  static propTypes = {
    option: PropTypes.any,
    children: PropTypes.node,
    isSelected: PropTypes.bool,
    isFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
  };

  handleClick = (event) => {
    const { onSelect, option } = this.props;
    onSelect(option, event);
  };

  render() {
    const {
      children, isFocused, isSelected, onFocus,
    } = this.props;


    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component='div'
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

const clearIcon = hideClearIcon => () => !hideClearIcon && <ClearIcon />;

const menuContainerStyle = menuPosition => (menuPosition === 'top' ? { top: 'auto', bottom: '100%' } : {});

function SelectWrapped(props) {
  const {
    classes, hideClearIcon, menuPosition, disabled, ...other
  } = props;
  return (
    <Select
      inputProps={{
        type: 'button',
        readOnly: true,
      }}
      optionComponent={Option}
      disabled={disabled}
      noResultsText={(
        <Typography>
          No results found
        </Typography>
      )}
      arrowRenderer={arrowProps => (arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
      clearRenderer={clearIcon(hideClearIcon)}
      menuContainerStyle={menuContainerStyle(menuPosition)}
      valueComponent={(valueProps) => {
        const { value, children, onRemove } = valueProps;
        const onDelete = (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!disabled) onRemove(value);
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
  hideClearIcon: PropTypes.bool,
  menuPosition: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(SelectWrapped);
