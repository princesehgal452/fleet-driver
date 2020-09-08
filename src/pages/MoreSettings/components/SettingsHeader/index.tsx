import React from 'react';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { Box, Avatar } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { getInitialsFromName } from 'utils/StringUtils';
import bgImg from 'assets/images/backgrounds/more-settings-background.png';

const styles = (theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginBottom: 75,
  },
  avatar: {
    width: 90,
    height: 90,
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    fontSize: 40,
    position: 'absolute',
    bottom: -45,
  },
});

type ISettingsHeaderProps = IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SettingsHeader extends React.Component<ISettingsHeaderProps> {
  render() {
    const { classes, driverAppStore: { userStore: { FOUser } } } = this.props;
    const nameInitials = getInitialsFromName(FOUser.displayName);
    return (
      <Box
        height='180px'
        className={classes.root}
      >
        <Avatar className={classes.avatar}>{nameInitials}</Avatar>
      </Box>
    );
  }
}

export default withStyles(styles)(SettingsHeader);
