import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Switch, { SwitchProps } from '@material-ui/core/Switch';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 45,
    height: 32,
  },
  switchBase: {
    padding: 0,
    top: 10,
    left: 11,
    '&$checked': {
      transform: 'translateX(12px)',
    },
  },
  thumb: {
    width: 12,
    height: 12,
  },
  track: {
  },
  checked: {},
}));

type IFOSwitch = SwitchProps;

const FOSwitch = ({ ...props }: IFOSwitch) => {
  const classes = useStyles();

  return (
    <Switch {...props} classes={classes} color='primary' />
  );
};

export default FOSwitch;
