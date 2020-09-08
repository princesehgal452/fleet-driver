import React from 'react';
import { observer } from 'mobx-react';
import Grid, { GridProps } from '@material-ui/core/Grid';

interface IRowOwnProps {
  className?: string;
  flex?: boolean;
}

type IRowProps = IRowOwnProps & GridProps;

const Row = observer(({ className, flex = false, children, ...other }: IRowProps) => (
  <Grid
    container
    direction={!flex ? 'row' : 'column'}
    className={className}
    {...other}
  >
    {children}
  </Grid>
));

export default Row;
