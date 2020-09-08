import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { Theme, WithStyles, withStyles, WithTheme } from '@material-ui/core/styles';


const styles = (theme: Theme) => ({
  root: {
    position: 'fixed' as 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    marginBottom: theme.spacing(6),
    zIndex: theme.zIndex.appBar,
  },
});

interface IFloatingActionOwnProps {
  show: boolean;
  icon: ReactNode;
}

type IFloatingActionProps = IFloatingActionOwnProps & WithTheme & WithStyles<typeof styles>;

@observer
class FloatingAction extends React.Component<IFloatingActionProps> {
  get transitionDuration() {
    const { theme } = this.props;
    return ({
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    });
  }

  render() {
    const { show, icon, classes } = this.props;
    return (
      <Zoom in={show} timeout={this.transitionDuration} unmountOnExit>
        <Fab className={classes.root} color='primary'>
          {icon}
        </Fab>
      </Zoom>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FloatingAction);
