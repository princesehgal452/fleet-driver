// import React from 'react';
// import { compose, withProps } from 'recompose';
// import { withGoogleMap, GoogleMap } from 'react-google-maps';
// import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
// import seedRandom from 'seedrandom';
//
// const getHeatLayerPoint = (lat, lng, weight) => {
//   return {location: new google.maps.LatLng(lat, lng), weight: weight};
// };
//
// const getHeatPointsWithinRange = (minLat, maxLat, minLon, maxLon, numberOfPoints, minWeight, maxWeight) => {
//   const dataPoints = [];
//   for (let i = 0; i < numberOfPoints; i++) {
//     // seed random will always create the same number.
//     const rng = seedRandom(i);
//     const lat = rng() * (maxLat - minLat) + minLat;
//     const lng = rng() * (maxLon - minLon) + minLon;
//     const weight = Math.floor(rng() * (maxWeight - minWeight + 1)) + minWeight;
//     dataPoints.push(getHeatLayerPoint(lat, lng, weight));
//   }
//   return dataPoints;
// };
//
// export const MapWithAHeatMap = compose(
//   withProps({
//     loadingElement: <div style={{ height: `500px` }} />,
//     containerElement: <div style={{ height: `500px`, margin: `20px 0px` }} />,
//     mapElement: <div style={{ height: `500px` }} />
//   }),
//   withGoogleMap
// )(props => {
//   let dataPoints = [];
//   let zoom = 4; // Can view all of US.
//   let center = { lat: 40, lng: -98 }; // US Center.
//   if (props.currentLocation) {
//     zoom = 8;
//     center = { lat: props.currentLocation.lat, lng: props.currentLocation.lng };
//     // Create data points around the current location.
//     dataPoints = getHeatPointsWithinRange(props.currentLocation.lat - 1, props.currentLocation.lat + 1, props.currentLocation.lng - 3, props.currentLocation.lng + 3, 50, 80, 90);
//     dataPoints.push(getHeatLayerPoint(props.currentLocation.lat, props.currentLocation.lng, 90));
//   } else {
//     // Default - show random hot spots in US.
//     dataPoints = getHeatPointsWithinRange(30.50139, 47.85694, -76.01197, -116.75583, 30, 80, 90);
//   }
//
//   return (<GoogleMap
//     zoom={zoom}
//     center={center}>
//     <HeatmapLayer data={dataPoints} options={{radius: 60, dissipating: true}}/>
//   </GoogleMap>);
// });
