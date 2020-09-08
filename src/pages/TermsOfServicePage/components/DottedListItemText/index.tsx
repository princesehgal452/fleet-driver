import React, { ReactNode } from 'react';
import { ListItemText, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface IDottedListItemTextOwnProps {
  children: string | ReactNode;
}

type IDottedListItemTextProps = IDottedListItemTextOwnProps & WithStyles<typeof styles>;

const DottedListItemText = ({ children, classes }: IDottedListItemTextProps) => (
  <ListItemText>
    <Typography variant='body2' className={classes.listItemText}>
      {children}
    </Typography>
  </ListItemText>
);

export default withStyles(styles)(DottedListItemText);
