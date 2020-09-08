import React, { memo } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOAmountFormat from '../../../../components/FOAmountFormat';


const useStyles = makeStyles((theme: Theme) => ({
  flatRate: {
    '@media (max-width:359px)': {
      fontSize: theme.typography.pxToRem(16.5),
    },
  },
  captionText: {
    color: '#B9BCB9',
    '@media (max-width:359px)': {
      fontSize: theme.typography.pxToRem(10),
    },
  },
  perMileRateItem: {
    '@media (max-width:359px)': {
      paddingTop: 6,
    },
  },
}));

interface ILoadCardPriceProps {
  flatRate?: number;
  perMileRate?: number;
  rateCurrency?: string;
  loading?: boolean;
}

const LoadCardPrice = memo(({ loading, flatRate, perMileRate, rateCurrency = 'USD' }: ILoadCardPriceProps) => {
  const classes = useStyles();

  return (
    <Grid container direction='column'>
      <Grid item>
        {loading ? (
          <Skeleton width={80} height={40} />
        ) : (
          <>
            {flatRate && (
              <Typography variant='h6' display='inline' className={classes.flatRate}>
                <FOAmountFormat
                  currency={rateCurrency}
                  value={flatRate}
                />
              </Typography>
            )}
          </>
        )}
      </Grid>
      <Grid item className={classes.perMileRateItem}>
        {loading ? (
          <Skeleton width={100} height={20} />
        ) : (
          <>
            {perMileRate && (
              <Typography variant='caption' display='inline' className={classes.captionText}>
                Equates to
                {' '}
                <FOAmountFormat
                  currency={rateCurrency}
                  value={perMileRate}
                  perMileRate
                />
              </Typography>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
});

export default LoadCardPrice;
