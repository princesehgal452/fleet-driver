import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Theme, useTheme } from '@material-ui/core/styles';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { observer } from 'mobx-react';

import { ICoordinate } from 'models/interfaces/shared/ICoordinate';
import AisinRouteData from 'models/dataStructures/Aisin/AisinRouteData';

import { endMarkerLabel, pinSymbol, startMarkerLabel } from '../index';


const getLastAndTotalCoordinates = (aisinCoordinates: ICoordinate[]) => () => {
  const totalCoordinates = aisinCoordinates.length;
  const lastCoordinateIndex = totalCoordinates - 1;
  return { lastCoordinateIndex, totalCoordinates };
};

const setMarkerIcons = (theme: Theme, setStartMarkerIcon, setEndMarkerIcon) => () => {
  const startMarkerIcon = pinSymbol(theme.palette.primary.main);
  const endMarkerIcon = pinSymbol(theme.palette.secondary.main);
  setStartMarkerIcon(startMarkerIcon);
  setEndMarkerIcon(endMarkerIcon);
};

const defaultCenter = { lat: 41.8507300, lng: -87.6512600 };

const mapContainerStyleDefault = {
  height: '200px',
  width: '100%',
};

const setMapContainerHeight = (setMapContainerStyle: Function, height?: string | number) => () => {
  if (height) {
    setMapContainerStyle({ ...mapContainerStyleDefault, height });
  }
};

const markerOption: google.maps.MapOptions = {
  clickableIcons: false,
};

const setPolylineOptions = (coordinates: ICoordinate[], theme: Theme) => () => ({
  strokeColor: theme.palette.primary.main,
  strokeOpacity: 0.7,
  strokeWeight: 5,
  clickable: false,
  paths: coordinates,
});

const googleMapOptions = {
  gestureHandling: 'greedy' as 'greedy',
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
};

const mapOnLoadHandler = (setMapInstance: Dispatch<SetStateAction<google.maps.Map>>) => (map: google.maps.Map) => {
  setMapInstance(map);
};

const setMapBounds = (mapInstance: google.maps.Map | null, coordinates: ICoordinate[], lastCoordinateIndex: number) => () => {
  if (mapInstance && lastCoordinateIndex > 0) {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lng: Number(coordinates[0].lng), lat: Number(coordinates[0].lat) });
    bounds.extend({ lng: coordinates[lastCoordinateIndex].lng, lat: coordinates[lastCoordinateIndex].lat });
    mapInstance.fitBounds(bounds);
  }
};

interface IAisinDirectionsRender {
  routeData: AisinRouteData;
  mapHeight?: string | number;
  id?: string;
}

const AisinDirectionsRender = observer((
  {
    routeData: {
      aisinCoodrinateToGoogleCoordinates, averageGoogleCoordinates,
    }, mapHeight, id,
  }: IAisinDirectionsRender,
) => {
  const theme = useTheme();

  const [mapContainerStyle, setMapContainerStyle] = useState(mapContainerStyleDefault);
  const [startMarkerIcon, setStartMarkerIcon] = useState();
  const [endMarkerIcon, setEndMarkerIcon] = useState();
  const [mapInstance, setMapInstance] = useState();

  const { lastCoordinateIndex, totalCoordinates } = useMemo(getLastAndTotalCoordinates(aisinCoodrinateToGoogleCoordinates),
    [aisinCoodrinateToGoogleCoordinates]);
  const polylineOptions = useMemo(setPolylineOptions(aisinCoodrinateToGoogleCoordinates, theme),
    [aisinCoodrinateToGoogleCoordinates, theme]);

  useEffect(setMapContainerHeight(setMapContainerStyle, mapHeight), [mapHeight]);
  useEffect(setMarkerIcons(theme, setStartMarkerIcon, setEndMarkerIcon), []);
  useEffect(setMapBounds(mapInstance, aisinCoodrinateToGoogleCoordinates, lastCoordinateIndex),
    [id, mapInstance, aisinCoodrinateToGoogleCoordinates]);

  return (
    <GoogleMap
      // required
      id={id || 'aisin-direction-renderer'}
      // required
      mapContainerStyle={mapContainerStyle}
      // required
      zoom={10}
      // required
      center={averageGoogleCoordinates || defaultCenter}
      options={googleMapOptions}
      onLoad={mapOnLoadHandler(setMapInstance)}
    >
      <Polyline
        path={aisinCoodrinateToGoogleCoordinates}
        options={polylineOptions}
      />
      {totalCoordinates > 0 && (
        <Marker
          position={aisinCoodrinateToGoogleCoordinates[0]}
          label={startMarkerLabel}
          options={markerOption}
          icon={startMarkerIcon}
        />
      )}
      {totalCoordinates > 0 && (
        <Marker
          position={aisinCoodrinateToGoogleCoordinates[lastCoordinateIndex]}
          label={endMarkerLabel}
          options={markerOption}
          icon={endMarkerIcon}
        />
      )}
    </GoogleMap>
  );
});

export default AisinDirectionsRender;
