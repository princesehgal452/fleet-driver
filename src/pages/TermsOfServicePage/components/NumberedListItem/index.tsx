import React, { ReactNode } from 'react';
import { ListItem } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface INumberedListItemOwnProps {
  children: string | ReactNode;
}

type INumberedListItemProps = INumberedListItemOwnProps & WithStyles<typeof styles>;

const NumberedListItem = ({ children, classes }: INumberedListItemProps) => (
  <ListItem alignItems='flex-start' className={classes.numberListItem}>
    {children}
  </ListItem>
);

export default withStyles(styles)(NumberedListItem);
