import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Load from '../../../../../models/dataStructures/Load';
import { ICoordinate } from '../../../../../models/interfaces/shared/ICoordinate';
import LoadCard from '../../../../components/LoadCard';


interface IDispatchableDriverLoadCard {
  load: Load;
  driverCoordinates: ICoordinate;
  routeToLoadDetailsPage: (load: Load) => void;
}

const downloadDeadhead = (load: Load, driverCoordinates: ICoordinate) => () => {
  load.calculateDeadheadInMiles(driverCoordinates);
};
const downloadDistance = (load: Load) => () => {
  load.downloadLoadWithDistanceInMiles();
};

const DispatchableDriverLoadCard = observer(({ load, driverCoordinates, routeToLoadDetailsPage }: IDispatchableDriverLoadCard) => {
  useEffect(downloadDeadhead(load, driverCoordinates), []);
  useEffect(downloadDistance(load), []);

  return (
    <LoadCard
      dispatcher
      key={load.matchId}
      collectionItem={load}
      currentCoordinates={driverCoordinates}
      onItemClick={routeToLoadDetailsPage}
    />
  );
});

export default DispatchableDriverLoadCard;
