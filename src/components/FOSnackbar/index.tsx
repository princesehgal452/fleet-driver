import React from 'react';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import { InjectedNotistackProps, withSnackbar } from 'notistack';
import { IDriverAppStore } from '../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../DriverApp/store/DriverAppStore';


type IFOSnackbarProps = IDriverAppStore & InjectedNotistackProps;

@inject('driverAppStore')
@observer
class FOSnackbar extends React.Component<IFOSnackbarProps> {
  displayed: ({}) = {};

  storeDisplayed = (notificationKey: number, snackbarKey: (number | string | null)) => {
    this.displayed[notificationKey] = snackbarKey;
  };

  handleActionButtonClick = (notificationKey: number) => () => {
    const { closeSnackbar } = this.props;
    closeSnackbar(this.displayed[notificationKey]);
  };

  render() {
    const { driverAppStore, enqueueSnackbar } = this.props;
    const { snackbarStore: { snackbars, removeSnackbarStore } } = driverAppStore as DriverAppStore;

    snackbars.forEach((notification) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed[notification.key]) {
        return null;
      }
      let ActionButton = <></>;
      if (notification.options && notification.options.onClickAction) {
        ActionButton = (
          <Button
            color='inherit'
            variant='outlined'
            size='small'
            onClick={this.handleActionButtonClick(notification.key)}
          >
            Undo
          </Button>
        );
      }
      // Display snackbar using notistack
      const snackbarKey = enqueueSnackbar(notification.message,
        { ...notification.options, action: ActionButton });
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key, snackbarKey);
      // Dispatch action to remove snackbar from redux store
      removeSnackbarStore(notification.key);
    });
    return null;
  }
}

export default withSnackbar(FOSnackbar);
