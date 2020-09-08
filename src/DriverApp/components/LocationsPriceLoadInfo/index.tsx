import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import AmountBreakdown from './AmountBreakdown';
import MatchTripLocations from '../MatchesQuickView/MatchTripLocations';
import { LoadInfo } from '../LoadInfo';
import EmphasizedDates from './EmphasizedDates';
import { ILoadAddress } from '../../../models/interfaces/shared/ILoadAddress';
import LoadsmartLogo from '../../../assets/images/png/LoadsmartLogo.png';


const useStyles = makeStyles((theme: Theme) => ({
  loadInfo: {
    paddingLeft: 26,
  },
  companyLogo: {
    height: 55,
  },
  loadSmartLogo: {
    width: 120,
  },
  companyName: {
    width: '100%',
    overflowX: 'hidden'
  }
}));

const parseFlatRate = (flatRate) => {
  if (flatRate && flatRate.amount > 1) {
    return { ...flatRate, price: flatRate.amount };
  }
  return null;
};

const parsePerMileRate = (perMileRate) => {
  if (perMileRate?.price > 0) {
    return perMileRate;
  }
  return null;
};

interface ILocationPriceLoadInfoProps {
  pickup: ILoadAddress;
  dropoff?: ILoadAddress;
  noRateText?: string;
  radius: any;
  distance: any;
  flatRate: any;
  perMileRate: any;
  equipmentTypeList: string[];
  companyLogo?: string;
  companyName?: string;
  availableDate?: string;
  expiresOn?: string;
  displayFullAddress?: boolean;
  dispatchableDriver?: boolean;
  distanceLoading?: boolean;
  loadSmart?: boolean;
  noDivider?: boolean;
  matchDriverName?: string;
}

const LocationPriceLoadInfo = observer(({
  pickup, dropoff, displayFullAddress, radius, equipmentTypeList, companyLogo, companyName,
  flatRate, perMileRate, dispatchableDriver, availableDate, expiresOn, matchDriverName,
  noRateText, distance, distanceLoading, loadSmart, noDivider,
}: ILocationPriceLoadInfoProps) => {
  const classes = useStyles();

  const parsedFlatRate = parseFlatRate(flatRate) || null;
  const parsedPerMileRate = parsePerMileRate(perMileRate) || null;
  const rateHasValue = Boolean(parsedFlatRate || parsedPerMileRate || noRateText);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container className='historical-searches__container' spacing={1}>
          <Grid item xs={rateHasValue ? 6 : 12} sm={rateHasValue ? 6 : 12}>
            <MatchTripLocations
              pickup={pickup}
              dropoff={dropoff}
              displayFullAddress={displayFullAddress}
            />
          </Grid>
          {!dispatchableDriver && rateHasValue
          && (
            <Grid container item xs={6} sm={6} direction='column' alignContent='flex-end'>
              {(loadSmart || companyLogo) ? (
                <Grid item>
                  <Typography align='right'>
                    <img
                      src={loadSmart ? LoadsmartLogo : companyLogo}
                      className={loadSmart ? classes.loadSmartLogo : classes.companyLogo}
                      alt=''
                    />
                  </Typography>
                </Grid>
              ) : (
                <div className={classes.companyName}>
                  <Typography align='right' variant='h6' paragraph noWrap>
                    {companyName || ""}
                  </Typography>
                </div>
              )}
              <Grid item>
                <AmountBreakdown
                  noRateText={noRateText}
                  parsedFlatRate={parsedFlatRate}
                  parsedPerMileRate={parsedPerMileRate}
                  distanceLoading={distanceLoading}
                />
              </Grid>
              {matchDriverName && (
                <Grid item>
                  <Typography variant='subtitle2' align='right'>
                    {matchDriverName}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
          <Grid item xs={12}>
            <div className={classes.loadInfo}>
              <LoadInfo
                radius={radius}
                equipmentTypeList={equipmentTypeList}
                distance={distance}
                distanceLoading={distanceLoading}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      {!noDivider && (
        <Grid item xs={12}>
          <Divider />
        </Grid>
      )}
      {(availableDate || expiresOn)
      && (
        <Grid item xs={12}>
          <EmphasizedDates availableDate={availableDate} expiresOn={expiresOn} />
        </Grid>
      )}
    </Grid>
  );
});

export default LocationPriceLoadInfo;
