import React, { memo } from 'react';
import { Box, Button, DialogContent, Divider, Grid, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import GeotabAdminIcon from 'assets/images/png/GeotabAdminIcon.png';
import GeotabPermissionIcon from 'assets/images/png/GeotabPermissionIcon.png';
import ButtonLoader from 'components/v3/ButtonLoader';
import useStyles from './styles';


const PermissionItem = memo(({ imgSrc, text }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} alignItems='center' className={classes.permissionItemRoot}>
      <img src={imgSrc} width={35} />
      <Grid item>
        <Typography className={classes.permissionItemText}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
});

const GeotabServiceAccountPopupDialogContent = observer(({ loading, serviceAccountCreationSuccess, isGeotabAdmin, handleAcknowledgeClick, createServiceAccount, dialogCloseHandler }) => (
  <DialogContent>
    <Box p={5}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container alignItems='center'>
            <Box pr={2.5}>
              <img src={GeotabAdminIcon} width={50} />
            </Box>
            <Grid item>
              <Typography variant='h6'>
                Admin
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>
            {serviceAccountCreationSuccess
              ? 'Your Service Account has been created'
              : 'FreightTab Is Not Optimized For Your Fleet'}
          </Typography>
        </Grid>
        {!serviceAccountCreationSuccess && (
          <>
            {isGeotabAdmin ? (
              <Grid item xs={12}>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Typography>
                      FreightTab would like to:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid item>
                    <PermissionItem imgSrc={GeotabAdminIcon} text='Create a Service Account on your behalf' />
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography>
                  Please have an Account Administrator create their own account.
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography>
                Without {isGeotabAdmin ? 'a Service Account' : 'an Administrator'}, FreightTab will not be able to recommend
                loads customized for your fleet and certain features will not work as intended.
              </Typography>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Grid container justify='flex-end' spacing={2}>
            {serviceAccountCreationSuccess ? (
              <Grid item>
                <Button variant='contained' color='secondary' size='large' onClick={dialogCloseHandler}>
                  Ok
                </Button>
              </Grid>
            ) : (
              <>
                {isGeotabAdmin ? (
                  <>
                    <Grid item>
                      <Button variant='contained' size='large' onClick={handleAcknowledgeClick}>
                        Ignore
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        onClick={createServiceAccount}
                        disabled={loading}
                      >
                        <ButtonLoader loading={loading}>
                          Create Service Account
                        </ButtonLoader>
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <Grid item>
                    <Button
                      variant='contained'
                      color='secondary'
                      size='large'
                      onClick={handleAcknowledgeClick}
                      disabled={loading}
                    >
                      Acknowledge
                    </Button>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </DialogContent>
));

export default GeotabServiceAccountPopupDialogContent;
