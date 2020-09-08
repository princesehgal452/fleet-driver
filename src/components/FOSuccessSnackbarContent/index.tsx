import React, { ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { IDriverAppStore } from '../../models/dataStructures/IDriverAppStore';
import { InjectedNotistackProps, withSnackbar } from 'notistack';


const styles = (theme: Theme) => ({
  snackbarRoot: {
    zIndex: 9000,
  },
  snackbarContent: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    display: 'flex',
    textAlign: 'center' as 'center',
    justifyContent: 'center',
  },
  snackbarAction: {
    margin: 0,
    padding: 0,
  },
});

interface IFOSuccessSnackbarContentOwnProps {
  content: ReactNode;
  show: boolean;
  onClose?: () => void;
}

type IFOSuccessSnackbarContentProps =
  IFOSuccessSnackbarContentOwnProps
  & IDriverAppStore
  & InjectedNotistackProps
  & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class FOSuccessSnackbarContent extends React.Component<IFOSuccessSnackbarContentProps> {
  state = {
    key: '',
  };

  componentDidMount() {
    const { show } = this.props;
    if (show) {
      this.queueSnackbar();
    }
  }

  componentDidUpdate(prevProps: IFOSuccessSnackbarContentOwnProps) {
    if (!prevProps.show && this.props.show) {
      this.queueSnackbar();
    }
    if (!this.props.show && prevProps.show) {
      this.dequeueSnackbar();
    }
  }

  dequeueSnackbar = () => {
    const { closeSnackbar } = this.props;
    const { key } = this.state;
    closeSnackbar(key);
  };

  queueSnackbar = () => {
    const { enqueueSnackbar, onClose, content, classes } = this.props;
    const key = enqueueSnackbar(
      content,
      {
        onClose,
        autoHideDuration: 5000,
        className: classes.snackbarRoot,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        ContentProps: {
          className: classes.snackbarContent,
          classes: { message: classes.snackbarContent, action: classes.snackbarAction },
        },
      });
    this.setState({ key });
  };

  render() {
    return null;
  }
}

export default withStyles(styles)(withSnackbar(FOSuccessSnackbarContent));
