import { ICoordinate } from '../ICoordinate';


export interface IPickupTruck {
  description: string;
  id: string;
  matched_substrings: google.maps.places.PredictionSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: google.maps.places.AutocompleteStructuredFormatting;
  terms: google.maps.places.PredictionTerm[];
  types: string[];
  address_components: google.maps.GeocoderAddressComponent[];
  formatted_address: string;
  geometry: google.maps.Data.Geometry;
  coordinates: ICoordinate;
  address: string;
  location: string;
}
