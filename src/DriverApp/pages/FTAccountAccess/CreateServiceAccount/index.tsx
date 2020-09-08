import React, { useCallback, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../store/DriverAppStore';
import { Box, Typography, Button, List, ListItemIcon, ListItemText, ListItem, Divider, makeStyles, Theme, } from '@material-ui/core';
import GeotabPermissionIcon from '../../../../assets/images/png/GeotabPermissionIcon.png';
import GeotabAdminIcon from '../../../../assets/images/png/GeotabAdminIcon.png';
import FOButtonLoader from '../../../../components/FOButtonLoader';

const useStyles = makeStyles((theme: Theme) => ({
  buttons: {
    minWidth: 87
  }
}));

type ICreateServiceAccountProps = IDriverAppStore & RouteComponentProps;

const CreateServiceAccount = inject('driverAppStore')(observer(({ driverAppStore, history, location, match: { params } }: ICreateServiceAccountProps) => {
      const { userStore, partnerStore: { createServiceAccount }, snackbarStore } = driverAppStore as DriverAppStore;
      const [isLoading, setLoading] = useState(false);
      const denyAccess = useCallback(() => {
        history.push('/ftAccountAccess/accessErrorPrompt/')
      }, [])
      const classes = useStyles();

      const allowAccess = useCallback(async() => {
        try {
          setLoading(true)
          await createServiceAccount();
          history.push('/ftOnboarding/companyInfo')
          setLoading(false)
        } catch (e) {
          setLoading(false)
          snackbarStore.enqueueSnackbarStore('Error creating service account. Please try again.', { variant: 'error' });
        }
      }, [])

      return (
        <Box>
          <Typography variant='h5' gutterBottom paragraph><Box fontWeight={500}>Service Account</Box></Typography>
          <Typography variant='body2' gutterBottom paragraph>This App would like to:</Typography>
          <List component='nav' aria-label='main mailbox folders'>
            <Divider />
            <ListItem>
              <ListItemIcon><img height={30} src={GeotabAdminIcon} /></ListItemIcon>
              <ListItemText primary={
                <Typography variant='body2'>Create a Service Account on your behalf</Typography>
              }/>
            </ListItem>
            <Divider />
          </List>
          <Box mt={2}>
            <Typography variant='caption' gutterBottom paragraph color='textPrimary'>
              FreightTab will use this information in accordance with their respective terms of service and privacy policies.
            </Typography>
          </Box>
          <Box mt={6} align='right'>
            <Box mr={2} display='inline'>
              <Button variant='contained' onClick={denyAccess} disabled={isLoading} size='large' className={classes.buttons}>NO</Button>
            </Box>
            <Button variant='contained' color='secondary' onClick={allowAccess} size='large' className={classes.buttons} disabled={isLoading}>
              <FOButtonLoader loading={isLoading}>YES</FOButtonLoader>
            </Button>
          </Box>
        </Box>
      );
    }
  )
);

export default withRouter(CreateServiceAccount);
