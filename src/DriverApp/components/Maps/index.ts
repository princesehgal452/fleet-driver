export const pinSymbol = (color): google.maps.Symbol | google.maps.Icon => ({
  path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
  fillColor: color,
  fillOpacity: 1,
  strokeColor: '#fff',
  strokeWeight: 1,
  scale: 1,
  labelOrigin: new google.maps.Point(0, -28),
});

export const startMarkerLabel: google.maps.MarkerLabel = {
  text: 'A',
  color: 'white',
};

export const endMarkerLabel: google.maps.MarkerLabel = {
  text: 'B',
  color: 'white',
};
