import React, { memo, useCallback, useState } from 'react';
import { Button, Grid } from '@material-ui/core';

import Load from 'models/dataStructures/Load';

import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';
import RequestACallForm from './RequestACallForm';

import useStyles from '../DefaultDriverButtons/styles';

interface IRequestCallbackProps {
  load?: Load;
}

const RequestCallback = memo(({ load }: IRequestCallbackProps) => {
  const classes = useStyles();
  const [isRequestCall, setIsRequestCall] = useState(false);

  const toggleRequestCall = useCallback((flag) => (e) => {
    e?.stopPropagation();
    setIsRequestCall(flag);
  });

  const { anyMatchActiveRequestedCallback } = load;

  const buttonText = anyMatchActiveRequestedCallback ? (
    <div>
      <div>Callback</div>
      <div>Requested</div>
    </div>
  ) : (
    <div>
      <div>Request</div>
      <div>Call</div>
    </div>
  );

  return (
    <>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          size='small'
          className={classes.button}
          onClick={toggleRequestCall(true)}
          disableElevation
        >
          {buttonText}
        </Button>
      </Grid>
      <FOSwipeableBottomDrawer
        maxHeight={470}
        isDrawerOpen={isRequestCall}
        variant='temporary'
      >
        <RequestACallForm cancelRequestCall={toggleRequestCall} load={load} />
      </FOSwipeableBottomDrawer>
    </>
  );
});

export default RequestCallback;
