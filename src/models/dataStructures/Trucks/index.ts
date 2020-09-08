import { computed, observable } from 'mobx';
import { ITruckData } from '../../interfaces/shared/ITruckData';
import { IPreferredPerMileRate } from '../../interfaces/shared/IPreferredPerMileRate';
import { IDropoffTruck } from '../../interfaces/shared/IDropoffTruck';
import { IPickupTruck } from '../../interfaces/shared/IPickupTruck';
import { IRadius } from '../../interfaces/shared/IRadius';


class Truck implements ITruckData {
  @observable id: string;
  @observable firebaseUID: string;
  @observable availableDate: string | null;
  @observable expiresOn: string | null;
  @observable perMileRate: IPreferredPerMileRate;
  @observable personId: string;
  @observable dropoff: IDropoffTruck;
  @observable pickup: IPickupTruck;
  @observable radius: IRadius;
  @observable timestamp: number;
  @observable equipment: string;
  @observable equipmentTypeList: 'Van' |
    'Reefer' |
    'Flatbed' |
    'Stepdeck' |
    'Power only' |
    'Hopper bottom' |
    'Double drop' |
    'Dump trailer' |
    'Low boy' |
    'Auto carrier' |
    'Tanker' |
    'Containers' |
    'Conestoga'[];

  constructor(truck: ITruckData) {
    if (!truck) {
      throw new Error('Truck is undefined.');
    }
    const {
      id, equipmentTypeList, perMileRate, pickup, dropoff, availableDate, expiresOn, radius, timestamp, equipment,
      firebaseUID, personId,
    } = truck;
    this.id = id;
    this.firebaseUID = firebaseUID;
    this.availableDate = availableDate;
    this.expiresOn = expiresOn;
    this.perMileRate = perMileRate;
    this.personId = personId;
    this.dropoff = { ...dropoff, location: dropoff.address };
    this.pickup = { ...pickup, location: pickup.address };
    this.radius = radius;
    this.timestamp = timestamp;
    this.equipment = equipment;
    this.equipmentTypeList = equipmentTypeList;
  }
}

export default Truck;
