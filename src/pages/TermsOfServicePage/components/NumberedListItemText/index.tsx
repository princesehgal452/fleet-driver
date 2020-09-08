import React, { ReactNode } from 'react';
import { ListItemText, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface INumberedListItemTextOwnProps {
  children: string | ReactNode;
  header?: boolean;
}

type INumberedListItemTextProps = INumberedListItemTextOwnProps & WithStyles<typeof styles>;

const NumberedListItemText = ({ children, classes, header = false }: INumberedListItemTextProps) => (
  <ListItemText className={classes.numberListItemTextWrapper}>
    <Typography variant='body2' className={header ? classes.numberListItemHeaderText : classes.numberListItemText}>
      {children}
    </Typography>
  </ListItemText>
);

export default withStyles(styles)(NumberedListItemText);
