import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, DialogContent, Typography, Box, Grid } from '@material-ui/core';
import BlueTick from '../../../../assets/images/png/ftCreateAccount/BlueTick.png';
import { getAppContainer } from '../../../../utils/utility';

interface IConfirmFleetSetupOwnProps {
  dismissPromptCallback: () => void;
  submitCallback: () => void;
}

type IConfirmFleetSetupProps = IConfirmFleetSetupOwnProps;

const ConfirmFleetSetup = observer(
  ({ submitCallback, dismissPromptCallback }: IConfirmFleetSetupProps) => {
    return (
      <Dialog open={true} maxWidth='xs' container={getAppContainer}>
        <DialogContent>
          <Box pt={4} pb={6} px={6}>
            <Box mb={4}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={2}>
                  <img src={BlueTick} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='h6'>
                    Confirm Your Fleet Is Set Up Correctly
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box mb={4}>
              <Grid container>
                <Grid item>
                  <Typography>
                    Before proceeding, please confirm the information on this
                    page is correct.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={2} justify='space-between'>
              <Grid item xs={8}>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={dismissPromptCallback}
                >
                  CONTINUE EDITING
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  color='secondary'
                  variant='contained'
                  onClick={submitCallback}
                >
                  CONFIRM
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
);

export default ConfirmFleetSetup;
