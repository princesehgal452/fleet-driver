import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Card, withStyles, WithStyles, InputAdornment } from '@material-ui/core';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import ApiLayer from 'services/APIServices/ApiLayer';
import TextField from 'components/v3/Form/TextField';
import CardTitle from 'components/v3/CardTitle';
import Loader from 'components/v3/Loader';
import { UPDATE_SETTING_SUCCESS, UPDATE_SETTING_ERROR } from 'constants/Messages';
import MobxSettingsProfile from './form.class';
import styles from './styles';

type ISettingsProfileProps = IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SettingsProfile extends React.Component<ISettingsProfileProps> {
  state = {
    submitLoading: false,
  };
  componentDidMount() {
    this.resetForm();
  }

  resetForm = () => {
    const { driverAppStore: { userStore } } = this.props;
    MobxSettingsProfile.reset();
    MobxSettingsProfile.$('displayName').set(userStore.FOUser.displayName);
    MobxSettingsProfile.$('email').set(userStore.FOUser.email);
    MobxSettingsProfile.$('phone').set(userStore.FOUser.phone.replace('+1', ''));
  };

  handleSaveField = (field) => {
    const settings = {
      [field.name]: field.value,
    };

    this.setState({
      submitLoading: true,
    }, () => {
      MobxSettingsProfile.validate().then(({ isValid }) => {
        if (isValid) {
          this.submitData(settings);
        }
      });
    });
  };

  submitData = (settings) => {
    const { driverAppStore } = this.props;
    const {
      snackbarStore: { enqueueSnackbarStore },
      userStore: { setFOUser },
    } = driverAppStore as DriverAppStore;
    ApiLayer.updateSettings(settings).then((data) => {
      if (data.user) {
        setFOUser(data.user);
        this.setState({
          submitLoading: false,
        });
        enqueueSnackbarStore(UPDATE_SETTING_SUCCESS, { variant: 'success' });
      } else {
        this.setState({
          submitLoading: false,
        });
        enqueueSnackbarStore(UPDATE_SETTING_ERROR, { variant: 'error' });
      }
    }).catch(() => {
      this.setState({
        submitLoading: false,
      });
      enqueueSnackbarStore(UPDATE_SETTING_ERROR, { variant: 'error' });
    });
  };

  render() {
    const { submitLoading } = this.state;
    const { classes } = this.props;
    return (
      <form
        noValidate
      >
        <Card className={classes.formContainer}>
          <Grid
            container
            direction='row'
          >
            <Grid item xs={12}>
              <CardTitle className={classes.cardTitle}>
                PROFILE
              </CardTitle>
            </Grid>
            <Grid item xs={12}>
              <TextField
                field={MobxSettingsProfile.$('displayName')}
                editable
                onSave={this.handleSaveField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                field={MobxSettingsProfile.$('email')}
                disabled
                onSave={this.handleSaveField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                field={MobxSettingsProfile.$('phone')}
                phoneNumber
                editable
                onSave={this.handleSaveField}
              />
            </Grid>
          </Grid>
          <Loader loading={submitLoading} />
        </Card>
      </form>
    );
  }
}

export default withStyles(styles)(SettingsProfile);
