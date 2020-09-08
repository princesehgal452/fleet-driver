import React, { useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import { IRecommendedLane } from 'models/interfaces/shared/IRecommendedLane';

import loadLaneCardBackgrounds from 'assets/images/loadLaneCardBackgrounds';
import { fetchRandomValueFromArr } from 'utils/utility';
import WhiteArrowIcon from 'assets/images/png/WhiteArrowIcon.png'

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: props => ({
    background: theme.palette.background.paper,
    borderRadius: 4,
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    position: "relative",
    backgroundImage: props.backgroundImage,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 100,
    minWidth: 120,
    color: '#fff'
  }),
  cardColGridContainer: {
    height: '100%'
  },
  cardTitle: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500
  },
  laneName: {
    fontSize: theme.typography.pxToRem(10),
    lineHeight: theme.typography.pxToRem(10),
  },
  arrowIcon: {
    verticalAlign: 'bottom'
  },
}));

interface ILoadLaneCardOwnProps {
  lane: IRecommendedLane | IOperatingLane;
  index: number;
  handleLaneSelect?: (lane: IRecommendedLane | IOperatingLane) => void;
}

type ILoadLaneCardProps = ILoadLaneCardOwnProps;

const renderLaneDetails = (lane, index, classes) => {
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
      className={classes.cardColGridContainer}
  >
      <Grid item>
        <Typography className={classes.cardTitle}>Lane {index + 1}</Typography>
        <Typography className={classes.laneName}>{lane.name || (`${lane.start_lane} ${lane.end_lane}`)}</Typography>
      </Grid>
      <Grid item>
        <img src={WhiteArrowIcon} height={8} className={classes.arrowIcon} />
      </Grid>
    </Grid>
  );
};

const LoadLaneCard = ({ lane, index, handleLaneSelect }: ILoadLaneCardProps) => {
  const classes = useStyles({backgroundImage: `url(${fetchRandomValueFromArr(loadLaneCardBackgrounds)})`});

  const handleLaneClick = useCallback(() => {
    handleLaneSelect(lane)
  }, [handleLaneSelect])

  return (
    <Card className={classes.cardContainer} onClick={handleLaneClick}>
      {renderLaneDetails(lane, index, classes)}
    </Card>
  );
};

export default LoadLaneCard;
