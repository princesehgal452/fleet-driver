import React from 'react';
import { observer } from 'mobx-react';
import Grid, { GridProps } from '@material-ui/core/Grid';

interface IColOwnProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  className?: string;
}

type IColProps = IColOwnProps & GridProps;

const Col = observer(({ xs = 12, sm, md, lg, className, children, ...other }: IColProps) => (
  <Grid
    item
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    className={className}
    {...other}
  >
    {children}
  </Grid>
));

export default Col;
