import React from 'react';
import { inject, observer } from 'mobx-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Fade, Grid, InputAdornment, Theme, withStyles, WithStyles } from '@material-ui/core';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import { TRUCKS_EQUIPMENT_TYPES } from '../../../../../services/constants';
import { DriverAppStore } from '../../../../store/DriverAppStore';
import { trackEquipment } from '../../../../../utils/utility';
import { phoneExactLength10, required, requiredArray } from '../../../../../services/Validations';
import FOMultiSelect from '../../../../../components/FOMultiSelect';
import NumberFormatPhone from '../../../../../utils/NumberFormatPhone';
import FOTextField from '../../../../../components/FOTextField';
import FOLoadingSpinner from '../../../../../components/WithFOLoading/FOLoadingSpinner';
import EditIconButton from '../EditIconButton';
import FOButtonSecondary from '../../../../../components/Buttons/FOButtonSecondary';
import SettingsTitle from '../SettingsTitle';
import SettingsContent from '../SettingsContent';
import FOButtonDefault from '../../../../../components/Buttons/FOButtonDefault';
import ReduxNumberFormatCurrency from '../../../../../utils/ReduxNumberFormatCurrency';
import SettingsHeader from '../SettingsHeader';
import ApiLayer from '../../../../../services/APIServices/ApiLayer';


const formName = 'SettingsForm';

const styles = (theme: Theme) => ({
  tosButton: {
    textTransform: 'unset',
    paddingLeft: '0px',
    fontWeight: '400',
    fontSize: '1rem',
    color: 'inherit',
  },
});


type ISettingsPageProps = InjectedFormProps & IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SettingsFormContainer extends React.Component<ISettingsPageProps> {
  state = {
    submitLoading: false,
    editProfile: false,
    editTruck: false,
  };


  getSubmitButton = () => {
    const { valid } = this.props;
    if (valid) {
      return (
        <FOButtonSecondary type='submit' className='submit-btn' fullWidth>
          Save
        </FOButtonSecondary>
      );
    }
    return (
      <FOButtonDefault type='submit' className='submit-btn' fullWidth>
        Save
      </FOButtonDefault>
    );
  };


  toggleProfileEdit = () => {
    const { editProfile } = this.state;
    this.setState({ editProfile: !editProfile });
  };

  toggleTruckEdit = () => {
    const { editTruck } = this.state;
    this.setState({ editTruck: !editTruck });
  };


  submitHandler = (values) => {
    const { driverAppStore } = this.props;
    const { snackbarStore: { enqueueSnackbarStore }, userStore: { setFOUser } } = driverAppStore as DriverAppStore;
    this.setState({
      submitLoading: true,
    });
    const settings = {
      ...values,
      equipmentTypeList: _.isString(values.equipmentTypeList)
        ? values.equipmentTypeList.split(',')
        : values.equipmentTypeList,
      preferredPerMileRate: {
        price: parseFloat(values.preferredPerMileRate),
        currency: 'USD',
      },
    };
    ApiLayer.updateSettings(settings).then((data) => {
      if (data.user) {
        setFOUser(data.user);
        _.each(data.user.equipmentTypeList, trackEquipment);
        this.setState({
          submitLoading: false,
        });
        enqueueSnackbarStore('Settings Updated Succesfully', { variant: 'success' });
      } else {
        this.setState({
          submitLoading: false,
        });
        enqueueSnackbarStore('Sorry, there was an error saving your settings.', { variant: 'error' });
      }
    }).catch((error) => {
      console.log(error);
      this.setState({
        submitLoading: false,
      });
      enqueueSnackbarStore('Sorry, there was an error saving your settings.', { variant: 'error' });
    });
  };

  render() {
    const { handleSubmit, dirty } = this.props;
    const {
      submitLoading, editProfile, editTruck,
    } = this.state;

    return (
      <form onSubmit={handleSubmit(this.submitHandler)}>
        <Grid item xs={12}>
          <Grid container direction='column'>
            <SettingsHeader>
              <Grid item>
                <SettingsTitle>
                  Profile
                </SettingsTitle>
              </Grid>
              <Grid item>
                <EditIconButton editing={editProfile} onClick={this.toggleProfileEdit} />
              </Grid>
            </SettingsHeader>
            <SettingsContent>
              <Grid item xs={12}>
                <Field
                  component={FOTextField}
                  InputProps={{
                    inputComponent: NumberFormatPhone,
                  }}
                  className='settings-form-control'
                  name='phone'
                  label='Mobile Number'
                  placeholder='Mobile Number'
                  fullWidth
                  disabled={!editProfile}
                  validate={[required, phoneExactLength10]}
                />
              </Grid>
            </SettingsContent>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='column'>
            <SettingsHeader>
              <Grid item>
                <SettingsTitle>
                  My Truck
                </SettingsTitle>
              </Grid>
              <Grid item>
                <EditIconButton editing={editTruck} onClick={this.toggleTruckEdit} />
              </Grid>
            </SettingsHeader>
            <Grid container direction='column'>
              <SettingsContent>
                <Field
                  component={FOMultiSelect}
                  className='input-field'
                  name='equipmentTypeList'
                  label='Equipment(s)'
                  fullWidth
                  multi
                  native='true'
                  disabled={!editTruck}
                  validate={[requiredArray]}
                  options={TRUCKS_EQUIPMENT_TYPES}
                  hideClearIcon
                />
              </SettingsContent>
              <SettingsContent>
                <Field
                  component={FOTextField}
                  className='settings-form-control'
                  name='preferredPerMileRate'
                  label='Preferred Rate'
                  placeholder='Preferred Rate'
                  disabled={!editTruck}
                  InputProps={{
                    inputComponent: ReduxNumberFormatCurrency,
                    endAdornment: (
                      <InputAdornment position='end'>
                        ($)/Mile
                      </InputAdornment>),
                    startAdornment: (
                      <InputAdornment position='start'>
                        $
                      </InputAdornment>),
                  }}
                  fullWidth
                  validate={[required]}
                />
              </SettingsContent>
            </Grid>
          </Grid>
        </Grid>
        <Fade in={dirty} mountOnEnter unmountOnExit>
          <Grid item xs={12}>
            <div className='driver-settings-page__submitButton'>
              <FOLoadingSpinner loading={submitLoading}>
                {this.getSubmitButton()}
              </FOLoadingSpinner>
            </div>
          </Grid>
        </Fade>
      </form>
    );
  }
}

const getInitialValues = () => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    return {
      phone: currentUser['foUser']?.phone?.replace('+1', '') || '',
      equipmentTypeList: currentUser['foUser']?.equipmentTypeList,
      preferredPerMileRate: currentUser['foUser']?.preferredPerMileRate
        ? currentUser['foUser']?.preferredPerMileRate?.price : '',
    };
  }
};

const SettingsForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
})(withStyles(styles)(SettingsFormContainer));

const SettingsConnect = connect(() => ({
  initialValues: getInitialValues(),
}))(SettingsForm);

export default withRouter(SettingsConnect);
