import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, InputAdornment } from '@material-ui/core';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import ApiLayer from 'services/APIServices/ApiLayer';
import TextField from 'components/v3/Form/TextField';
import Loader from 'components/v3/Loader';
import { UPDATE_SETTING_SUCCESS, UPDATE_SETTING_ERROR } from 'constants/Messages';
import MobxSettingsRates from './form.class';

const DEFAULT_CURRENCY = 'USD';

type ISettingsRatesProps = IDriverAppStore;

@inject('driverAppStore')
@observer
class SettingsRates extends React.Component<ISettingsRatesProps> {
  state = {
    submitLoading: false,
  };
  componentDidMount() {
    this.resetForm();
  }

  resetForm = () => {
    const { driverAppStore: { userStore } } = this.props;
    MobxSettingsRates.reset();
    MobxSettingsRates.$('preferredPerMileRate').set(userStore.FOUser.preferredPerMileRate.price);
  };

  handleSaveField = (field) => {
    const settings = {
      [field.name]: {
        price: Number(field.value),
        currency: DEFAULT_CURRENCY,
      },
    };

    this.setState({
      submitLoading: true,
    }, () => {
      MobxSettingsRates.validate().then(({ isValid }) => {
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
    return (
      <Grid
        container
        direction='row'
      >
        <Grid item xs={12}>
          <form
            noValidate
          >
            <TextField
              field={MobxSettingsRates.$('preferredPerMileRate')}
              editable
              onSave={this.handleSaveField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    /Mile
                  </InputAdornment>),
                startAdornment: (
                  <InputAdornment position='start'>
                    $
                  </InputAdornment>),
              }}
            />
          </form>
        </Grid>
        <Loader loading={submitLoading} />
      </Grid>
    );
  }
}

export default SettingsRates;
