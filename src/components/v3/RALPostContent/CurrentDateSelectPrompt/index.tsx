import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Box, Button, CircularProgress } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { SearchSteps } from 'components/v3/SearchLoadsContent/SearchLoadsContentForm';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(18),
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: 500,
  },
  button: {
    fontSize: theme.typography.pxToRem(16),
    textTransform: 'none',
  },
  loader: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
}));

interface ICurrentDateSelectPromptOwnProps {
  loading?: boolean;
  proceedToResults: (returnToRAL: SearchSteps) => () => void;
  programmaticFormSumitToRAL: () => void;
  handleClose: () => void;
}

type ICurrentDateSelectPromptProps = ICurrentDateSelectPromptOwnProps;

interface IActionButtonProps {
  buttonText: string;
  onClick: () => void;
}

const CurrentDateSelectPrompt = ({ loading, proceedToResults, programmaticFormSumitToRAL, handleClose }: ICurrentDateSelectPromptProps) => {
  const classes = useStyles();
  const ActionButton = ({ buttonText, onClick }: IActionButtonProps) => (
    <Button
      fullWidth
      variant='contained'
      color='primary'
      onClick={onClick}
      disableElevation
      className={classes.button}
    >
      {buttonText}
    </Button>
  );
  return (
    <>
      {loading ? (
        <Box className={classes.loader}>
          <CircularProgress />
        </Box>
      ) : (
        <Box p={2}>
          <Box mb={2}>
            <Grid
              direction='row'
              container
              justify='space-between'
              wrap='nowrap'
            >
              <Grid item>
                <Typography className={classes.title}>
                  There are loads available now!
                </Typography>
              </Grid>
              <Grid item>
                <CloseOutlinedIcon fontSize='default' onClick={handleClose} />
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ActionButton
                buttonText='See Available Loads'
                onClick={proceedToResults(SearchSteps.pickupDate)}
              />
            </Grid>
            <Grid item xs={12}>
              <ActionButton
                buttonText='Submit Load Request'
                onClick={programmaticFormSumitToRAL}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>

  );
};

export default CurrentDateSelectPrompt;
