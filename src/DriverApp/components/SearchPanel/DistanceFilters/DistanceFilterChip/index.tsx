import React, { memo } from 'react';
import classNames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import { WrappedFieldInputProps } from 'redux-form';
import { inject, observer } from 'mobx-react';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../../store/DriverAppStore';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 200,
  },
  backgroundInactive: props => ({
    backgroundColor: props.invertColors ? emphasize(theme.palette.common.white, 0.04) : (props.isGeotab ? emphasize(theme.palette.secondary.main, 0.02) : emphasize(theme.palette.primary.main, 0.04)),
  }),
  colorInactive: props => ({
    color: props.invertColors ? (props.isGeotab ? theme.palette.secondary.main : theme.palette.primary.main) : theme.palette.common.white,
  }),
  backgroundActive: props => ({
    backgroundColor: props.invertColors ? (props.isGeotab ? theme.palette.secondary.main : theme.palette.primary.main) : theme.palette.common.white,
  }),
  colorActive: props => ({
    color: props.invertColors ? theme.palette.common.white : (props.isGeotab ? theme.palette.secondary.main : theme.palette.primary.main),
  }),
  icon: {
    width: 20,
  },
  clickable: {
    WebkitTapHighlightColor: 'transparent',
  },
  clickableInactive: props => ({
    '&:hover, &:focus': {
      backgroundColor: props.invertColors ? emphasize(theme.palette.common.white, 0.12) : (props.isGeotab ? emphasize(theme.palette.secondary.main, 0.12) : emphasize(theme.palette.primary.main, 0.12)),
    },
    '&:active': {
      backgroundColor: props.invertColors ? emphasize(theme.palette.common.white, 0.12) : (props.isGeotab ? emphasize(theme.palette.secondary.main, 0.12) : emphasize(theme.palette.primary.main, 0.12)),
    },
  }),
  clickableActive: props => ({
    '&:hover, &:focus': {
      backgroundColor: props.invertColors ? (props.isGeotab ? emphasize(theme.palette.secondary.main, 0.02): emphasize(theme.palette.primary.main, 0.04)) : emphasize(theme.palette.common.white, 0.04),
    },
    '&:active': {
      backgroundColor: props.invertColors ? (props.isGeotab ? emphasize(theme.palette.secondary.main, 0.02): emphasize(theme.palette.primary.main, 0.04)) : emphasize(theme.palette.common.white, 0.04),
    },
  }),
}));

const onClickHandler = (input: WrappedFieldInputProps, value: string) => () => input.onChange(value);

interface IDistanceFilterChipOwnProps {
  active?: boolean;
  input: WrappedFieldInputProps;
  value: string;
  invertColors?: boolean;
}

type IDistanceFilterChipProps = IDistanceFilterChipOwnProps & ChipProps & IDriverAppStore;

const DistanceFilterChip = inject('driverAppStore')(observer(({ driverAppStore, input, value, invertColors, ...other }: IDistanceFilterChipProps) => {
  const active = value === input.value;
  const { configStore : { isGeotab } } = driverAppStore as DriverAppStore;
  const classes = useStyles({ invertColors, isGeotab});

  return (
    <Chip
      classes={{
        root: classNames(classes.root, classes.backgroundInactive, classes.colorInactive, {
          [classes.backgroundActive]: active,
          [classes.colorActive]: active,
        }),
        icon: classNames(classes.icon, classes.colorInactive, {
          [classes.colorActive]: active,
        }),
        clickable: classNames(classes.clickable, classes.clickableInactive, {
          [classes.clickableActive]: active,
        }),
      }}
      clickable
      {...other}
      onClick={onClickHandler(input, active ? '' : value)}
    />
  );
}));

export default DistanceFilterChip;
