import React, { useState, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { Field } from 'redux-form';
import { Grid, IconButton, InputAdornment, Typography, Fab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';

import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import { uniqueLaneName } from 'services/Validations';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';

import FOLaneCardComponent from 'components/v3/FOLaneCardComponent';
import FOTextField from 'components/v3/FOTextField';

import LaneIcon from 'assets/images/png/LaneIcon.png';


const useStyles = makeStyles((theme: Theme) => ({
  startAdornment: {
    paddingLeft: 18,
    paddingRight: 4,
  },
  endAdornment: {
    paddingRight: 20,
  },
  laneListItem: {
    margin: theme.spacing(2)
  },
  addBtn: {
    backgroundColor: '#FFFFFF',
    marginRight: theme.spacing(1)
  },
  helperText: {
    padding: '0 18px'
  }
}));

interface IAddLaneFinalStepOwnProps {
  programmaticFormSubmit: () => void;
  triggerSaveLane: (operatingLane?: IOperatingLane) => () => void;
  resetSteps: () => void;
}

type IAddLaneFinalStepProps = IAddLaneFinalStepOwnProps & IDriverAppStore;

const AddLaneFinalStep = inject('driverAppStore')(observer(({ driverAppStore, programmaticFormSubmit, triggerSaveLane, resetSteps }: IAddLaneFinalStepProps) => {
  const classes = useStyles();
  const [addLaneBtnVisible, setAddLaneBtnVisible] = useState(false)
  const { userStore: { FOUser: { operatingLanes }, updateOperatingLanes } } = driverAppStore as DriverAppStore;

  const triggerSubmit = useCallback(() => {
    programmaticFormSubmit()
    setAddLaneBtnVisible(true);
  }, []);

  const triggerResetSteps = useCallback(() => {
    resetSteps()
    setAddLaneBtnVisible(false);
  }, []);

  return (
    <>
      <Field
        component={FOTextField}
        name='name'
        placeholder='Enter Lane name'
        fullWidth
        helperTextClasses={classes.helperText}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' className={classes.startAdornment}>
              <img src={LaneIcon} alt='Lane' height={18} />
            </InputAdornment>
          ),
          endAdornment: (
            <Grid container className={classes.endAdornment} justify='flex-end' alignItems='center' wrap='nowrap'>
            <IconButton size='small' onClick={triggerSubmit}>
              <DoneOutlinedIcon color='primary' />
            </IconButton>
          </Grid>
          ),
        }}
        validate={[uniqueLaneName]}
      />
      <Grid container>
        {
          (operatingLanes || []).map((obj, index) => {
            return (
              <Grid
              className={classes.laneListItem}
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              >
                <Grid item>
                  <FOLaneCardComponent renderInCard={false} operatingLane={obj} />
                </Grid>
                <Grid item>
                  <Typography variant='button' color='primary' onClick={triggerSaveLane(obj)}>Edit</Typography>
                </Grid>
              </Grid>
            )
          }) 
        }
        {
          addLaneBtnVisible &&
          <Grid onClick={triggerResetSteps}
            className={classes.laneListItem}
              container
              direction='row'
              alignItems='center'
            >
              <Grid item>
                <Fab size='medium' className={classes.addBtn}>
                  <AddIcon color='primary'/>
                </Fab>
              </Grid>
              <Grid item>
                <Typography variant='body2'>Add Operating Lanes</Typography>
              </Grid>
            </Grid>
        }
        </Grid>
    </>
  );
}));

export default AddLaneFinalStep;
