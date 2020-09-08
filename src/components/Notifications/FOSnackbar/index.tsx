import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = (theme: Theme) => {
  return {
    root: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.main,
    },
    bottomPosition: {
      bottom: theme.spacing(7),
    },
    forcePosition: {
      height: 'auto',
    },
  };
};

interface IFOSnackbarOwnProps {
  message: ReactNode;
  position: 'top' | 'bottom';
  open?: boolean;
  closeHandler?: (() => void | Function);
  actionText?: string;
  actionHandler?: (() => void | Function);
}

type IFOSnackbarProps = IFOSnackbarOwnProps & WithStyles<typeof styles>;

interface IFOSnackbarState {
  open: boolean;
}

/**
 * Use it like:
 * { error && <FOSnackbar message='....'/> }
 * This will autoclose in 2 seconds.
 */

class FOSnackbar extends React.PureComponent<IFOSnackbarProps, IFOSnackbarState> {
  static defaultProps = { position: 'top' as 'top' };

  constructor(props: IFOSnackbarProps) {
    super(props);
    this.state = {
      open: props.open === undefined ? true : props.open,
    };
  }

  componentDidUpdate(prevProps: IFOSnackbarProps, prevState: IFOSnackbarState) {
    if (!prevProps.open && this.props.open) {
      this.setState({ open: true });
    }
  }

  handleClose = () => {
    const { closeHandler } = this.props;
    this.closeSnackbar();
    closeHandler && closeHandler();
  };

  handleAction = () => {
    const { actionHandler } = this.props;
    // this.closeSnackbar();
    actionHandler && actionHandler();
  };

  closeSnackbar = () => {
    this.setState({ open: false });
  };

  anchorOrigin = (position: ('top' | 'bottom')) => {
    switch (position) {
      case 'top':
        return { vertical: 'top' as 'top', horizontal: 'center' as 'center' };
      case 'bottom':
        return { vertical: 'bottom' as 'bottom', horizontal: 'center' as 'center' };
    }
  };

  render() {
    const { open } = this.state;
    const { message, position, actionText, classes } = this.props;
    return (
      <Portal>
        <Snackbar
          anchorOrigin={this.anchorOrigin(position)}
          open={open}
          onClose={this.handleClose}
          autoHideDuration={3000}
          className={classNames(classes.forcePosition, {
            [classes.bottomPosition]: position === 'bottom',
          })}
        >
          <SnackbarContent
            classes={classes}
            message={<Typography variant='caption' color='inherit'>{message}</Typography>}
            action={actionText && (
              <Button color='inherit' size='small' variant='outlined' onClick={this.handleAction}>
                {actionText}
              </Button>
            )}
          />
        </Snackbar>
      </Portal>
    );
  }
}

export default withStyles(styles)(FOSnackbar);
