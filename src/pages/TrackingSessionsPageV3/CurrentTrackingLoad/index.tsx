import React from 'react';
import { observer } from 'mobx-react';
import TrackingSessionsStore from 'DriverApp/store/TrackingSessionsStore';
import LoadCard from 'components/v3/LoadCardV3';
import PageSubtitle from 'components/v3/PageSubtitle';

interface ICurrentTrackingLoadProps {
  title: string;
  trackingSessionsStore: TrackingSessionsStore;
}

const CurrentTrackingLoad = observer(({ title, trackingSessionsStore: { activeSession, activeSessionLoad } }: ICurrentTrackingLoadProps) => (
  <>
    <PageSubtitle title={title} mb={2.5} />
    <LoadCard
      load={activeSession}
      trackingSession={activeSession}
      showMap
    />
  </>
));

export default CurrentTrackingLoad;
