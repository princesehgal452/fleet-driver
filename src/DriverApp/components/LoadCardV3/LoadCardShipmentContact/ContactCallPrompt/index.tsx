import React from 'react';
import { Grid, Typography, Box, Fab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CallIcon from '@material-ui/icons/Call';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme: Theme) => ({}));

interface IContactCallPromptOwnProps {
  contactDetails?: any;
  cancelDelete: (showPrompt: boolean) => () => void;
}

type IContactCallPromptProps = IContactCallPromptOwnProps;

const ContactCallPrompt = ({ contactDetails, cancelDelete, }: IContactCallPromptProps) => {
  const classes = useStyles();

  return (
    <Box p={2}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h6' gutterBottom>
            Ready to Call?
          </Typography>
        </Grid>
        <Grid item>
          <CloseOutlinedIcon onClick={cancelDelete(false)} />
        </Grid>
      </Grid>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='subtitle1' gutterBottom>
            Phone Number: {contactDetails?.phone}
          </Typography>
        </Grid>
        <Grid item>
          <Box textAlign='center' mt={2}>
            <a href={`tel:${contactDetails?.phone}`}>
              <Fab color='primary'>
                <CallIcon />
              </Fab>
            </a>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactCallPrompt;
