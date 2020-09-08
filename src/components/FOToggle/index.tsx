import React, { memo } from 'react';
import classNames from 'classnames';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton, { ToggleButtonProps } from '@material-ui/lab/ToggleButton';
import { darken } from '@material-ui/core/styles/colorManipulator';


const FOToggleButtonStyles = (theme: Theme) => ({
  root: {
    backgroundColor: '#282828 !important',
    color: '#fff  !important',
    '&:hover': {
      backgroundColor: '#161616  !important',
    },
    padding: '2px 6px  !important',
    height: '27px !important',
  },
  rootPrimary: {
    backgroundColor: `${theme.palette.grey['200']} !important`,
    color: `${theme.palette.getContrastText(theme.palette.grey['200'])} !important`,
    '&:hover': {
      backgroundColor: `${darken(theme.palette.grey.A100, 0.05)} !important`,
    },
  },
  selected: {
    backgroundColor: '#fff !important',
    color: '#282828 !important',
    '&:hover': {
      backgroundColor: '#f8f8f8 !important',
    },
    '&::after': {
      backgroundColor: 'initial !important',
    },
  },
  selectedPrimary: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.common.white} !important`,
    '&:hover': {
      backgroundColor: `${darken(theme.palette.primary.main, 0.1)} !important`,
    },
  },
});

interface IFOToggleButtonWrapperOwnProps {
  color?: 'primary';
  variant?: 'rounded';
}

type IFOToggleButtonWrapperProps =
  IFOToggleButtonWrapperOwnProps
  & ToggleButtonProps
  & WithStyles<typeof FOToggleButtonStyles>;

const FOToggleButtonWrapper = memo(({ classes, color, variant, children, ...otherProps }: IFOToggleButtonWrapperProps) => (
  <ToggleButton
    classes={{
      root: classNames(classes.root, {
        [classes.rootPrimary]: color === 'primary',
      }),
      selected: classNames(classes.selected, {
        [classes.selectedPrimary]: color === 'primary',
      }),
    }}
    {...otherProps}
  >
    {children}
  </ToggleButton>
));

const FOToggleButtonGroupStyles = (theme: Theme) => ({
  root: {
    // border: '0.75px solid #979797',
  },
  rootGutter: {
    marginTop: `${theme.spacing(1)}px !important`,
    marginBottom: `${theme.spacing(1)}px !important `,
  },
});

interface IFOToggleButtonGroupWrapperOwnProps {
  color?: 'primary';
  variant?: 'rounded';
  gutter?: boolean;
}

type IFOToggleButtonGroupWrapper =
  IFOToggleButtonGroupWrapperOwnProps
  & ToggleButtonGroupProps
  & WithStyles<typeof FOToggleButtonGroupStyles>;

const FOToggleButtonGroupWrapper = memo(({ classes, color, variant, gutter, children, ...otherProps }: IFOToggleButtonGroupWrapper) => (
  <ToggleButtonGroup
    classes={{
      root: classNames(classes.root, {
        [classes.rootGutter]: gutter,
      }),
    }}
    {...otherProps}
  >
    {children}
  </ToggleButtonGroup>
));

export const FOToggleButton = withStyles(FOToggleButtonStyles)(FOToggleButtonWrapper);
export const FOToggleButtonGroup = withStyles(FOToggleButtonGroupStyles)(FOToggleButtonGroupWrapper);
