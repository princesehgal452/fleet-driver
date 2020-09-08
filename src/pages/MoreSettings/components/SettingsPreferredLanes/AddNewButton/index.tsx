import React, { memo } from 'react';
import { CardActionArea, Grid, Paper, Typography } from '@material-ui/core';
import PlusCircle from 'assets/images/svg/plus-circle.svg';
import useStyles from './styles';

interface IFOAddNewItemProps {
  openHandler: () => void;
  text: string;
}

const AddNewButton = memo(({ openHandler, text }: IFOAddNewItemProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper variant='outlined'>
          <CardActionArea className={classes.wrapper} onClick={openHandler()}>
            <Grid container alignItems='center'>
              <PlusCircle className={classes.icon} />
              &nbsp;&nbsp;
              <Typography
                variant='subtitle1'
                className={classes.label}
              >
                {text}
              </Typography>
            </Grid>
          </CardActionArea>
        </Paper>
      </Grid>
    </Grid>
  );
});

export default AddNewButton;
