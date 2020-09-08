import React from 'react';
import { observer } from 'mobx-react';
import SwipeableViews from 'react-swipeable-views';
import RegistrationStepper from '../../../Auth/AdditionalInfoPage/RegistrationStepper';
import DispatcherDriverSelect from '../../../Auth/AdditionalInfoPage/components/DispatcherDriverSelect';
import DispatcherDriverSelectConfirm from '../../../Auth/AdditionalInfoPage/components/DispatcherDriverSelectConfirm';
import { UserStore } from '../../store/UserStore';
import { SnackbarStore } from '../../store/SnackbarStore';

import './styles.scss';


enum DispatcherSelectConfirmDriversPages {
  select = 1,
  confirm = 2,
}

interface IDispatcherSelectConfirmDriversOwnProps {
  userStore: UserStore;
  snackbarStore: SnackbarStore;
  closeHandler: () => void;
}

@observer
class DispatcherSelectConfirmDrivers extends React.Component<IDispatcherSelectConfirmDriversOwnProps> {
  state = {
    page: DispatcherSelectConfirmDriversPages.select,
    maxPage: DispatcherSelectConfirmDriversPages.confirm,
    submitting: false,
    formRef: null,
  };

  setFormRef = (el) => {
    this.setState({ formRef: el });
  };

  submitHandler = () => {
    const { formRef } = this.state;
    if (formRef) {
      formRef.submit();
    }
  };

  nextPageHandler = async (values) => {
    const { page: currPage } = this.state;
    const { userStore: { updateDispatcherTrucks, getDispatcherDrivers }, closeHandler } = this.props;
    this.setState({
      submitting: true,
    });
    const submitValues = {
      ...values,
    };
    if (currPage === DispatcherSelectConfirmDriversPages.select) {
      this.setNextPage(DispatcherSelectConfirmDriversPages.confirm);
    } else if (currPage === DispatcherSelectConfirmDriversPages.confirm) {
      try {
        await updateDispatcherTrucks(submitValues.drivers || []);
        await getDispatcherDrivers();
        this.setNextPage(DispatcherSelectConfirmDriversPages.confirm);
        closeHandler();
      } catch (error) {
        this.setError(error.message);
      }
    }
  };

  goPrevPage = () => {
    const { page: currentPage } = this.state;
    this.setState({
      page: currentPage - 1,
    });
  };

  setNextPage = (pageNumber: number) => {
    this.setState({
      page: pageNumber,
      submitting: false,
    });
  };

  setError = (message?: string) => {
    const { snackbarStore: { enqueueSnackbarStore } } = this.props;
    this.setState({
      submitting: false,
    });
    enqueueSnackbarStore(
      message || 'Error Submitting. Please try again.', { variant: 'error' });
  };

  render() {
    const { page, maxPage, submitting } = this.state;
    const { userStore } = this.props;
    return (
      <div className='form-wizard'>
        <SwipeableViews index={page} disabled>
          <div />
          <DispatcherDriverSelect
            ref={page === DispatcherSelectConfirmDriversPages.select ? this.setFormRef : undefined}
            userStore={userStore}
            onSubmit={this.nextPageHandler}
            loading={submitting}
          />
          <DispatcherDriverSelectConfirm
            ref={page === DispatcherSelectConfirmDriversPages.confirm ? this.setFormRef : undefined}
            userStore={userStore}
            onSubmit={this.nextPageHandler}
            loading={submitting}
          />
        </SwipeableViews>
        <RegistrationStepper
          page={page}
          maxPage={maxPage}
          onNextClick={this.submitHandler}
          onBackClick={this.goPrevPage}
          disabled={submitting}
        />
      </div>
    );
  }
}

export default DispatcherSelectConfirmDrivers;
