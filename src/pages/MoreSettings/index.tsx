import React from 'react';
import 'firebase/auth';
import { Box } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import FOAppBar from 'components/v3/FOAppBar';
import SettingsProfile from './components/SettingsProfile';
import SettingsHeader from './components/SettingsHeader';
import SettingsGeneral from './components/SettingsGeneral';
import SettingsPreferences from './components/SettingsPreferences';
import styles from './styles';

type IMoreSettingsProps = WithStyles<typeof styles>;

const MoreSettings = ({ classes }: IMoreSettingsProps) => (
  <Box className={classes.root}>
    <FOAppBar
      noBorder
      position='static'
      pageTitle={(
        <Box className={classes.title}>More</Box>
      )}
    />
    <Box className={classes.bodyContent}>
      <SettingsHeader />
      <SettingsProfile />
      <SettingsPreferences />
      <SettingsGeneral />
    </Box>
  </Box>
);

export default withStyles(styles)(MoreSettings);
