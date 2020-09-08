import React, { useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';

import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import LaneIcon from 'assets/images/png/LaneIcon.png';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 132,
    background: theme.palette.background.paper,
    borderRadius: 4,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  city: props => ({
    fontSize: props.renderInCard ? theme.typography.pxToRem(11) : theme.typography.pxToRem(14)
  }),
  arrowForwardOutlinedIcon: props => ({
    color: theme.palette.grey[300],
    verticalAlign: 'middle',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }),
  addressLine: props => ({
    color: theme.palette.grey[600],
    fontSize: props.renderInCard ? theme.typography.pxToRem(7) : theme.typography.pxToRem(12)
  }),
  importExportOutlinedIcon: props => ({
    fontSize: props.renderInCard ? theme.typography.pxToRem(9): theme.typography.pxToRem(14),
    verticalAlign: 'middle',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }),
  editLink: {
    fontSize: theme.typography.pxToRem(8)
  }
}));

interface IFOLaneCardComponentOwnProps {
  operatingLane: IOperatingLane;
  allowEdit?: boolean;
  triggerSaveLane?: (operatingLane: IOperatingLane) => () => void;
  renderInCard?: boolean;
  handleLaneSelect?: (operatingLane: IOperatingLane) => () => void;
}

type IFOLaneCardComponentProps = IFOLaneCardComponentOwnProps;

const renderLaneDetails = (operatingLane: IOperatingLane, allowEdit, triggerSaveLane, classes, renderInCard) => {
 return (
  <Grid container spacing={1}>
    <Grid item>
      <img src={LaneIcon} alt='Lane' height={renderInCard ? 16 : 24} />
    </Grid>
    <Grid item xs zeroMinWidth>
      <div>
        <Typography className={classes.city} gutterBottom noWrap>
          {operatingLane.name}
        </Typography>
      </div>
      <div>
        <Typography className={classes.addressLine} noWrap>
          {operatingLane?.pickup?.city}
          <ImportExportOutlinedIcon color='primary' className={classes.importExportOutlinedIcon} />
          {operatingLane?.dropoff?.city}
        </Typography>
      </div>
      {
        allowEdit &&
        <Typography className={classes.editLink} variant='caption' color='primary' onClick={triggerSaveLane(operatingLane)}>Edit</Typography>
      }
    </Grid>
  </Grid>
 )
}

const FOLaneCardComponent = ({ renderInCard = true, operatingLane, allowEdit = false, triggerSaveLane, handleLaneSelect }: IFOLaneCardComponentProps) => {
  const classes = useStyles({ renderInCard });

  return (
    <>
    {
      renderInCard ?
      <Card className={classes.root} onClick={handleLaneSelect(operatingLane)}>
          {renderLaneDetails(operatingLane, allowEdit, triggerSaveLane, classes, renderInCard)}
      </Card>:
      renderLaneDetails(operatingLane, allowEdit, triggerSaveLane, classes, renderInCard)
    }
    </>
  );
};

export default FOLaneCardComponent;
