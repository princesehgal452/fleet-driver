import React, { ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface IHeaderOwnProps {
  children: string | ReactNode;
}

type IHeaderProps = IHeaderOwnProps & WithStyles<typeof styles>;

const Header = ({ children, classes }: IHeaderProps) => (
  <Typography variant='subtitle2' className={classes.header}>
    {children}
  </Typography>
);

export default withStyles(styles)(Header);
