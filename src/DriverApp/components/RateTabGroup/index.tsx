import React from 'react';
import { observer } from 'mobx-react';
import { FOToggleButton, FOToggleButtonGroup } from '../../../components/FOToggle';


const onToggle = (value: number, onClick: Function) => () => onClick(value);

interface IRateTabGroup {
  value: number;
  onClick: Function;
  color?: 'primary';
  variant?: 'rounded';
  gutter?: boolean;
}

const RateTabGroup = observer(({ value, color, variant, gutter, onClick }: IRateTabGroup) => (
  <FOToggleButtonGroup value={value} color={color} variant={variant} gutter>
    <FOToggleButton value={0} color={color} variant={variant} onClick={onToggle(0, onClick)}>
      Flat Rate
    </FOToggleButton>
    <FOToggleButton value={1} color={color} variant={variant} onClick={onToggle(1, onClick)}>
      Rate Per Mile
    </FOToggleButton>
  </FOToggleButtonGroup>
));

export default RateTabGroup;
