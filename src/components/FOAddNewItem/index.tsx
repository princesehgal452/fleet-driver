import React, { memo } from 'react';
import { CardActionArea, Grid, Paper, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import FOGrid from '../FOGrid';


interface IFOAddNewItemProps {
  openHandler: () => void;
  text: string;
}

const FOAddNewItem = memo(({ openHandler, text }: IFOAddNewItemProps) => (
  <Grid container>
    <Grid item xs={12}>
      <Paper>
        <CardActionArea onClick={openHandler}>
          <FOGrid vSpacing={4}>
            <AddCircle fontSize='large' color='disabled' />
            &nbsp;&nbsp;
            <Typography variant='subtitle1'>{text}</Typography>
          </FOGrid>
        </CardActionArea>
      </Paper>
    </Grid>
  </Grid>
));

export default FOAddNewItem;
