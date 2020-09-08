import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  button: {
    height: '100%',
  },
});

interface IMatchDetailContactEmailDialogActionButtonsOwnProps {
  templateSelected: boolean;
  onCustomMessageClick: () => void;
  onUseTemplateClick: () => void;
}

const MatchDetailContactEmailDialogActionButtons = memo(({ templateSelected, onCustomMessageClick, onUseTemplateClick }: IMatchDetailContactEmailDialogActionButtonsOwnProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.button}
          fullWidth
          onClick={onCustomMessageClick}
        >
          Write my own
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          fullWidth
          disabled={!templateSelected}
          onClick={onUseTemplateClick}
        >
          Use email template
        </Button>
      </Grid>
    </Grid>
  );
});

export default MatchDetailContactEmailDialogActionButtons;
