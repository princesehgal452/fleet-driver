interface IPosition {
  lon: string;
  lat: string;
  accuracy: string;
}

export interface ILastLocation {
  _id: string;
  asOf: Date;
  bearing: string;
  hosStatus: string;
  personId: string;
  position: IPosition;
  speed: string;
}
