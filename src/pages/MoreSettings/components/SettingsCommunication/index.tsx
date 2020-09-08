import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, withStyles, WithStyles } from '@material-ui/core';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import TextField from 'components/v3/Form/TextField';
import SwitchField from 'components/v3/Form/SwitchField';
import Loader from 'components/v3/Loader';
import { UPDATE_SETTING_SUCCESS, UPDATE_SETTING_ERROR } from 'constants/Messages';
import MobxSettingsCommunication from './form.class';
import styles from './styles';

interface ISettingsCommunicationOwnProps {
  submitHandler?: Function;
  loading?: boolean;
  setSignUp?: () => void;
}

type ISettingsCommunicationProps = ISettingsCommunicationOwnProps & IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SettingsCommunication extends React.Component<ISettingsCommunicationProps> {
  state = {
    submitLoading: false,
  };
  componentDidMount() {
    this.resetForm();
  }

  resetForm = () => {
    const { driverAppStore: { userStore: { FOUser } } } = this.props;
    const { communicationsPreferences: preferences } = FOUser;
    MobxSettingsCommunication.reset();
    MobxSettingsCommunication.$('contact_email').set(preferences.contact_email);
    MobxSettingsCommunication.$('brf_certified_recommendations').set(preferences.brf_certified_recommendations || true);
    MobxSettingsCommunication.$('load_request_responses').set(preferences.load_request_responses || true);
    MobxSettingsCommunication.$('scientific_recommendations').set(preferences.scientific_recommendations || true);
  };

  handleSaveField = (field) => {
    this.setState({
      submitLoading: true,
    }, () => {
      this.submitData(field);
    });
  };

  submitData = async (field) => {
    const { driverAppStore } = this.props;
    const {
      snackbarStore: { enqueueSnackbarStore },
      userStore: { updateCommunicationPreference },
    } = driverAppStore as DriverAppStore;
    try {
      await updateCommunicationPreference(field.name, field.value);
      enqueueSnackbarStore(UPDATE_SETTING_SUCCESS, { variant: 'success' });
    } catch (e) {
      enqueueSnackbarStore(UPDATE_SETTING_ERROR, { variant: 'error' });
    }
    this.setState({
      submitLoading: false,
    });
  };

  render() {
    const { submitLoading } = this.state;
    return (
      <form
        noValidate
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              field={MobxSettingsCommunication.$('contact_email')}
              editable
              variant='outlined'
              onSave={this.handleSaveField}
            />
          </Grid>
          <Grid item xs={12}>
            <SwitchField
              field={MobxSettingsCommunication.$('brf_certified_recommendations')}
              onChange={this.handleSaveField}
            />
          </Grid>
          <Grid item xs={12}>
            <SwitchField
              field={MobxSettingsCommunication.$('load_request_responses')}
              onChange={this.handleSaveField}
            />
          </Grid>
          <Grid item xs={12}>
            <SwitchField
              field={MobxSettingsCommunication.$('scientific_recommendations')}
              onChange={this.handleSaveField}
            />
          </Grid>
        </Grid>
        <Loader loading={submitLoading} />
      </form>
    );
  }
}

export default withStyles(styles)(SettingsCommunication);
