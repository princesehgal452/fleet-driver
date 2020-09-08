import React, { memo } from 'react';
import classNames from 'classnames';
import { Button, Grid, IconButton, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ArrowDropDownCircle, ArrowDropDownCircleOutlined } from '@material-ui/icons';
import FOGrid from '../../../components/FOGrid';
import LaneMap from '../../../assets/images/png/LaneMap.png';
import LaneTruck from '../../../assets/images/png/LaneTruck.png';
import LaneDuty from '../../../assets/images/png/LaneDuty.png';
import { observer } from 'mobx-react';


interface IStylesProps {
  index: number;
}

const useStylesLaneCard = makeStyles((theme: Theme) => ({
  rootBackground: ({ index }: IStylesProps) => {
    switch (index) {
      case 1:
        return ({
          backgroundColor: '#BCD1FB',
        });
      case 2:
        return ({
          backgroundColor: '#FCE6C4',
        });
      case 0:
      default:
        return ({
          backgroundColor: '#B2FFC8',
        });
    }
  },
  darkColor: ({ index }: IStylesProps) => {
    switch (index) {
      case 1:
        return ({
          color: '#324F8C',
        });
      case 2:
        return ({
          color: '#C68732',
        });
      case 0:
      default:
        return ({
          color: '#07802A',
        });
    }
  },
  button: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(3),
    width: 110,
    color: 'inherit',
  },
  arrow: {
    transform: `rotate(-90deg)`,
  },
}));

const useStylesLanes = makeStyles({
  lanePickupArrow: {
    transform: `rotate(-180deg)`,
  },
});

const useStylesFOGrid = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
    },
    overflow: 'hidden',
  },
}));

interface ILaneImage {
  index: number;
}

const LaneImage = memo(({ index }: ILaneImage) => {
  switch (index) {
    case 1:
      return (
        <img src={LaneMap} alt='Lane Map' />
      );
    case 2:
      return (
        <img src={LaneDuty} alt='Lane Duty' />
      );
    case 0:
    default:
      return (
        <img src={LaneTruck} alt='Lane Truck' />
      );
  }
});

const LaneFormatter = memo(({ lane }) => {
  const addComma = lane.replace('_', ', ');
  return (
    <Typography variant='h6' display='inline'>{addComma}</Typography>
  );
});

const Lanes = memo(({ startLane, endLane }) => {
  const classes = useStylesLanes();
  return (
    <Grid item container xs>
      <Grid container item xs={12} spacing={1} alignItems='center'>
        <ArrowDropDownCircleOutlined color='primary' className={classes.lanePickupArrow} />
        <Grid item><LaneFormatter lane={startLane} /></Grid>
      </Grid>
      <Grid container item xs={12} spacing={1} alignItems='center'>
        <ArrowDropDownCircleOutlined color='secondary' />
        <Grid item><LaneFormatter lane={endLane} /></Grid>
      </Grid>
    </Grid>
  );
});

interface ILaneCard extends ILaneImage {
  onLaneClick: () => void;
  loadsCount: number;
  startLane: string;
  endLane: string;
  otherLoads?: boolean;
}

const LaneCard = observer(({ index, loadsCount, onLaneClick, startLane, endLane, otherLoads }: ILaneCard) => {
  const classes = useStylesLaneCard({ index });
  const classesFOGrid = useStylesFOGrid();

  return (
    <Paper elevation={1} className={classNames({ [classes.rootBackground]: !otherLoads })} onClick={onLaneClick}>
      <FOGrid container classes={classesFOGrid}>
        {!otherLoads ? (
          <>
            <Grid item xs>
              <Grid container spacing={1}>
                <Lanes startLane={startLane} endLane={endLane} />
                <Grid item xs={12}>
                  <Typography variant='subtitle2' className={classes.darkColor}>
                    {loadsCount} {loadsCount ? 'Loads' : 'Load'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    className={classNames(classes.button, classes.darkColor)}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={3} justify='flex-end'>
              <LaneImage index={index} />
            </Grid>
          </>
        ) : (
          <Grid container item xs={12} alignItems='center' onClick={onLaneClick}>
            <Lanes startLane={startLane} endLane={endLane} />
            <Grid item>
              <IconButton color='primary'>
                <ArrowDropDownCircle className={classes.arrow} />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </FOGrid>
    </Paper>
  );
});

export default LaneCard;
