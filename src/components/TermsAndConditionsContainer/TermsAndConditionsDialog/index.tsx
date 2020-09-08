import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { DriverAppStore } from '../../../DriverApp/store/DriverAppStore';
import TermsAndConditionsText from '../TermsAndConditionsText';
import { UserStore } from '../../../DriverApp/store/UserStore';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { getAppContainer } from '../../../utils/utility';


const learnMoreHandler = (setShowFullTAC: Dispatch<SetStateAction<boolean>>) => () => (setShowFullTAC(true));
const acceptHandler = (acceptTAC, onAccept: () => void) => async () => {
  try {
    onAccept();
    await acceptTAC();
  } catch (error) {
  }
};

const toggleSetDialog = (setShowDialog: Dispatch<SetStateAction<boolean>>, currentShowDialogState: boolean) => () => (
  setShowDialog(!currentShowDialogState)
);

const checkIfTACAccepted = (userStore: UserStore, showTAC: () => void) => () => {
  const { defaultDriver, dispatcher, acceptedTermsAndConditions, dispatcherCompletedOnboarding, defaultDriverCompletedOnboarding } = userStore;
  if (!acceptedTermsAndConditions && ((defaultDriver && defaultDriverCompletedOnboarding) || (dispatcher && dispatcherCompletedOnboarding))) {
    showTAC();
  }
};

interface ITermsAndConditionsDialogOwnProps {
}

type ITermsAndConditionsDialogProps = ITermsAndConditionsDialogOwnProps & IDriverAppStore;

const TermsAndConditionsDialog = inject('driverAppStore')(observer(({ driverAppStore }: ITermsAndConditionsDialogProps) => {
  const { userStore } = driverAppStore as DriverAppStore;
  const [showDialog, setShowDialog] = useState(false);
  const [showFullTAC, setShowFullTAC] = useState(false);

  useEffect(checkIfTACAccepted(userStore, toggleSetDialog(setShowDialog, showDialog)), []);

  return (
    <Dialog open={showDialog} container={getAppContainer}>
      <DialogTitle>
        Terms of Service
      </DialogTitle>
      <DialogContent>
        {showFullTAC
          ? (
            <TermsAndConditionsText />
          ) : (
            <>
              We have recently added our Terms of Service.
              You must accept the terms of service in order to continue using the
              app.
            </>
          )}
      </DialogContent>
      <DialogActions>
        {!showFullTAC && (<Button color='secondary' onClick={learnMoreHandler(setShowFullTAC)}>Learn More</Button>)}
        <Button
          color='primary'
          variant='contained'
          onClick={acceptHandler(userStore.acceptTAC, toggleSetDialog(setShowDialog, showDialog))}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}));

export default TermsAndConditionsDialog;
