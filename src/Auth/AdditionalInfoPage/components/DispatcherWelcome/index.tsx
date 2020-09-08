import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { UserStore } from '../../../../DriverApp/store/UserStore';
import HappyMan from '../../../../assets/images/png/register-page/man_happy.png';


const formName = 'dispatcherWelcomeForm';

interface IDispatcherWelcomeOwnProps {
  formRef: () => void;
  userStore: UserStore;
}

type IDispatcherWelcomeProps = IDispatcherWelcomeOwnProps & InjectedFormProps;

class DispatcherWelcome extends React.Component<IDispatcherWelcomeOwnProps> {

  render() {
    const { formRef, userStore } = this.props;
    return (
      <form className='form-container' ref={formRef}>
        <div className='additional-info-form'>
          <div className='additional-info-form__header'>
            <div className='title-section'>
              <Grid container justify='center' direction='column'>
                <Typography variant='caption' align='center' className='form-title'>
                  Welcome, {userStore.FOUser.displayName}
                </Typography>
                {/*<br />*/}
                {/*<Typography variant='caption' align='center' className='form-title' style={{ color: '#0277BD' }}>*/}
                  {/*Not you?*/}
                {/*</Typography>*/}
                <div className='image-section'>
                  <img src={HappyMan} alt='happy' />
                </div>
                <Typography variant='caption' align='center' className='form-title'>
                  Let’s set up your Dispatcher account
                </Typography>
              </Grid>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const DispatcherWelcomeForm = reduxForm({
  form: formName,
  destroyOnUnmount: true, // <------ dont preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(DispatcherWelcome);

const DispatcherWelcomeConnect = connect(
  null,
  null,
  null,
  { forwardRef: true },
)(DispatcherWelcomeForm);

export default DispatcherWelcomeConnect;
