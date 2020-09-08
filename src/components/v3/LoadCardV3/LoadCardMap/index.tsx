import React from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@material-ui/lab';
import Load from 'models/dataStructures/Load';
import GoogleMapsDirectionsRender from 'components/v3/Maps/GoogleMapsDirectionsRender';

interface ILoadCardMapProps {
  loading?: boolean;
  load: Load;
}

const LoadCardMap = observer(({ loading, load }: ILoadCardMapProps) => {

  return (
    <>
      {
        loading ? (
          <Skeleton height={100} variant='rect' />
        ) : (
          <GoogleMapsDirectionsRender
            mapHeight={100}
            origin={load.firstPickupOriginCoordinates}
            destination={load.firstDropoffOriginCoordinates}
            hideZoomControls
          />
        )
      }
    </>
  );
});

export default LoadCardMap;
