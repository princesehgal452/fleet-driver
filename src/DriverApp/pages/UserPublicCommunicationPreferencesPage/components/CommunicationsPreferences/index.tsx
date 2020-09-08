import qs from 'query-string';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DriverAppStore } from '../../../../store/DriverAppStore';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import PreferenceSwitch from '../../../../components/PreferenceSwitch';
import ICommunicationPreferencesListItem from '../../../../../models/interfaces/shared/ICommunicationPreferencesListItem';

type ICommunicationsPreferencesProps = RouteComponentProps & IDriverAppStore;
type paramType = string | string[] | undefined;

interface ICommunicationPreferencesState {
  email: paramType;
  requestid: paramType;
  communicationPreferenceList: ICommunicationPreferencesListItem[];
}

@inject('driverAppStore')
@observer
class CommunicationsPreferences extends React.Component<ICommunicationsPreferencesProps, ICommunicationPreferencesState> {
  state = {
    email: '',
    requestid: '',
    communicationPreferenceList: [] as ICommunicationPreferencesListItem[],
  };

  componentDidMount() {
    const { location: { search } } = this.props;
    const { email, requestid } = qs.parse(search);
    const { driverAppStore } = this.props;
    const { publicStore: { getCommunicationPreferences, getCommunicationPreferencesList } } = driverAppStore as DriverAppStore;

    if (email && requestid) {
      this.setState({ email, requestid, communicationPreferenceList: getCommunicationPreferencesList() }, () => { getCommunicationPreferences(email as string, requestid as string); });
    }
  }

  switchClickHandler = async (name: string, value: boolean) => {
    const { email, requestid } = this.state;

    const { driverAppStore } = this.props;
    const { publicStore: { updateCommunicationPreference } } = driverAppStore as DriverAppStore;
    await updateCommunicationPreference(email, requestid, name, value);
  };

  render() {
    const { email, communicationPreferenceList } = this.state;
    const { driverAppStore } = this.props;
    const { publicStore: { communicationsPreferences, loading } } = driverAppStore as DriverAppStore;

    const switches = () => communicationPreferenceList.map((el) => (
      <PreferenceSwitch
        key={el.preferenceKey}
        preferenceKey={el.preferenceKey}
        title={el.title}
        description={el.description}
        loading={loading}
        switchState={communicationsPreferences[el.preferenceKey]}
        onSwitchClick={this.switchClickHandler}
      />
    ));

    return (
      <Paper>
        <Grid container direction='column' alignItems='center'>
          <Grid item container direction='row' xs={11}>
            <Grid item xs={12}>
              <Typography variant='h6' component='h3' gutterBottom>
                {email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {communicationsPreferences && switches()}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withRouter(CommunicationsPreferences);
