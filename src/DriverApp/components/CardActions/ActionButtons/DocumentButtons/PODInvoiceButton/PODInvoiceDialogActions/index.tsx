import React from 'react';
import { observer } from 'mobx-react';
import { Button, Hidden } from '@material-ui/core';


interface IPODInvoiceDialogActionsProps {
  loading: boolean;
  onClickHandler: () => void;
}

const PODInvoiceDialogActions = observer(({ loading, onClickHandler }: IPODInvoiceDialogActionsProps) => (
  <>
    <Hidden smUp>
      <Button color='primary' variant='contained' onClick={onClickHandler} disabled={loading} fullWidth>Done</Button>
    </Hidden>
    <Hidden xsDown>
      <Button color='primary' onClick={onClickHandler} disabled={loading}>Done</Button>
    </Hidden>
  </>
));

export default PODInvoiceDialogActions;
