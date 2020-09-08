import React from 'react';
import { inject, observer } from 'mobx-react';
import { InputAdornment, Box, CircularProgress } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import ApiLayer from 'services/APIServices/ApiLayer';
import TextField from 'components/v3/Form/TextField';
import PageSubtitle from 'components/v3/PageSubtitle';
import { SEND_TRACKING_SUCCESS, SEND_TRACKING_ERROR } from 'constants/Messages';
import MobxSendTrackingLink from './form.class';

type ISendTrackingLinkProps = IDriverAppStore;

@inject('driverAppStore')
@observer
class SendTrackingLink extends React.Component<ISendTrackingLinkProps> {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    MobxSendTrackingLink.reset();
  }

  handleSaveField = (e) => {
    MobxSendTrackingLink.onSubmit((e), {
      onSuccess: () => {
        this.setState({ isLoading: true });
        this.submitData(MobxSendTrackingLink.values());
      },
    });
  };

  submitData = async (settings) => {
    const { driverAppStore } = this.props;
    const {
      snackbarStore: { enqueueSnackbarStore },
      userStore: { FOUser: { truck } },
    } = driverAppStore as DriverAppStore;
    const formValues = {
      shortCode: truck.shortCode,
      ...settings,
    };
    try {
      await ApiLayer.sendTrackingLink(formValues);
      this.setState({ isLoading: false });
      MobxSendTrackingLink.reset();
      enqueueSnackbarStore(SEND_TRACKING_SUCCESS, { variant: 'success' });
    } catch (e) {
      this.setState({ isLoading: false });
      enqueueSnackbarStore(SEND_TRACKING_ERROR, { variant: 'error' });
    }
  };

  render() {
    const { isLoading } = this.state;
    const endAdornment = MobxSendTrackingLink.$('targetEmail').value && (
      <InputAdornment position='start'>
        {
          isLoading
            ? <CircularProgress size={20} />
            : <SendIcon color='inherit' onClick={this.handleSaveField} />
        }
      </InputAdornment>
    );

    return (
      <Box px={2} pt={2}>
        <PageSubtitle title='Partner Email' mb={1.5} />
        <form noValidate>
          <TextField
            field={MobxSendTrackingLink.$('targetEmail')}
            InputProps={{
              endAdornment,
            }}
            variant='outlined'
            size='small'
          />
        </form>
      </Box>
    );
  }
}

export default SendTrackingLink;
