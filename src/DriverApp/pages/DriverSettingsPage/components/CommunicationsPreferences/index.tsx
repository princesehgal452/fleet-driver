import React from 'react';
import { inject, observer } from 'mobx-react';
import { change, Field, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import driverAppStore, { DriverAppStore } from '../../../../store/DriverAppStore';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import SettingsContent from '../SettingsContent';
import SettingsHeader from '../SettingsHeader';
import SettingsTitle from '../SettingsTitle';
import PreferenceSwitch from '../../../../components/PreferenceSwitch';
import { ICommunicationPreferencesListItem } from '../../../../../models/interfaces/shared/ICommunicationPreferencesListItem';
import FOTextField from '../../../../../components/FOTextField';
import { validateEmail } from '../../../../../services/formValidations';
import FOButtonDefault from '../../../../../components/Buttons/FOButtonDefault';


const formName = 'CommunicationsPreferencesForm';

type ICommunicationsPreferencesProps = InjectedFormProps & IDriverAppStore;

interface ICommunicationPreferencesState {
  communicationPreferenceList: ICommunicationPreferencesListItem[];
}

@inject('driverAppStore')
@observer
class CommunicationsPreferences extends React.Component<ICommunicationsPreferencesProps, ICommunicationPreferencesState> {
  state = {
    communicationPreferenceList: [] as ICommunicationPreferencesListItem[],
  };

  componentDidMount() {
    const { driverAppStore } = this.props;
    const { publicStore: { getCommunicationPreferencesList } } = driverAppStore as DriverAppStore;

    this.setState({ communicationPreferenceList: getCommunicationPreferencesList() });
  }

  switchClickHandler = async (name: string, value: boolean) => {
    const { driverAppStore } = this.props;
    const { userStore: { updateCommunicationPreference } } = driverAppStore as DriverAppStore;
    await updateCommunicationPreference(name, value);
  };

  fieldUpdateHandler = async (name: string, value: string) => {
    const { driverAppStore } = this.props;
    const { userStore: { updateCommunicationPreference } } = driverAppStore as DriverAppStore;
    await updateCommunicationPreference(name, value);
  };

  submitHandler = (values) => {
    this.fieldUpdateHandler('contact_email', values.contactEmail);
  };

  render() {
    const { communicationPreferenceList } = this.state;
    const { driverAppStore, handleSubmit, contactEmail } = this.props;
    const { userStore: { FOUser: { communicationsPreferences }, loading } } = driverAppStore as DriverAppStore;

    const switches = communicationPreferenceList.map((el) => (
      <PreferenceSwitch
        key={el.preferenceKey}
        preferenceKey={el.preferenceKey}
        title={el.title}
        description={el.description}
        loading={loading}
        switchState={communicationsPreferences ? communicationsPreferences[el.preferenceKey] : false}
        onSwitchClick={this.switchClickHandler}
      />
    ));

    return (
      <Grid container direction='column'>
        <SettingsHeader>
          <Grid item>
            <SettingsTitle>
              Communication Preferences
            </SettingsTitle>
          </Grid>
        </SettingsHeader>
        <SettingsContent>
          <Grid item xs={12}>
            {switches}
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(this.submitHandler)}>
              <Field
                component={FOTextField}
                // InputProps={{
                //   inputComponent: NumberFormatPhone,
                // }}
                className='settings-form-control'
                name='contactEmail'
                label='Contact Email'
                placeholder='Contact Email'
                fullWidth
                validate={validateEmail}
              />
              {contactEmail && (
                <FOButtonDefault type='submit' className='submit-btn' fullWidth>
                  Save
                </FOButtonDefault>
              )}
            </form>
          </Grid>
        </SettingsContent>
      </Grid>
    );
  }
}

const selector = formValueSelector(formName);

const getInitialValues = () => {
  const store = driverAppStore;
  const { userStore: { FOUser } } = store;
  if (FOUser.communicationsPreferences?.contact_email) {
    return {
      contactEmail: FOUser.communicationsPreferences?.contact_email,
    };
  }
  return {};
};

const CommunicationsPreferencesForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
})(CommunicationsPreferences);

const CommunicationsPreferencesConnect = connect(
  (state) => ({
    initialValues: getInitialValues(),
    contactEmail: selector(state, 'contactEmail'),
  }),
  (dispatch) => bindActionCreators({ change }, dispatch),
)(CommunicationsPreferencesForm);

export default CommunicationsPreferencesConnect;
