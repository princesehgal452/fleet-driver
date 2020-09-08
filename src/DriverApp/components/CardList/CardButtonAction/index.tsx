import React, { ComponentType } from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';


const onClickHandler = (onClickFunction: Function) => () => {
  onClickFunction();
};

const styles = (theme: Theme) => ({
  root: {
    padding: '10px 20px !important',
  },
  icon: {
    margin: 0,
  },
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
});

interface ICardButtonProps {
  onClick: Function;
  Icon: ComponentType;
  text: string;
  active: boolean;
  disabled: boolean;
  color: 'primary' | 'secondary' | 'tertiary';
}

const CardButtonAction = observer(({ Icon, text, active, disabled, onClick, color, classes }:
                               (ICardButtonProps & WithStyles<typeof styles>)) => (
  <ListItem button className={classes.root} disabled={disabled} onClick={onClickHandler(onClick)}>
    <ListItemIcon
      className={classNames(classes.icon, {
        [classes.primary]: color === 'primary',
        [classes.secondary]: color === 'secondary',
        [classes.tertiary]: color === 'tertiary',
      })}
    >
      <Icon />
    </ListItemIcon>
    <ListItemText
      primary={text}
      classes={{
        primary: classNames({
          [classes.primary]: active && color === 'primary',
          [classes.secondary]: active && color === 'secondary',
          [classes.tertiary]: active && color === 'tertiary',
        }),
      }}
    />
  </ListItem>
));

export default withStyles(styles)(CardButtonAction);
