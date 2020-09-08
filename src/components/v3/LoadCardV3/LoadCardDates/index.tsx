import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import { Skeleton } from '@material-ui/lab';
import { Grid, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { ILoadAddress } from 'models/interfaces/shared/ILoadAddress';
import PickupClock from 'assets/images/png/loadCard/PickupClock.png';
import DropoffClock from 'assets/images/png/loadCard/DropoffClock.png';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { ITheme } from 'theme/ITheme';

interface ILoadCardDatesProps {
  pickup?: ILoadAddress;
  dropoff?: ILoadAddress;
  loading?: boolean;
}

const LoadCardDates = observer(({ pickup, dropoff, loading }: ILoadCardDatesProps) => {
  const theme: ITheme = useTheme();
  const getFormattedDate = useCallback((date: Moment, time: string) => {
    const formattedDate = {
      time: Boolean(time) ? time : null,
    };
    if ((date instanceof moment && moment(date).isValid())) {
      formattedDate.date = moment(date).format('MMM D');
    }
    return formattedDate;
  }, []);

  const pickupDate = useMemo(() => ({
    start: getFormattedDate(pickup?.startDateTime, pickup?.startTime),
    end: getFormattedDate(pickup?.endDateTime, pickup?.endTime),
  }), [pickup]);

  const dropoffDate = useMemo(() => ({
    start: getFormattedDate(dropoff?.startDateTime, dropoff?.startTime),
    end: getFormattedDate(dropoff?.endDateTime, dropoff?.endTime),
  }), [dropoff]);

  if (loading) {
    return (
      <div>
        <Box>
          <Skeleton width={40} />
        </Box>
        <Box>
          <Skeleton width={40} />
        </Box>
      </div>
    );
  }

  const RenderDateTimeContent = (title, dateTime) => (
    <>
      <Box fontSize={12} color={theme.palette.text.secondary}>
        {`${title} ${(dateTime?.start?.time && !dateTime?.end?.time) ? 'Time' : ''} `}
      </Box>
      <Box fontSize={14} fontWeight={500}>
        {
          !dateTime?.start?.time && !dateTime?.end?.time && (
            <div>
              {dateTime?.start?.date}
            </div>
          )
        }
        {
          dateTime?.start?.time && !dateTime?.end?.time && (
            <div>
              {dateTime?.start?.time}
            </div>
          )
        }
      </Box>
      {
        dateTime?.start?.time && dateTime?.end?.time && (
          <>
            <Box fontSize={12} fontWeight={500}>
              <div>
                {`${dateTime?.start?.date}, `}
              </div>
              <div>
                {`${dateTime?.start?.time} - ${dateTime?.end?.time}`}
              </div>
            </Box>
          </>
        )
      }
    </>
  );

  return (
    <Grid container justify='center'>
      <Grid item xs={1}>
        <img src={PickupClock} alt='Pickup Clock' />
      </Grid>
      <Grid item xs={4}>
        {RenderDateTimeContent('Pickup', pickupDate)}
      </Grid>
      <Grid item>
        <ArrowRightIcon color='disabled' />
      </Grid>
      <Grid item xs={1}>
        <img src={DropoffClock} alt='Pickup Clock' />
      </Grid>
      <Grid item xs={4}>
        {RenderDateTimeContent('Dropoff', dropoffDate)}
      </Grid>
    </Grid>
  );
});

export default LoadCardDates;
