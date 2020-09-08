import React, { ComponentType, ReactElement, ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import { darken, lighten } from '@material-ui/core/styles';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import classNames from 'classnames';
import { IDriverAppStore } from '../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../DriverApp/store/DriverAppStore';


const useStyles = makeStyles((theme: Theme) => ({
  button: props => ({
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
    minHeight: FOCardActionListItemButtonHeight - theme.spacing(1),
    boxShadow: 'unset',
    // border: 0,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
    '&:hover': {
      boxShadow: 'unset',
    },
    borderColor: props.isGeotab ? theme.palette.secondary.main : 'inherit',
  }),
  lightGreen: props => ({
    backgroundColor: props.isGeotab ? lighten(theme.palette.primary.light, 0.6) : '#C7FCD7',
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: props.isGeotab ? theme.palette.primary.light : darken('#C7FCD7', 0.1)
    },
    '&:focus': {
      backgroundColor: props.isGeotab ? lighten(theme.palette.primary.light, 0.8) : lighten('#C7FCD7', 0.01),
    }
  }),
  yellow: {
    backgroundColor: '#FFE4B6',
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: darken('#FFE4B6', 0.1),
    },
    '&:focus': {
      backgroundColor: lighten('#FFE4B6', 0.01),
    },
  },
  blue: {
    backgroundColor: '#A8DEF6',
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: darken('#A8DEF6', 0.1),
    },
    '&:focus': {
      backgroundColor: lighten('#A8DEF6', 0.01),
    },
  },
  red: {
    backgroundColor: '#FDE2E9',
    color: '#FA3A2F',
    '&:hover': {
      backgroundColor: darken('#FDE2E9', 0.1),
    },
    '&:focus': {
      backgroundColor: lighten('#FDE2E9', 0.01),
    },
  },
}));

export const FOCardActionListItemButtonHeight = 58;

const onClickHandler = (onClickFunction?: Function) => () => {
  onClickFunction && onClickFunction();
};

interface ICardButtonOwnProps {
  onClick?: Function;
  Icon?: ComponentType;
  text: ReactNode;
  disabled?: boolean;
  lightGreen?: boolean;
  yellow?: boolean;
  blue?: boolean;
  red?: boolean;
}

type ICardButtonProps = ICardButtonOwnProps & ButtonProps & IDriverAppStore;

const FOCardActionListItem = inject('driverAppStore')(observer(({ Icon, text, disabled, onClick, color, variant, lightGreen, yellow, blue, red, driverAppStore }: ICardButtonProps) => {
  const { configStore: { isGeotab } } = driverAppStore as DriverAppStore;
  const classes = useStyles({ isGeotab });

  return (
    <Button
      onClick={onClickHandler(onClick)}
      color={lightGreen ? 'inherit' : color}
      variant={variant}
      fullWidth
      className={classNames(classes.button, {
        [classes.lightGreen]: lightGreen,
        [classes.yellow]: yellow,
        [classes.blue]: blue,
        [classes.red]: red,
      })}
    >
      {Icon && <Icon />}&nbsp;{text}
    </Button>
  );
}));

export default FOCardActionListItem;
