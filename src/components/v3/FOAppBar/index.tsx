import React, { ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import useStyles from './styles';

const navigateBack = (history: History) => () => {
  history.back();
};

interface IFOAppBarOwnProps {
  pageTitle: string | ReactNode;
  actionButtons?: ReactNode;
  showBackButton?: boolean;
  noBorder?: boolean;
  hideNotificationButton?: boolean;
  secondaryActionButtons?: ReactNode;
  backButtonAction?: () => void;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

type IFOAppBarProps = IFOAppBarOwnProps & RouteComponentProps;

const FOAppBar = inject('driverAppStore')(observer((
  {
    position = 'sticky',
    pageTitle,
    actionButtons,
    showBackButton,
    hideNotificationButton = false,
    backButtonAction,
    secondaryActionButtons,
    noBorder,
    history,
  }: IFOAppBarProps,
) => {
  const classes = useStyles({ secondaryActionButtons, noBorder });

  return (
    <AppBar position={position} color='transparent' elevation={0} className={classes.root}>
      <Toolbar className={classes.toolbarRoot}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <Grid item>
            {
              !showBackButton
                ? actionButtons
                : <KeyboardBackspaceIcon onClick={backButtonAction || navigateBack(history)} className={classes.backButton} />
            }
          </Grid>
          <Grid item>
            <Typography variant='h6' color='inherit' className={classes.title}>
              {pageTitle}
            </Typography>
          </Grid>
          <Grid item>
            {!hideNotificationButton && (
              <div className={classes.notificationContainer}>
                <NotificationsNoneIcon className={classes.notificationIcon} />
                <div className={classes.notificationDot} />
              </div>
            )}
          </Grid>
          {
            secondaryActionButtons && (
              <Grid item xs={12} className={classes.secondaryActionContainer}>
                {secondaryActionButtons}
              </Grid>
            )
          }
        </Grid>
      </Toolbar>
    </AppBar>
  );
}));

export default withRouter(FOAppBar);
