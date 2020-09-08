import React, { memo } from 'react';
import { Skeleton } from '@material-ui/lab';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FlatbedGreen from '../../../../assets/images/png/FlatbedGreen.png';


const useStyles = makeStyles((theme: Theme) => ({
  captionText: {
    color: '#B9BCB9',
    '@media (max-width:359px)': {
      fontSize: theme.typography.pxToRem(10),
    },
  },
}));

interface ILoadCardPickupDropoffProps {
  equipmentTypeFormatted?: string;
  loading?: boolean;
}

const LoadCardPickupDropoff = memo(({ loading, equipmentTypeFormatted }: ILoadCardPickupDropoffProps) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      {loading ? (
        <Grid item>
          <Skeleton width={40} height={40} />
        </Grid>
      ) : (
        <Typography variant='h6'>
          <img src={FlatbedGreen} />
        </Typography>
      )}
      <Grid item>
        <Typography variant='caption' className={classes.captionText}>
          {loading ? (
            <Skeleton width={40} />
          ) : (
            <>
              {equipmentTypeFormatted ? equipmentTypeFormatted.split(',')[0] : ''}
            </>
          )}
        </Typography>
      </Grid>
    </Grid>
  );
});

export default LoadCardPickupDropoff;
