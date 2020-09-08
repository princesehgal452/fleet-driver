import React from 'react';
import classnames from 'classnames';
import { Avatar, Box, Grid } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import EQUIPMENT_TYPES from 'constants/EquipmentTypes';
import styles from './styles';

interface IEquipementTypePickerOwnProps {
  onChange?: Function;
  equipmentTypes: Array<string>;
  disabled: boolean;
}

interface IEquipementTypePickerState {
  equipmentTypes: Array<string>;
}

type IEquipementTypePickerProps = IEquipementTypePickerOwnProps & WithStyles<typeof styles>;

class EquipementTypePicker extends React.Component<IEquipementTypePickerProps, IEquipementTypePickerState> {
  constructor(props) {
    super(props);
    this.state = {
      equipmentTypes: props.equipmentTypes || [],
    };
  }

  handleClickItem = (value) => {
    const { equipmentTypes } = this.state;
    const { onChange, disabled } = this.props;
    if (disabled) {
      return;
    }
    const newEquipmentTypes = [...equipmentTypes];
    const index = newEquipmentTypes.indexOf(value);
    if (index > -1) {
      newEquipmentTypes.splice(index, 1);
    } else {
      newEquipmentTypes.push(value);
    }
    this.setState({ equipmentTypes: newEquipmentTypes });
    if (onChange) {
      onChange(newEquipmentTypes);
    }
  };

  renderEquipmentItem = (equipmentType) => {
    const { classes } = this.props;
    const { equipmentTypes } = this.state;
    const isSelected = equipmentTypes.includes(equipmentType.value);
    const icon = isSelected ? equipmentType.iconActive : equipmentType.icon;
    return (
      <Grid item xs={4} md={2} lg={2} key={equipmentType.value}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          className={classes.equipment}
          onClick={() => this.handleClickItem(equipmentType.value)}
        >
          <Avatar src={icon} className={classes.equipmentIcon} />
          <div
            className={
              classnames(
                classes.equipmentLabel,
                isSelected && classes.equipmentLabelActive,
              )
            }
          >
            {equipmentType.label}
          </div>
        </Box>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction='row'
        className={classes.root}
      >
        {EQUIPMENT_TYPES.map((equipmentType) => this.renderEquipmentItem(equipmentType))}
      </Grid>
    );
  }
}

export default withStyles(styles)(EquipementTypePicker);
