import React, { memo } from 'react';
import classNames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles';
import Chip, { ChipProps } from '@material-ui/core/Chip';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 42,
    borderRadius: 30,
    maxWidth: 200,
  },
  backgroundInactive: (props) => ({
    backgroundColor: props.invertColors ? theme.palette.common.white : emphasize(theme.palette.primary.main, 0.04),
  }),
  colorInactive: (props) => ({
    color: props.invertColors ? theme.palette.grey.A700 : theme.palette.common.white,
  }),
  backgroundActive: (props) => ({
    backgroundColor: props.invertColors ? theme.palette.primary.main : theme.palette.common.white,
  }),
  colorActive: (props) => ({
    color: props.invertColors ? theme.palette.common.white : theme.palette.primary.main,
  }),
  icon: {
    width: 20,
  },
  clickable: {
    WebkitTapHighlightColor: 'transparent',
  },
  clickableInactive: (props) => ({
    '&:hover, &:focus': {
      backgroundColor: props.invertColors ? emphasize(theme.palette.common.white, 0.12) : emphasize(theme.palette.primary.main, 0.12),
    },
    '&:active': {
      backgroundColor: props.invertColors ? emphasize(theme.palette.common.white, 0.12) : emphasize(theme.palette.primary.main, 0.12),
    },
  }),
  clickableActive: (props) => ({
    '&:hover, &:focus': {
      backgroundColor: props.invertColors ? emphasize(theme.palette.primary.main, 0.04) : emphasize(theme.palette.common.white, 0.04),
    },
    '&:active': {
      backgroundColor: props.invertColors ? emphasize(theme.palette.primary.main, 0.04) : emphasize(theme.palette.common.white, 0.04),
    },
  }),
}));

interface IFilterHeaderChipOwnProps {
  onClick: () => void;
  active: boolean;
  invertColors?: boolean;
}

type IFilterHeaderChipProps = IFilterHeaderChipOwnProps & ChipProps;

const FilterHeaderChip = memo(({ onClick, active, invertColors, ...other }: IFilterHeaderChipProps) => {
  const classes = useStyles({ invertColors });
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
      onClick={onClick}
    />
  );
});

export default FilterHeaderChip;
