import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import Typography from '@material-ui/core/Typography';
import { required, phoneExactLength10 } from '../../../../services/Validations';
import FOTextField from '../../../../components/FOTextField';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TruckPNG from '../../../../assets/images/png/register-page/truck_icon_green_white.png';

import '../style.scss';


const styles = (theme: Theme) => ({
  formInfo: {
    height: 'auto !important',
    marginTop: '28%',
    marginBottom: theme.spacing(6)
  },
  formFieldCols: {
    padding: '12px 0 !important'
  }
});

const formName = 'dispatcherInformationForm';

interface IDispatcherInformationOwnProps {
  handleSubmit: () => void;
  formRef: Element;
}

type IDispatcherInformationProps = IDispatcherInformationOwnProps & WithStyles<typeof styles>;

class DispatcherInformationForm extends React.Component<IDispatcherInformationProps> {
  render() {
    const { handleSubmit, formRef, classes } = this.props;
    return (
      <form className='form-container' ref={formRef} onSubmit={handleSubmit}>
        <div className={classNames('additional-info-form ' + classes.formInfo)}>
          <div className='additional-info-form__header'>
            <div className='image-section'>
              <img src={TruckPNG} alt='Truck Icon' />
            </div>
          </div>
          <div className='additional-info-form__content'>
            <Grid container className='input-section' spacing={1}>
              <Grid item xs={12} className={classNames('details-col ' + classes.formFieldCols)}>
                <Field
                  component={FOTextField}
                  className='input-white'
                  name='phone'
                  label='COMPANY PHONE NUMBER'
                  placeholder='+15555555555'
                  fullWidth
                  validate={[required, phoneExactLength10]}
                />
              </Grid>
              <Grid item xs={12} className={classNames('details-col ' + classes.formFieldCols)}>
                <Field
                  component={FOTextField}
                  className='input-white'
                  name='dotNumber'
                  label='DOT NUMBER'
                  placeholder='#1234567'
                  type='text'
                  fullWidth
                  disabled={true}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
    );
  }
}

const getInitialValues = () => {
  const { currentUser } = firebase.auth();
  return {
    dotNumber: currentUser ? currentUser['foUser']['truck']?.dotNumber : '',
    phone: currentUser ? (currentUser['foUser']['truck']?.phone || currentUser['foUser'].phone) : '',
  };
};

const DispatcherInformation = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(DispatcherInformationForm);

const DispatcherInformationConnect = connect(
  () => ({
    initialValues: getInitialValues(),
  }),
  null,
  null,
  { forwardRef: true },
)(DispatcherInformation);

export default withStyles(styles)(DispatcherInformationConnect);
