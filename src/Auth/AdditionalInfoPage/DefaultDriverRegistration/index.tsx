import React from 'react';
import { observer } from 'mobx-react';
import SwipeableViews from 'react-swipeable-views';
import McNumberPage from '../components/McNumberPage';
import PersonalInfoPage from '../components/PersonalInfoPage';
import PreferredLanePage from '../components/PreferredLanePage';
import TruckEquipmentPage from '../components/TruckEquipmentPage';
import DocumentsUploadPage from '../components/DocumentsUploadPage';
import FinalPage from '../components/FinalPage';
import { registrationStatesDefaultDriver } from '../../../services/constants';
import RegistrationStepper from '../RegistrationStepper';
import { UserStore } from '../../../DriverApp/store/UserStore';
import TermsAndConditionsContainer from '../../../components/TermsAndConditionsContainer';
import DispatcherInformation from '../components/DispatcherInformation';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';


interface IDefaultDriverRegistration {
  userStore: UserStore;
  preferredLanesSectionName: string;
  page: number;
  maxPage: number;
  submitting: boolean;
  checkedAll: boolean;
  setCheckedAllState: (state) => void;
  finalPageHandler: () => void;
  setFormRef: (el) => void;
  setCheckAllRef: (el) => void;
  nextPageHandler: (...args) => void;
  prevPageHandler: () => void;
  submitHandler: () => void;
}

const DefaultDriverRegistration = observer(({ page, maxPage, submitting, checkedAll, preferredLanesSectionName,
    setCheckedAllState, setFormRef, nextPageHandler, userStore, finalPageHandler, prevPageHandler, submitHandler, setCheckAllRef }: IDefaultDriverRegistration) => (
    <div className='form-wizard'>
      {page >= registrationStatesDefaultDriver.check && page <= maxPage && (
        <>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={8} lg={6}>
              <SwipeableViews
                index={page}
                disabled
                slideStyle={{ overflow: 'hidden' }}
              >
                <div />
                {/* <McNumberPage
                  ref={page === registrationStatesDefaultDriver.mcNumber ? setFormRef : undefined}
                  onSubmit={nextPageHandler}
                  loading={submitting}
                /> */}
                {/* <PersonalInfoPage
                  ref={page === registrationStatesDefaultDriver.personalInfo ? setFormRef : undefined}
                  onSubmit={nextPageHandler}
                  loading={submitting}
                /> */}
                {/* <DocumentsUploadPage
                  ref={page === registrationStatesDefaultDriver.documents ? setFormRef : undefined}
                  onSubmit={nextPageHandler}
                  loading={submitting}
                  registrationPage
                /> */}
                <DispatcherInformation
                  ref={page === registrationStatesDefaultDriver.confirmInformation ? setFormRef : undefined}
                  userStore={userStore}
                  loading={submitting}
                  onSubmit={nextPageHandler}
                />
                <TruckEquipmentPage
                  ref={page === registrationStatesDefaultDriver.equipmentList ? setFormRef : undefined}
                  user={page === registrationStatesDefaultDriver.equipmentList ? userStore.FOUser : null}
                  loading={submitting}
                  onSubmit={nextPageHandler}
                />
                {/* <PreferredLanePage
                  ref={page === registrationStatesDefaultDriver.preferredLanes ? setFormRef : undefined}
                  setCheckAllRef={setCheckAllRef}
                  preferredLanesSectionName={preferredLanesSectionName}
                  loading={submitting}
                  onSubmit={nextPageHandler}
                  checkedAll={checkedAll}
                  setCheckedAllState={setCheckedAllState}
                /> */}
              </SwipeableViews>
              {/* 
              TODO: Might be required for UI optimization
              <RegistrationStepper
                page={page}
                maxPage={maxPage}
                onNextClick={submitHandler}
                onBackClick={prevPageHandler}
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
          </Grid>
        </>
      )}
    </div>
  )
);

export default DefaultDriverRegistration;
