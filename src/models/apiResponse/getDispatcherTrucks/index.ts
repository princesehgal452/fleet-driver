import { IDriverTruck } from '../../interfaces/shared/IDriverTruck';


export interface IGetDispatcherTrucksHelper {
  data: IGetDispatcherTrucks;
}

export interface IGetDispatcherTrucks {
  data: IDriverTruck[];
}
