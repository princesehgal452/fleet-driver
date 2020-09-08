import React, { memo, useState, useCallback } from 'react';
import { Grid, Box, Fab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';
import ContactCallPrompt from './ContactCallPrompt';
import ContactEmailPrompt from './ContactEmailPrompt';

const useStyles = makeStyles((theme: Theme) => ({
 root: {
   padding: theme.spacing(1)
 }
}));

interface ILoadCardShipmentContactProps {
  contactDetails: any;
}

const LoadCardShipmentContact = memo(({ contactDetails }: ILoadCardShipmentContactProps) => {
  const classes = useStyles();
  const [showConfirmCall, setShowConfirmCall] = useState(false);
  const [contactType, setContactType] = useState(null);

  const showConfirmCallPrompt = useCallback((flag: boolean, contactType?: string) => () => {
    setShowConfirmCall(flag)
    setContactType(contactType)
  }, [])
  
  const reflectDrawerStateCallback = useCallback((showConfirmDelete)=> {
    setShowConfirmCall(showConfirmDelete)
    setContactType(null)
  }, [])
  
  return (
    <Grid container direction='row' justify='space-between' alignItems='center' spacing={1} className={classes.root}>
      <Grid item xs={8}>
        <Box fontSize={12} fontWeight={500}>
          Shipment Contact
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Fab size='small' color='secondary' onClick={showConfirmCallPrompt(true, 'email')}>
          <MailIcon />
        </Fab>
      </Grid>
      <Grid item xs={2}>
        <Fab size='small' color='primary' onClick={showConfirmCallPrompt(true, 'call')}>
          <CallIcon />
        </Fab>
      </Grid>
      <FOSwipeableBottomDrawer maxHeight={contactType === 'call' ? 200 : 240} isDrawerOpen={showConfirmCall} reflectDrawerState={reflectDrawerStateCallback} variant='temporary'>
        {
          contactType === 'call' &&
          <ContactCallPrompt contactDetails={contactDetails} cancelDelete={showConfirmCallPrompt}/>
        }
        {
          contactType === 'email' &&
          <ContactEmailPrompt contactDetails={contactDetails} cancelDelete={showConfirmCallPrompt}/>
        }
      </FOSwipeableBottomDrawer>
    </Grid>
  );
});

export default LoadCardShipmentContact;
