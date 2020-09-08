import React from 'react';
import { inject, observer } from 'mobx-react';
import 'firebase/auth';
import { Grid, Typography, Fab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';

import FOGridHorizontalScroll from 'components/v3/FOGridHorizontalScroll';
import FOLaneCardComponent from 'components/v3/FOLaneCardComponent';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: '#fff'
  },
  scrollContainer: {
    position: 'relative'
  },
  addButton: {
    position: 'absolute',
    right: 0,
    top: 5
  },
}));

interface ISearchPreferredLanesOwnProps {
  handleLaneSelect?: (operatingLane: IOperatingLane) => void;
  triggerSaveLane: (operatingLane?: IOperatingLane) => () => void;
}
type ISearchPreferredLanesProps = ISearchPreferredLanesOwnProps & IDriverAppStore;

const SearchPreferredLanes = inject('driverAppStore')(observer(({ driverAppStore, triggerSaveLane, handleLaneSelect }: ISearchPreferredLanesProps) => {
  const { userStore: { FOUser: { operatingLanes }, updateOperatingLanes } } = driverAppStore as DriverAppStore;
  const classes = useStyles();
  
  const renderLaneCardContent = (laneItem, index) => {
    return (
      <FOLaneCardComponent key={index} operatingLane={laneItem} triggerSaveLane={triggerSaveLane} handleLaneSelect={handleLaneSelect} allowEdit/>
    )
  }

  return (
    <Grid container className={classes.root}>
      <Typography variant='subtitle2' color='inherit' paragraph>Search Preferred Lanes</Typography>
      <br />
      <Grid container className={classes.scrollContainer}>
        <FOGridHorizontalScroll listItems={operatingLanes} renderItem={renderLaneCardContent} listEdgeBorderRadius={4}/>
        <Fab color='primary' className={classes.addButton} onClick={triggerSaveLane()}>
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  );
  
}));

export default SearchPreferredLanes;
