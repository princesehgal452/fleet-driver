import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { UserStore } from '../../../DriverApp/store/UserStore';
import ConfigStore from '../../../DriverApp/store/ConfigStore';
import { registrationStatesDispatcher } from '../../../services/constants';
import DispatcherDriverSelect from '../components/DispatcherDriverSelect';
import DispatcherInformation from '../components/DispatcherInformation';

const styles = () => ({
  gridContainer: {
    height: '100%',
  },
});

interface IDispatcherRegistration extends WithStyles<typeof styles> {
  userStore: UserStore;
  configStore: ConfigStore;
  preferredLanesSectionName: string;
  page: number;
  maxPage: number;
  submitting: boolean;
  checkedAll: boolean;
  setCheckedAllState: (state) => void;
  setFormRef: (el) => void;
  setCheckAllRef: (el) => void;
  nextPageHandler: (...args) => void;
  prevPageHandler: () => void;
  submitHandler: () => void;
}

const DispatcherRegistration = observer(({
  page, maxPage, submitting, preferredLanesSectionName,
  setCheckedAllState, setFormRef, nextPageHandler, userStore, configStore, checkedAll,
  prevPageHandler, submitHandler,
  setCheckAllRef, classes,
}: IDispatcherRegistration) => (
  <div className='form-wizard'>
    {page >= registrationStatesDispatcher.check && page <= maxPage
    && (
      <Grid container className={classes.gridContainer}>
        <SwipeableViews index={page} disabled slideStyle={{ overflow: 'hidden' }}>
          <div />
          <DispatcherInformation
            ref={page === registrationStatesDispatcher.confirmInformation ? setFormRef : undefined}
            userStore={userStore}
            onSubmit={nextPageHandler}
            loading={submitting}
          />
          <DispatcherDriverSelect
            ref={page === registrationStatesDispatcher.selectDrivers ? setFormRef : undefined}
            userStore={userStore}
            configStore={configStore}
            onSubmit={nextPageHandler}
            loading={submitting}
          />
          {/* <DispatcherDriverSelectConfirm
            ref={page === registrationStatesDispatcher.confirmDrivers ? setFormRef : undefined}
            userStore={userStore}
            onSubmit={nextPageHandler}
            loading={submitting}
          />
          <McNumberPage
            ref={page === registrationStatesDispatcher.mcNumber ? setFormRef : undefined}
            onSubmit={nextPageHandler}
            loading={submitting}
          />
          <DocumentsUploadPage
            ref={page === registrationStatesDispatcher.documents ? setFormRef : undefined}
            onSubmit={nextPageHandler}
            loading={submitting}
            registrationPage
          />
          <PreferredLanePage
            ref={page === registrationStatesDispatcher.preferredLanes ? setFormRef : undefined}
            setCheckAllRef={setCheckAllRef}
            preferredLanesSectionName={preferredLanesSectionName}
            loading={submitting}
            onSubmit={nextPageHandler}
            checkedAll={checkedAll}
            setCheckedAllState={setCheckedAllState}
          /> */}
        </SwipeableViews>
        {/* <RegistrationStepper
          page={page}
          maxPage={maxPage}
          onNextClick={submitHandler}
          onBackClick={prevPageHandler}
          disabled={submitting}
        /> */}
        <Button
          onClick={submitHandler}
          fullWidth
          variant='contained'
          color='primary'
          disabled={submitting}
        >
          Next
        </Button>
      </Grid>
    )}
  </div>
));

export default withStyles(styles)(DispatcherRegistration);
