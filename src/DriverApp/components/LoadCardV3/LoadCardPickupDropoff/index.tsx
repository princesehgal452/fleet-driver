import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { Skeleton } from '@material-ui/lab';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { ILoadAddress } from '../../../../models/interfaces/shared/ILoadAddress';
import loadCardTruckBackgrounds from '../../../../assets/images/loadCardTruckBackgrounds';
import FOAddress from '../../../../components/FOAddress';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  address: props => ({
    position: 'absolute',
    left: 10,
    bottom: 10,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 400,
    top: props.isDetailsView && 52
  }),
  container: props => ({
    borderRadius: props.isDetailsView ? 0 : '4px 4px 0px 0px',
    backgroundColor: theme.palette.grey['100'],
    height: props.isDetailsView ? 'auto' : 80,
    [theme.breakpoints.up('md')]: {
      height: 120,
    },
    [theme.breakpoints.up('lg')]: {
      height: 200,
    },
  }),
  img: props => ({
    borderRadius: props.isDetailsView ? 0 : '4px 4px 0px 0px',
    objectFit: 'cover',
    height: props.isDetailsView ? 135 : 85,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      height: 125,
    },
    [theme.breakpoints.up('lg')]: {
      height: 205,
    },
  }),
  gradient: props => ({
    position: 'relative',
    display: 'inline-block',
    '&::after' : {
      borderRadius: props.isDetailsView ? 0 : '4px 4px 0px 0px',
      display: 'inline-block',
      position: 'absolute',
      background: 'linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(22,27,36,0.35) 27.09%, rgba(24,29,39,0.55) 45.98%, rgba(11,13,17,0.7) 63.39%, rgba(3,3,3,0.81) 100%)',
      content: '""',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }),
  details: {
    borderRadius: 8,
    backgroundColor: theme.palette.grey['100'],
    writingMode: 'vertical-lr',
  },
  typography: {
    letterSpacing: 2,
    fontSize: theme.typography.pxToRem(8.5),
    fontWeight: 'bolder',
    textTransform: 'uppercase',
    paddingLeft: 5,
    paddingRight: 5,
  },
}));

interface ILoadCardPickupDropoffProps {
  pickup?: ILoadAddress;
  dropoff?: ILoadAddress;
  loading?: boolean;
  isDetailsView?: boolean;
  loadId?: string;
}

const LoadCardPickupDropoff = observer(({ pickup, dropoff, loading, isDetailsView, history, loadId }: ILoadCardPickupDropoffProps & RouteComponentProps) => {
  const classes = useStyles({ isDetailsView });


  const redirectToDetails = (): string => {
    return `/driver/loadV3/${loadId}/detail`;
  }

  return (
    <Grid container className={clsx(classes.root, classes.container)}>
      <Grid item xs>
        {loading ? (
          <Skeleton className={classes.container} variant='rect' />
        ) : (
          <div className={classes.gradient}>
            <LazyLoadImage
              width='100%'
              effect='blur'
              className={clsx(classes.container, classes.img)}
              src={loadCardTruckBackgrounds[0]} // use normal <img> attributes as props
            />
          </div>
        )}
      </Grid>
      {!loading && pickup && (
        <Typography variant='subtitle2' className={classes.address}>
          <FOAddress address={pickup.location} />
          {dropoff && (
            <>
              {' - '}
              <FOAddress address={dropoff.location} /> 
            </>
          )}
        </Typography>
      )}
      {!loading && !isDetailsView && loadId && (
        <Grid item className={classes.details}>
          <Link to={redirectToDetails()} className='popover-link-text'>
            <Typography align='center' display='block' color='primary' className={classes.typography}>Details</Typography>
          </Link>
        </Grid>
      )}
    </Grid>
  );
});

export default LoadCardPickupDropoff;
