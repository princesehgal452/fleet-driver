import React, { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { Theme, useTheme } from '@material-ui/core/styles';
import { DirectionsRenderer, GoogleMap, Marker, MarkerProps } from '@react-google-maps/api';

import { ICoordinate } from 'models/interfaces/shared/ICoordinate';

import { endMarkerLabel, pinSymbol, startMarkerLabel } from '../index';


const getDirectionsFromService = (setDirectionsOptions, setStartMarkerCoordinates, setEndMarkerCoordinates,
  origin?: ICoordinate, destination?: ICoordinate) => () => {
  if (!origin || !destination || (!origin.lat || !origin.lng || !destination.lat || !destination.lng)) {
    return;
  }
  const DirectionsService = new google.maps.DirectionsService();
  DirectionsService.route({
    origin: new google.maps.LatLng(origin.lat, origin.lng),
    destination: new google.maps.LatLng(destination.lat, destination.lng),
    travelMode: google.maps.TravelMode.DRIVING,
  }, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes: { 0: { legs: { 0: { start_location, end_location } } } } } = result;
      const directionsOptions: google.maps.DirectionsRendererOptions = { directions: result, suppressMarkers: true };
      const startLocationCoordinates: google.maps.LatLng = start_location;
      const endLocationCoordinates: google.maps.LatLng = end_location;
      setDirectionsOptions(directionsOptions);
      setStartMarkerCoordinates(startLocationCoordinates);
      setEndMarkerCoordinates(endLocationCoordinates);
    } else {
      console.error(`error fetching directions ${result}`);
    }
  });
};

const setMarkerIcons = (theme: Theme, setStartMarkerIcon, setEndMarkerIcon) => () => {
  const startMarkerIcon = pinSymbol(theme.palette.primary.main);
  const endMarkerIcon = pinSymbol(theme.palette.secondary.main);
  setStartMarkerIcon(startMarkerIcon);
  setEndMarkerIcon(endMarkerIcon);
};

const center = { lat: 41.8507300, lng: -87.6512600 };

const mapContainerStyleDefault = {
  height: '200px',
  width: '100%',
};

const setMapContainerHeight = (setMapContainerStyle: Function, height?: string) => () => {
  if (height) {
    setMapContainerStyle({ ...mapContainerStyleDefault, height });
  }
};

const mapOnLoadHandler = (setMapInstance: Dispatch<SetStateAction<google.maps.Map>>, getMapInstance?: (mapInstance: google.maps.Map | null) => void) => (map: google.maps.Map) => {
  setMapInstance(map);
  if (getMapInstance) {
    getMapInstance(map);
  }
};

const setMapBounds = (mapInstance: google.maps.Map | null, multiMarker?: MarkerProps[]) => () => {
  if (mapInstance && multiMarker && multiMarker.length > 0) {
    const lastCoordinatesIndex = multiMarker.length - 1;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({
      lng: Number(multiMarker[0].position.lng),
      lat: Number(multiMarker[0].position.lat),
    });
    bounds.extend({
      lng: Number(multiMarker[lastCoordinatesIndex].position.lng),
      lat: Number(multiMarker[lastCoordinatesIndex].position.lat),
    });
    mapInstance.fitBounds(bounds);
  }
};

const googleMapOptions = {
  gestureHandling: 'greedy' as 'greedy',
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
};

interface IGoogleMapsDirectionsRender {
  origin?: ICoordinate;
  destination?: ICoordinate;
  multiMarker?: MarkerProps[];
  getMapInstance?: (mapInstance: google.maps.Map | null) => void;
  mapHeight?: string;
  onDrag?: () => void;
  onZoomChanged?: () => void;
  hideZoomControls?: boolean;
}

const GoogleMapsDirectionsRender = memo(({
  origin, destination, mapHeight, multiMarker, getMapInstance, onDrag, onZoomChanged, hideZoomControls,
}: IGoogleMapsDirectionsRender) => {
  const theme = useTheme();

  const [mapContainerStyle, setMapContainerStyle] = useState(mapContainerStyleDefault);
  const [mapInstance, setMapInstance] = useState();
  const [directionsOptions, setDirectionsOptions] = useState();
  const [startMarkerCoordinates, setStartMarkerCoordinates] = useState();
  const [startMarkerIcon, setStartMarkerIcon] = useState();
  const [endMarkerCoordinates, setEndMarkerCoordinates] = useState();
  const [endMarkerIcon, setEndMarkerIcon] = useState();

  useEffect(getDirectionsFromService(setDirectionsOptions, setStartMarkerCoordinates, setEndMarkerCoordinates,
    origin, destination), [origin, destination]);

  useEffect(setMapContainerHeight(setMapContainerStyle, mapHeight), [mapHeight]);
  useEffect(setMarkerIcons(theme, setStartMarkerIcon, setEndMarkerIcon), []);

  useEffect(setMapBounds(mapInstance, multiMarker),
    [mapInstance, multiMarker]);
    let updatedMapOptions = {...googleMapOptions}
    if(hideZoomControls) {
      updatedMapOptions = {...updatedMapOptions, zoomControl: false }
    }
  return (
    <GoogleMap
      // required
      id='google-direction-renderer'
      // required
      mapContainerStyle={mapContainerStyle}
      // required
      zoom={2}
      // required
      center={center}
      options={updatedMapOptions}
      onDrag={onDrag}
      onZoomChanged={onZoomChanged}
      onLoad={mapOnLoadHandler(setMapInstance, getMapInstance)}
    >
      <DirectionsRenderer
        // required
        options={directionsOptions}
      />
      {startMarkerCoordinates && (
        <Marker
          position={startMarkerCoordinates}
          label={startMarkerLabel}
          icon={startMarkerIcon}
        />
      )}
      {endMarkerCoordinates && (
        <Marker
          position={endMarkerCoordinates}
          label={endMarkerLabel}
          options={endMarkerIcon}
          icon={endMarkerIcon}
        />
      )}
      {multiMarker && multiMarker.map((marker) => (
        <Marker {...marker} />
      ))}
    </GoogleMap>
  );
});

export default GoogleMapsDirectionsRender;
