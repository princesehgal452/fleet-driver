import React, { ReactNode } from 'react';
import { ListItem, ListItemIcon } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface IDottedListItemOwnProps {
  children: string | ReactNode;
}

type IDottedListItemProps = IDottedListItemOwnProps & WithStyles<typeof styles>;

const DottedListItem = ({ children, classes }: IDottedListItemProps) => (
  <ListItem alignItems='flex-start' className={classes.listItem}>
    <ListItemIcon className={classes.listItemIconWrapper}>
      <FiberManualRecordIcon className={classes.listItemIcon} />
    </ListItemIcon>
    {children}
  </ListItem>
);

export default withStyles(styles)(DottedListItem);
