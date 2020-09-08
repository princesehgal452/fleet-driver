import React, { useCallback, useMemo } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

import NoSearchResults from 'assets/images/png/NoSearchResults.png';

import { SearchSteps } from '../../SearchLoadsContentForm';


const useStyles = makeStyles((theme: Theme) => ({
  buttonContainerRoot: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxShadow: '1px 3px 7px 0px rgba(0,0,0,0.75)',
    '& button': {
      borderRadius: 0,
      fontWeight: 300,
    },
  },
}));

const SearchLoadsContentNoResults = ({ resultsCount, pickupDateFieldValue, reflectDrawerState, programmaticFormSumitToRAL, ralSubmitLoading, setCurrentStep }) => {
  const classes = useStyles();

  const pickupIsToday = useMemo(() => {
    const today = moment();
    return pickupDateFieldValue && today.isSame(pickupDateFieldValue, 'd');
  }, [pickupDateFieldValue]);

  const doneClickHandler = useCallback(() => {
    reflectDrawerState(false);
  }, []);

  const ralButtonHandler = useCallback(() => {
    programmaticFormSumitToRAL();
  }, []);

  const searchAgainHandler = useCallback(() => {
    setCurrentStep(SearchSteps.pickupLocation);
  }, []);

  return (
    <Grid container direction='column' justify='space-between' alignItems='center'>
      <Grid item>
        <Box pt={4}>
          <img src={NoSearchResults} />
        </Box>
      </Grid>
      <Grid item className={classes.buttonContainerRoot}>
        {pickupIsToday ? (
          <Button fullWidth color='primary' disableElevation variant='contained' onClick={searchAgainHandler}>
            New Search
          </Button>
        ) : (
          <Grid container>
            <Grid item xs={6}>
              <Button fullWidth disableElevation onClick={doneClickHandler}>Done</Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                disabled={ralSubmitLoading}
                fullWidth
                color='primary'
                disableElevation
                variant='contained'
                onClick={ralButtonHandler}
              >
                Request A Load
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchLoadsContentNoResults;
