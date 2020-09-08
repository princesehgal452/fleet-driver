import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IButtonLoader {
  loading: boolean;
  children: ReactNode;
}

const ButtonLoader = observer(({ loading, children }: IButtonLoader) => (
  <>
    {loading ? <CircularProgress size={24} color='primary' /> : children}
  </>
));

export default ButtonLoader;
