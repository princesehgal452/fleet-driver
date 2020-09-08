import React, { ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface IBodyTextOwnProps {
  children: string | ReactNode;
}

type IBodyTextProps = IBodyTextOwnProps & WithStyles<typeof styles>;

const BodyText = ({ children, classes }: IBodyTextProps) => (
  <Typography variant='body2' className={classes.body}>
    {children}
  </Typography>
);

export default withStyles(styles)(BodyText);
