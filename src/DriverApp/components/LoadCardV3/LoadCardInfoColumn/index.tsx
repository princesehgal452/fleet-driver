import React, { memo, ReactNode } from 'react';
import { Grid, Box } from '@material-ui/core';
import { observer } from 'mobx-react';


interface ILoadCardInfoColumnOwnProps {
  title: string;
  value: ReactNode;
}

const LoadCardInfoColumn = observer(({ title, value }: ILoadCardInfoColumnOwnProps) => (
  <Grid container>
    <Grid item xs={12}>
      <Box fontSize={10} color='rgba(40, 40, 40, 0.68)'>
        {title}
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Box fontSize={12} whiteSpace='normal'>
        {value}
      </Box>
    </Grid>
  </Grid>
));

export default LoadCardInfoColumn;
