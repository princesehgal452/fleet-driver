import React, { useState, memo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircle from '@material-ui/icons/CheckCircleRounded';
import classNames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: theme.spacing(6),
    color: theme.palette.grey.A100,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
  },
  selected: {
    color: theme.palette.primary.main,
  },
}));


interface DispatcherReassignPopoverProps {
  onSelect: (arg: string) => void;
}

const handleClick = (mode, onSelect) => () => {
  onSelect(mode);
};

const DispatcherReassignPopoverContent = memo(({ onSelect }: DispatcherReassignPopoverProps) => {

  const classes = useStyles();
  return (
    <List>
      <ListItem button onClick={handleClick('ASSIGN_SELF', onSelect)}>
        <ListItemAvatar>
          <CheckCircle
            className={classNames(classes.icon, classes.selected)}
          />
        </ListItemAvatar>
        <ListItemText primary='Assign to Me' />
      </ListItem>
      <ListItem button onClick={handleClick('REASSIGN_DRIVER', onSelect)}>
        <ListItemAvatar>
          <CheckCircle
            className={classNames(classes.icon, classes.selected)}
          />
        </ListItemAvatar>
        <ListItemText primary='Assign to Driver' />
      </ListItem>
    </List>
  );
})

export default DispatcherReassignPopoverContent;
