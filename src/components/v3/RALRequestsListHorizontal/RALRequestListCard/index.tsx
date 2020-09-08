import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { ArrowRightAlt, SwapVert } from '@material-ui/icons';
import { observer } from 'mobx-react';

import Truck from 'models/dataStructures/Trucks';

import FOAddress from 'components/v3/FOAddress';

import LaneIcon from 'assets/images/png/LaneIcon.png';
import RALRequestListCardBackground from 'assets/images/loadLaneCardBackgrounds/background1.png';
import WhiteArrowIcon from 'assets/images/png/WhiteArrowIcon.png';

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: (props) => ({
    background: 'none',
    borderRadius: 7,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1.5),
    position: 'relative',
    backgroundImage: props.backgroundImage,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 100,
    minWidth: 120,
    color: '#fff',
  }),
  cardContainerFirstItem: {
    // marginLeft: theme.spacing(1.8),
    marginLeft: `${theme.spacing(2)}px !important`,
  },
  cardColGridContainer: {
    height: '100%',
  },
  cityArrow: {
    marginBottom: -9,
    width: 12,
  },
  cardTitle: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: 'lighter',
  },
  cardSubtitle: {
    fontSize: theme.typography.pxToRem(7),
    fontWeight: 'lighter',
  },
  swapVert: {
    marginBottom: -2,
    height: 10,
  },
  arrowIcon: {
    verticalAlign: 'bottom',
  },
  laneIcon: {
    filter: 'brightness(0) invert(1)',
    width: 14,
    height: 13,
    marginRight: 4,
  },
}));

interface IRALRequestListCardOwnProps {
  result: Truck;
  index: number;
}

type IRALRequestListCardProps = IRALRequestListCardOwnProps;

const RALRequestListCard = observer(({ result, index }: IRALRequestListCardProps) => {
  const classes = useStyles({ backgroundImage: `url(${RALRequestListCardBackground})` });

  return (
    <Card
      // className={classes.cardContainer}
      className={clsx(classes.cardContainer, {
        [classes.cardContainerFirstItem]: index === 0,
      })}
    >
      <Grid
        container
        direction='column'
        justify='space-between'
        alignItems='flex-start'
        wrap='nowrap'
        className={classes.cardColGridContainer}
      >
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <img src={LaneIcon} className={classes.laneIcon} />
              <Typography className={classes.cardTitle} display='inline'>
                <FOAddress address={result.pickup.address} cityOnly />
              </Typography>
              {result.dropoff.address && (
                <>
                  <ArrowRightAlt className={classes.cityArrow} />
                  <Typography className={classes.cardTitle} display='inline'>
                    <FOAddress address={result.dropoff.address} cityOnly />
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.cardSubtitle} display='inline'>
                <FOAddress address={result.pickup.address} displayFullAddress />
              </Typography>
              <SwapVert color='primary' fontSize='small' className={classes.swapVert} />
              <Typography className={classes.cardSubtitle} display='inline'>
                <FOAddress address={result.dropoff.address} displayFullAddress />
              </Typography>
            </Grid>
          </Grid>
          {/* <Typography className={classes.cardTitle}>Lane {index + 1}</Typography> */}
          {/* <Typography className={classes.laneName}>{lane.name || (`${lane.start_lane} ${lane.end_lane}`)}</Typography> */}
        </Grid>
        <Grid item>
          <img src={WhiteArrowIcon} height={8} className={classes.arrowIcon} />
        </Grid>
      </Grid>
    </Card>
  );
});

export default RALRequestListCard;
