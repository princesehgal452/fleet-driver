import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Switch, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import TooltipPopover from '../TooltipPopover';


interface IPreferenceSwitchOwnProps {
  preferenceKey: string;
  title: string;
  description: string;
  loading?: boolean;
  switchState: boolean;
  onSwitchClick: (key: string, value: boolean) => void;
}

const switchClickHandler = (key: string, newSwitchState: boolean, onSwitchClick: (key: string, newSwitchState: boolean) => void) => () => onSwitchClick(key, newSwitchState);

type IPreferenceSwitchProps = IPreferenceSwitchOwnProps;

const PreferenceSwitch = observer(({ preferenceKey, title, description, loading, switchState, onSwitchClick }: IPreferenceSwitchProps) => (
  <Grid container alignItems='center'>
    <Grid item xs>
      <Grid container alignItems='center'>
        <Grid item>
          <Typography variant='caption'>
            {title}
          </Typography>
        </Grid>
        <TooltipPopover popupId='infoTooltip' variant='popover' tooltip={description}>
          <InfoIcon fontSize='small' />
        </TooltipPopover>
      </Grid>
    </Grid>
    <Grid item xs={2} container justify='flex-end'>
      <Switch
        color='primary'
        disabled={loading}
        onClick={switchClickHandler(preferenceKey, !switchState, onSwitchClick)}
        checked={switchState}
      />
    </Grid>
  </Grid>
));

export default PreferenceSwitch;
