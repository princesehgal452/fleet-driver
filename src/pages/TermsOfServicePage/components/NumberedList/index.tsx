import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { List } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface INumberedListOwnProps {
  children: string | ReactNode;
  header?: boolean;
}

type INumberedListProps = INumberedListOwnProps & WithStyles<typeof styles>;

const NumberedList = ({ header = false, children, classes }: INumberedListProps) => (
  <List component='ol' className={classnames(classes.numberList, header && classes.headerList)}>
    {children}
  </List>
);

export default withStyles(styles)(NumberedList);
