import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../store/DriverAppStore';
import { Box, Typography, Button } from '@material-ui/core';

type ICreateAccountProps = IDriverAppStore & RouteComponentProps;

const CreateAccount = inject('driverAppStore')(observer(({ driverAppStore, history, location, match: { params } }: ICreateAccountProps) => {
  const { userStore } = driverAppStore as DriverAppStore;

  const handleRequestAdmin = useCallback(() => {
    history.push('/ftOnboarding/companyInfo')
  }, [])

  return (
    <Box>
        <Typography variant='h5' gutterBottom paragraph><Box fontWeight={500}>Create Account</Box></Typography>
        <Typography variant='body2' gutterBottom paragraph>Please have an Account Administrator create your account.</Typography>
        <Typography variant='body2' gutterBottom paragraph>Without an Administrator, FreightTab will not be able to recommend loads customized for your fleet and additional optimizations will only function with manual input.</Typography>
        <Box mt={6} align='right'>
            <Button variant='contained' color='secondary' onClick={handleRequestAdmin} size='large'>REQUEST ADMIN</Button>
        </Box>
    </Box>
  );
}));

export default withRouter(CreateAccount);
