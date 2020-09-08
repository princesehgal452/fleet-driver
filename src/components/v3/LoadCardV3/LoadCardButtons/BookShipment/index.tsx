import React, { memo, useCallback } from 'react';
import { Button, Grid } from '@material-ui/core';

import Load from 'models/dataStructures/Load';
import useStyles from '../DefaultDriverButtons/styles';

interface IBookShipmentProps {
  load?: Load;
}

const BookShipment = memo(({ load }: IBookShipmentProps) => {
  const classes = useStyles();

  const bookShipment = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          size='small'
          className={classes.button}
          onClick={bookShipment}
          disableElevation
        >
          <div>
            <div>Book</div>
            <div>Now</div>
          </div>
        </Button>
      </Grid>
    </>
  );
});

export default BookShipment;
