import React, { ReactNode } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import { Box } from '@material-ui/core';
import loadLaneCardBackgrounds from 'assets/images/loadLaneCardBackgrounds';
import WhiteArrowIcon from 'assets/images/png/WhiteArrowIcon.png';
import FOAddress from 'components/FOAddress';
import { fetchRandomValueFromArr } from 'utils/utility';
import useStyles from './styles';

interface ILocationTypesCommon {
  city?: string;
  state?: string;
  country?: string;
  address?: string;
}

interface ILoadCardOwnProps {
  pickup: ILocationTypesCommon;
  dropoff: ILocationTypesCommon;
  id?: string;
  handleLoadSelect?: (id: string) => () => void;
}

type ILoadCardProps = ILoadCardOwnProps;

const LoadCard = ({ pickup, dropoff, id, handleLoadSelect }: ILoadCardProps) => {
  const classes = useStyles({ backgroundImage: `url(${fetchRandomValueFromArr(loadLaneCardBackgrounds)})` });

  const generateLocationString = (location: ILocationTypesCommon): string | ReactNode => {
    let locationDetails: string | ReactNode = '';
    if (location.state || location.country) {
      locationDetails = `${location?.state} ${(location?.state && location?.country) && ','} ${location?.country}`;
    } else if (location.address) {
      locationDetails = <FOAddress address={location.address} />;
    }
    return locationDetails;
  };


  const renderCity = (location: ILocationTypesCommon): string | ReactNode => {
    let city: string | ReactNode = '';
    if (location.city) {
      city = location.city;
    } else if (location.address) {
      city = <FOAddress address={location.address} cityOnly />;
    }
    return city;
  };
  return (
    <Card
      className={classes.cardContainer}
      elevation={0}
      onClick={id && handleLoadSelect ? handleLoadSelect(id) : undefined}
    >
      <Grid
        container
        direction='column'
        justify='space-between'
        alignItems='flex-start'
        className={classes.cardColGridContainer}
      >
        <Grid item>
          <Box fontSize={10} className={classes.textCapitalize}>
            {renderCity(pickup)}
            <Box fontSize={12} mx={1} display='inline'>
              <ArrowForwardOutlinedIcon fontSize='inherit' className={classes.verticalMiddle} />
            </Box>
            {renderCity(dropoff) || 'Anywhere'}
          </Box>
          <Box fontSize={7}>
            {generateLocationString(pickup)}
            <Box fontSize={10} mx={0.8} display='inline' className={classes.verticalMiddle}>
              <ImportExportOutlinedIcon fontSize='inherit' color='primary' className={classes.verticalMiddle} />
            </Box>
            {generateLocationString(dropoff) || 'Anywhere'}
          </Box>
        </Grid>
        {
          id && handleLoadSelect && (
            <Grid item>
              <img src={WhiteArrowIcon} height={8} className={classes.arrowIcon} alt='View details' />
            </Grid>
          )
        }
      </Grid>
    </Card>
  );
};

export default LoadCard;
