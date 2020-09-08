import React, { memo } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Grid, Typography, Box } from '@material-ui/core';

import FOAmountFormat from 'components/v3/FOAmountFormat';
import useStyles from '../styles';

interface ILoadCardPriceProps {
  flatRate?: number;
  perMileRate?: number;
  rateCurrency?: string;
  loading?: boolean;
}

const LoadCardPrice = memo(({ loading, flatRate, perMileRate, rateCurrency = 'USD' }: ILoadCardPriceProps) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' justify='space-between' className={classes.fullHeight}>
      <Grid item>
        {loading ? (
          <Skeleton width={80} height={40} />
        ) : (
          <>
            {flatRate > 0 && (
              <Typography variant='subtitle2'>
                <FOAmountFormat
                  currency={rateCurrency}
                  value={flatRate}
                />
              </Typography>
            )}
          </>
        )}
      </Grid>
      <Grid item>
        {loading ? (
          <Skeleton width={100} height={20} />
        ) : (
          <>
            {perMileRate && (
              <Box fontSize={9}>
                Equates to
                {' '}
                <FOAmountFormat
                  currency={rateCurrency}
                  value={perMileRate}
                  perMileRate
                />
              </Box>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
});

export default LoadCardPrice;
