import React from 'react';
import { observer } from 'mobx-react';
import { MarkerProps } from '@react-google-maps/api';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import GoogleMapsDirectionsRender from '../../../components/Maps/GoogleMapsDirectionsRender';


interface IDriversOverviewMapProps {
  drivers?: DriverTruck[];
  setMapInstance: (mapInstance: google.maps.Map | null) => void;
  resetLocatedDriver: () => void;
}

const DriversOverviewMap = observer(({ drivers, setMapInstance, resetLocatedDriver }: IDriversOverviewMapProps) => (
  <GoogleMapsDirectionsRender
    mapHeight='100%'
    getMapInstance={setMapInstance}
    onDrag={resetLocatedDriver}
    onZoomChanged={resetLocatedDriver}
    multiMarker={
      drivers && drivers.map((driver) => ({
        label: {
          text: driver.driverInitials,
          color: 'white',
        },
        position: {
          lat: Number(driver.lastLocation?.position.lat),
          lng: Number(driver.lastLocation?.position.lon),
        } as ICoordinate,
      } as MarkerProps))
    }
  />
));

export default DriversOverviewMap;
