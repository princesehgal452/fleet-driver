import { ReactNode } from 'react';
import { action, IObservableArray, observable } from 'mobx';
import { OptionsObject } from 'notistack';
import { DriverAppStore } from '../DriverAppStore';
import { ISnackbar } from '../../../models/interfaces/shared/ISnackbar';


export class SnackbarStore {
  rootStore: DriverAppStore;
  autoHideDuration: number;
  @observable snackbars: IObservableArray<ISnackbar> = observable([]);

  constructor(rootStore: DriverAppStore) {
    this.rootStore = rootStore;
    this.autoHideDuration = 3000;
  }

  @action.bound
  enqueueSnackbarStore(message: ReactNode, options?: OptionsObject) {
    const key = new Date().getTime() + Math.random();
    this.snackbars.push({
      key,
      message,
      options: {
        autoHideDuration: this.autoHideDuration,
        ...options,
      },
    });
  }

  @action.bound
  removeSnackbarStore(key: number) {
    this.snackbars.replace(this.snackbars.filter(notification => notification.key !== key));
  }
}
