import ApiLayer from '../ApiLayer';
import { IDownloadCurrentLocationResponse } from '../../../models/interfaces/shared/IDownloadCurrentLocationResponse';


export const downloadCurrentCoordinatesAsync = async () => {
  try {
    const currentCoordinatesAPIResponse = await ApiLayer.getCurrentCoordinates();
    const { location: { lat, lng }, accuracy } = currentCoordinatesAPIResponse;
    return { lat, lng, accuracy };
  } catch (error) {
    return null;
  }
};

export const downloadCurrentLocation: () => Promise<IDownloadCurrentLocationResponse | null> = async () => {
  try {
    const coordinates = await downloadCurrentCoordinatesAsync();
    if (coordinates) {
      return new Promise<IDownloadCurrentLocationResponse>((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinates }, (results) => {
          if (results && results.length) {
            resolve({
              address: results[0].formatted_address,
              coordinates: {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              },
            });
          }
          reject(new Error('Cannot find address'));
        });
      });
    }
  } catch (e) {
    console.log('could not download user\'s location');
  }
  return null;
};
