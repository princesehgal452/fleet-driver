import React, { useCallback, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../store/DriverAppStore';
import { Box, Typography, Button, List, ListItemIcon, ListItemText, ListItem, Divider } from '@material-ui/core';
import ErrorIcon from '../../../../assets/images/png/ftCreateAccount/ErrorIcon.png';
import FOButtonLoader from '../../../../components/FOButtonLoader';

type IAccessErrorPromptProps = IDriverAppStore & RouteComponentProps;

const AccessErrorPrompt = inject('driverAppStore')(observer(({ driverAppStore, history, location, match: { params }, }: IAccessErrorPromptProps) => {
      const { userStore, partnerStore: { createServiceAccount }, snackbarStore } = driverAppStore as DriverAppStore;
      const [isLoading, setLoading] = useState(false);

      const handleNoAccess = useCallback(() => {
        history.push('/ftOnboarding/companyInfo')
      }, [])

      const handleAllowAccess = useCallback(async() => {
        try {
          setLoading(true)
          await createServiceAccount();
          setLoading(false)
          history.push('/ftOnboarding/companyInfo');
        } catch (e) {
          setLoading(false)
          snackbarStore.enqueueSnackbarStore('Error creating service account. Please try again.', { variant: 'error' });
        }
      }, [])

      return (
        <Box>
          <Typography variant='h5' gutterBottom paragraph>
            <Box fontWeight={500}>Error</Box>
          </Typography>
          <Typography variant='body2' gutterBottom paragraph>
            This App would like to:
          </Typography>
          <Divider />
          <List component='nav' aria-label='main mailbox folders'>
            <ListItem alignItems='flex-start'>
              <ListItemIcon><img src={ErrorIcon} /></ListItemIcon>
              <ListItemText primary={
                <>
                  <Typography variant='body2' paragraph>Access your Fleet Data and create a Service Account on your behalf.</Typography>
                  <Typography variant='body2'>Without providing these permissions, FreightTab's algorithm will be unable to recommend loads for your fleet.</Typography>
                </>
              } />
            </ListItem>
          </List>
          <Divider />
          <Box mt={2}>
            <Typography variant='caption' gutterBottom paragraph color='textPrimary'>
              FreightTab will use this information in accordance with their respective terms of service and privacy policies.
            </Typography>
          </Box>
          <Box mt={6} align='right'>
            <Box mr={2} display='inline'>
              <Button variant='contained' onClick={handleNoAccess} size='large' disabled={isLoading}>CONTINUE</Button>
            </Box>
            <Button variant='contained' color='secondary' onClick={handleAllowAccess} size='large' disabled={isLoading}>
              <FOButtonLoader loading={isLoading}>CREATE SERVICE ACCOUNT</FOButtonLoader>
            </Button>
          </Box>
        </Box>
      );
    }
  )
);

export default withRouter(AccessErrorPrompt);
