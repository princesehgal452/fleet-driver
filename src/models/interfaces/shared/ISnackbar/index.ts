import { ReactNode } from 'react';
import { OptionsObject } from 'notistack';


export interface ISnackbar {
  key: number;
  message: ReactNode;
  options?: OptionsObject;
}
