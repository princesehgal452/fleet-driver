import React, { ReactNode } from 'react';
import { DialogContent, DialogTitle, makeStyles, Theme } from '@material-ui/core';
import FOAppBarPage from '../../FOAppBar/FOAppBarPage';
import classNames from 'classnames';


const useStyles = makeStyles((theme: Theme) => ({
  noGutter: {
    padding: 0,
  },
}));

export interface IFOFullPageDialogContentProps {
  dialogTitle: string;
  closeHandler: () => void;
  actionButtons?: ReactNode;
  backButtonIcon?: ReactNode;
  children: ReactNode;
  appbarDisabled?: boolean;
}

const FOFullPageDialogContent = ({ dialogTitle, closeHandler, actionButtons, backButtonIcon, children, appbarDisabled }: IFOFullPageDialogContentProps) => {
  const classes = useStyles();

  return (
    <>
      <DialogTitle disableTypography className={classes.noGutter}>
        {!appbarDisabled &&
          <FOAppBarPage
            pageTitle={dialogTitle}
            backButtonIcon={backButtonIcon}
            backButtonAction={closeHandler}
            actionButtons={actionButtons}
            showBackButton
            hideSettingsButton
          />}
      </DialogTitle>
      <DialogContent className={classNames(classes.noGutter)}>
        {children}
      </DialogContent>
    </>
  );
};

export default FOFullPageDialogContent;
