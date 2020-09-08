import React from 'react';
import { observer, inject } from 'mobx-react';
import { Grid, Typography } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import CommunicationsPreferences from './components/CommunicationsPreferences';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';

type IDriverPageProps = RouteComponentProps & IDriverAppStore;

@inject('driverAppStore')
@observer
class UserPublicCommunicationPreferences extends React.Component<IDriverPageProps> {
  render() {
    return (
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={11} spacing={6}>
          <Typography variant='h4' component='h1' gutterBottom>
            Communication Preferences
          </Typography>
        </Grid>
        <Grid item container xs={11} sm={7} lg={5}>
          <Grid item container direction='row'>
            <Grid item xs={12}>
              <CommunicationsPreferences />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(UserPublicCommunicationPreferences);
