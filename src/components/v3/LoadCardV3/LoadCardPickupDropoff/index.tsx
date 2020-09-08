import React from 'react';
import { observer } from 'mobx-react';
import { Typography } from '@material-ui/core';

import { ILoadAddress } from 'models/interfaces/shared/ILoadAddress';

import FOAddress from 'components/v3/FOAddress';

interface ILoadCardPickupDropoffProps {
  pickup?: ILoadAddress;
  dropoff?: ILoadAddress;
  loading?: boolean;
}

const LoadCardPickupDropoff = observer(({ pickup, dropoff, loading }: ILoadCardPickupDropoffProps) => (
  <>
    {!loading && pickup && (
      <Typography variant='subtitle2' noWrap>
        <FOAddress address={pickup.location} />
        {dropoff && (
          <>
            {' - '}
            <FOAddress address={dropoff.location} />
          </>
        )}
      </Typography>
    )}
  </>
));

export default LoadCardPickupDropoff;
