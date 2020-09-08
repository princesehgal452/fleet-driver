import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import { Skeleton } from '@material-ui/lab';
import { Typography, Grid, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { ILoadAddress } from 'models/interfaces/shared/ILoadAddress';
import { ITheme } from 'theme/ITheme';

interface ILoadCardPickupDateProps {
  pickup?: ILoadAddress;
  dropoff?: ILoadAddress;
  loading?: boolean;
}

const LoadCardPickupDate = observer(({ pickup, loading }: ILoadCardPickupDateProps) => {
  const theme: ITheme = useTheme();
  const momentFormat = useCallback((date) => moment(date).format('MMM D, h:mm A'), []);

  const getFormattedDate = useCallback((date: Moment) => {
    if ((date instanceof moment)) {
      return moment(date).isValid()
        ? {
          month: moment(date).format('MMM'),
          day: moment(date).format('D'),
        }
        : 'Pending';
    }
    if ((date === undefined) || !(date instanceof Date)) {
      return 'N/A';
    }
    return momentFormat(date);
  }, []);

  const pickupDate = useMemo(() => {
    if (pickup?.startDateTime) {
      return getFormattedDate(pickup.startDateTime);
    }
    return 'N/A';
  }, [pickup]);

  return (
    <Box>
      <Grid container direction='row'>
        <Grid item xs={5}>
          <Grid container>
            <Grid item xs={12}>
              <Box fontSize={11} color={theme.palette.text.secondary}>
                PU
              </Box>
            </Grid>
            <Grid item xs={12}>
              {
                loading ? (
                  <Skeleton width={20} />
                ) : (
                  <Box fontSize={12} fontWeight={500} whiteSpace='normal'>
                    {pickupDate.month}
                  </Box>
                )
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Box fontSize={30} fontWeight={500} lineHeight='32px'>
            {pickupDate.day}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

export default LoadCardPickupDate;
