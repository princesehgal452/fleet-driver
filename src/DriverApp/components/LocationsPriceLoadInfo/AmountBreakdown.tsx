import React, { memo } from 'react';
import { Skeleton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FOAmountFormat from '../../../components/FOAmountFormat';


const AmountBreakdown = memo(({ parsedFlatRate, parsedPerMileRate, distanceLoading, noRateText }) => (
  <Grid
    container
    direction='column'
    alignItems='flex-end'
  >
    {parsedPerMileRate && !parsedFlatRate ? (
      <Grid item>
        <Typography variant='h6'>
          <FOAmountFormat
            value={parsedPerMileRate.price}
            currency={parsedPerMileRate.currency}
            perMileRate
          />
        </Typography>
      </Grid>
    ) : (
      <>
        {parsedPerMileRate && (
          <Grid item>
            <Typography variant='caption'>
              {distanceLoading ? (
                <Skeleton width={70} />
              ) : (
                parsedPerMileRate.price && (
                  <>
                    Equates to&nbsp;
                    <FOAmountFormat
                      value={parsedPerMileRate.price}
                      currency={parsedPerMileRate.currency}
                      perMileRate
                    />
                  </>
                ))}
            </Typography>
          </Grid>
        )}
        {parsedFlatRate && (
          <Grid item>
            <Typography variant='h6'>
              <FOAmountFormat
                value={parsedFlatRate.price}
                currency={parsedFlatRate.currency}
              />
            </Typography>
          </Grid>
        )}
        {(!parsedFlatRate && !parsedPerMileRate) && (
          <Grid item>
            <Typography variant='h6'>
              {noRateText}
            </Typography>
          </Grid>
        )}
      </>
    )}
  </Grid>
));

export default AmountBreakdown;
