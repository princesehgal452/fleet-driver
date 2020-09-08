import React from 'react';
import { WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';

const styles = () => ({
  cardTitle: {
    color: '#222222',
    fontSize: 16,
    fontWeight: 500,
  },
});

interface ICardTitleOwnProps {
  children?: string;
  className?: string;
}

export type ICardTitleProps = ICardTitleOwnProps & WithStyles<typeof styles>;


const CardTitle = ({ children, classes, className }: ICardTitleProps) => (
  <div className={classnames(classes.cardTitle, className)}>
    {children}
  </div>
);

export default withStyles(styles)(CardTitle);
