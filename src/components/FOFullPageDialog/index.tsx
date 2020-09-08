import React, { memo, ReactNode } from 'react';
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import FOTransitionUp from '../FOTransitionUp';
import FOFullPageDialogContent, { IFOFullPageDialogContentProps } from './FOFullPageDialogContent';
import { getAppContainer } from '../../utils/utility';


interface IFOFullPageDialogOwnProps {
  open: boolean;
  dialogActionContent?: ReactNode;
}

type IFOFullPageDialogProps = IFOFullPageDialogOwnProps & IFOFullPageDialogContentProps;

const FOFullPageDialog = memo(({ open, children, dialogActionContent, ...other }: IFOFullPageDialogProps) => (
  <Dialog open={open} fullScreen TransitionComponent={FOTransitionUp} container={getAppContainer}>
    <FOFullPageDialogContent {...other}>
      {children}
    </FOFullPageDialogContent>
    {dialogActionContent && (
      <DialogActions>
        {dialogActionContent}
      </DialogActions>
    )}
  </Dialog>
));

export default FOFullPageDialog;
