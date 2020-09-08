import React, { useEffect } from 'react';
import GoogleMapsDirectionsRender from '../../../../components/Maps/GoogleMapsDirectionsRender';
import AisinDirectionsRender from '../../../../components/Maps/AisinDirectionsRender';
import Load from '../../../../../models/dataStructures/Load';
import Aisin from '../../../../../models/dataStructures/Aisin';
import { observer } from 'mobx-react';


const initiateAisinRouteSearch = (aisin: Aisin, isAisin: boolean) => () => {
  if (isAisin && !aisin.aisinRouteSearchList) {
    aisin.getAisinRouteData();
  }
};

interface IMatchDetailMapProps {
  load: Load;
  mapHeight: string;
  isAisin: boolean;
}

const MatchDetailMap = observer(({ load, mapHeight, isAisin }: IMatchDetailMapProps) => {
  useEffect(initiateAisinRouteSearch(load.aisin, isAisin), []);

  if (isAisin && load.aisin.aisinRouteSearchList) {
    return (
      <AisinDirectionsRender routeData={load.aisin.aisinRouteSearchList[0]} mapHeight={mapHeight} />
    );
  }
  return (
    <GoogleMapsDirectionsRender
      mapHeight={mapHeight}
      origin={load.firstPickupOriginCoordinates}
      destination={load.firstDropoffOriginCoordinates}
    />
  );
});

export default MatchDetailMap;
