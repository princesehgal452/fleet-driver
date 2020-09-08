import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import TermsAndConditionsText from '../../../components/TermsAndConditionsContainer/TermsAndConditionsText';
import FOTransitionUp from '../../../components/FOTransitionUp';
import { getAppContainer } from '../../../utils/utility';


const toggleTAC = (setShowTAC: Dispatch<SetStateAction<boolean>>, currentState: boolean) => () => setShowTAC(!currentState);

const TermsAndConditionsButton = memo(() => {
  const [showTAC, setShowTAC] = useState(false);

  return (
    <>
      <Typography color='secondary' onClick={toggleTAC(setShowTAC, showTAC)}>Terms of Service</Typography>
      <Dialog open={showTAC} TransitionComponent={FOTransitionUp} container={getAppContainer}>
        <DialogTitle>
          Terms of Service
        </DialogTitle>
        <DialogContent>
          <TermsAndConditionsText />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={toggleTAC(setShowTAC, showTAC)}>Continue</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default TermsAndConditionsButton;
