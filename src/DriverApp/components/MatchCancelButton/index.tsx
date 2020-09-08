import React, { Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import Load from '../../../models/dataStructures/Load';
import FOBottomSheet from '../../../components/FOBottomSheet';
import MatchCancelButtonDialogContent from './MatchCancelButtonDialogContent';


const toggleSetDialogHandler = (showDialog: boolean, setshowDialog: Dispatch<SetStateAction<boolean>>) => () => {
  setshowDialog(!showDialog);
};

const cancelHandler = (load: Load, setLoading: Dispatch<SetStateAction<boolean>>, toggleSetDialog: () => void) => async () => {
  const { cancelShipment } = load;
  try {
    setLoading(true);
    await cancelShipment();
    toggleSetDialog();
  } catch (e) {

  } finally {
    setLoading(false);
  }
};

interface IMatchCancelButtonProps {
  load: Load;
}

const MatchCancelButton = observer(({ load }: IMatchCancelButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleSetDialog = toggleSetDialogHandler(showDialog, setShowDialog);

  return (
    <>
      <Button fullWidth variant='contained' onClick={toggleSetDialog}>Cancel</Button>
      <FOBottomSheet open={showDialog} closeHandler={toggleSetDialog}>
        <MatchCancelButtonDialogContent
          loading={loading}
          goBackHandler={toggleSetDialog}
          cancelHandler={cancelHandler(load, setLoading, toggleSetDialog)}
        />
      </FOBottomSheet>
    </>
  );
});

export default MatchCancelButton;
