import React, { useCallback } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import RALSubmittedImg from 'assets/images/png/RALSubmitted.png';
import { SearchSteps } from 'components/v3/SearchLoadsContent/SearchLoadsContentForm';


const useStyles = makeStyles((theme: Theme) => ({
  buttonContainerRoot: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    boxShadow: '1px 3px 7px 0px rgba(0,0,0,0.75)',
    '& button': {
      borderRadius: 0,
      fontWeight: 300,
    },
  },
  content: {
    padding: theme.spacing(8, 0),
    color: theme.palette.grey[600],
    textAlign: 'center',
  },
  image: {
    margin: theme.spacing(2, 0),
  },
  secondaryAction: {
    margin: theme.spacing(1, 0),
    textTransform: 'none',
  },
}));

interface IRALSubmittedProps {
  resultsCount: number;
  reflectDrawerState: (flag: boolean) => void;
  showSearchResults: () => void;
  setCurrentStep: (step: SearchSteps) => void;
}

const RALSubmitted = ({ resultsCount, reflectDrawerState, showSearchResults, setCurrentStep }: IRALSubmittedProps) => {
  const classes = useStyles();

  const doneClickHandler = useCallback(() => {
    reflectDrawerState(false);
  }, []);

  const searchAgainHandler = useCallback(() => {
    setCurrentStep(SearchSteps.pickupLocation);
  }, []);

  return (
    <Box>
      <Box className={classes.content}>
        <Typography
          color='inherit'
          gutterBottom
          variant='body2'
        >
          <div>Your load has been requested!</div>
          <div>We'll notify you as matches are found.</div>
        </Typography>
        <Box className={classes.image}>
          <img src={RALSubmittedImg} alt='Request submitted' />
        </Box>
        {
          resultsCount > 0 && (
            <div>
              <Typography
                color='inherit'
                gutterBottom
                variant='body2'
              >
                There are currently
                <b>{` ${resultsCount} `}</b>
                matches available!
              </Typography>
              <div>
                <Button
                  className={classes.secondaryAction}
                  variant='contained'
                  color='secondary'
                  onClick={showSearchResults}
                  disableElevation
                >
                  See Current Matches
                </Button>
              </div>
            </div>
          )
        }
      </Box>
      <Box display='block' className={classes.buttonContainerRoot}>
        <Grid container>
          <Grid item xs={6}>
            <Button fullWidth disableElevation onClick={doneClickHandler}>Done</Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              color='primary'
              disableElevation
              variant='contained'
              onClick={searchAgainHandler}
            >
              Request New Load
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RALSubmitted;
