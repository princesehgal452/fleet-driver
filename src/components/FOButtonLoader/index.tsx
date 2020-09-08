import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IFOButtonLoader {
  loading: boolean;
  children: ReactNode;
}

const FOButtonLoader = observer(({ loading, children }: IFOButtonLoader) => (
  <>
    {loading ? <CircularProgress size={24} color='primary' /> : children}
  </>
));

export default FOButtonLoader;
