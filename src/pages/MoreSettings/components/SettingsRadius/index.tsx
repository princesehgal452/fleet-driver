import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import ApiLayer from 'services/APIServices/ApiLayer';
import SliderField from 'components/v3/Form/SliderField';
import Loader from 'components/v3/Loader';
import { DEFAULT_RADIUS, RADIUS_MAX_LIMIT } from 'constants/Radius';
import { UPDATE_SETTING_SUCCESS, UPDATE_SETTING_ERROR } from 'constants/Messages';
import MobxSettingsRates from './form.class';

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
    MobxSettingsRates.$('pickupRadius').set(userStore.FOUser.pickupRadius || DEFAULT_RADIUS);
    MobxSettingsRates.$('dropoffRadius').set(userStore.FOUser.dropoffRadius || DEFAULT_RADIUS);
  };

  handleSaveField = (field) => {
    const settings = {
      [field.name]: field.value,
    };

    MobxSettingsRates.validate().then(({ isValid }) => {
      if (isValid) {
        this.setState({
          submitLoading: true,
        }, () => {
          this.submitData(settings);
        });
      }
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
            <SliderField
              field={MobxSettingsRates.$('pickupRadius')}
              max={RADIUS_MAX_LIMIT}
              onChange={this.handleSaveField}
              bottomLabels={['', 'Miles']}
              valueLabelDisplay='on'
            />
            <SliderField
              field={MobxSettingsRates.$('dropoffRadius')}
              max={RADIUS_MAX_LIMIT}
              onChange={this.handleSaveField}
              bottomLabels={['', 'Miles']}
              valueLabelDisplay='on'
            />
          </form>
        </Grid>
        <Loader loading={submitLoading} />
      </Grid>
    );
  }
}

export default SettingsRates;
