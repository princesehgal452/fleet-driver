import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import FOAppBar from 'components/v3/FOAppBar';
import TermsOfServiceContent from './components/TermsOfServiceConent';
import styles from './styles';

type ITermsOfServicePageProps = RouteComponentProps & WithStyles<typeof styles>;

const TermsOfServicePage = ({ classes, history }: ITermsOfServicePageProps) => {
  const goBack = () => {
    history.push('/more');
  };
  return (
    <Box className={classes.root}>
      <FOAppBar
        noBorder
        position='static'
        pageTitle={(
          <Box className={classes.title}>Terms of Service</Box>
        )}
        showBackButton
        hideNotificationButton
        backButtonAction={goBack}
      />
      <TermsOfServiceContent />
    </Box>
  );
};

export default withStyles(styles)(withRouter(TermsOfServicePage));
