import React, { memo, ReactNode } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOTransitionUp from '../FOTransitionUp';
import { getAppContainer } from '../../utils/utility';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      position: 'absolute' as 'absolute',
      bottom: 0,
      margin: 0,
    },
  },
}));

interface IFOBottomSheetOwnProps {
  open: boolean;
  closeHandler?: () => void;
  children: ReactNode;
}

type IFOBottomSheetProps = IFOBottomSheetOwnProps;

const FOBottomSheet = memo(({ open, closeHandler, children }: IFOBottomSheetProps) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      classes={classes}
      TransitionComponent={FOTransitionUp}
      maxWidth='sm'
      fullWidth container={getAppContainer}
    >
      {children}
    </Dialog>
  );
});

export default FOBottomSheet;
