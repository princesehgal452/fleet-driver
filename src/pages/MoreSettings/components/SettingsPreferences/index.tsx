import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card } from '@material-ui/core';
import ApiLayer from 'services/APIServices/ApiLayer';
import CardTitle from 'components/v3/CardTitle';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import EquipmentTypePicker from 'components/v3/EquipmentTypePicker';
import ExpansionSection from 'components/v3/ExpansionSection';
import Loader from 'components/v3/Loader';
import { UPDATE_SETTING_SUCCESS, UPDATE_SETTING_ERROR } from 'constants/Messages';
import SettingsCommunication from '../SettingsCommunication';
import SettingsDocuments from '../SettingsDocuments';
import SettingsRates from '../SettingsRates';
import SettingsRadius from '../SettingsRadius';
import SettingsPreferredLanes from '../SettingsPreferredLanes';
import styles from './styles';

type ISettingsPreferencesProps = IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SettingsPreferences extends React.Component<ISettingsPreferencesProps> {
  state = {
    submitLoading: false,
  };
  handleEquipmentsChange = (equipmentTypes) => {
    const settings = {
      equipmentTypeList: equipmentTypes,
    };
    this.setState({
      submitLoading: true,
    }, () => {
      this.submitData(settings);
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
    const { classes, driverAppStore: { userStore: { FOUser } } } = this.props;
    return (
      <Card className={classes.root}>
        <CardTitle>
          PREFERENCES
        </CardTitle>
        <ExpansionSection label='RATES'>
          <SettingsRates />
        </ExpansionSection>
        <ExpansionSection
          label='EQUIPMENT(S)'
          noPadding
        >
          <EquipmentTypePicker
            equipmentTypes={FOUser.equipmentTypeList}
            onChange={this.handleEquipmentsChange}
            disabled={submitLoading}
          />
        </ExpansionSection>
        <ExpansionSection label='PREFERRED LANES'>
          <SettingsPreferredLanes />
        </ExpansionSection>
        <ExpansionSection label='RADIUS OPTIONS'>
          <SettingsRadius />
        </ExpansionSection>
        <ExpansionSection label='DOCUMENTS'>
          <SettingsDocuments />
        </ExpansionSection>
        <ExpansionSection label='COMMUNICATION'>
          <SettingsCommunication />
        </ExpansionSection>
        <Loader loading={submitLoading} />
      </Card>
    );
  }
}

export default withStyles(styles)(SettingsPreferences);
