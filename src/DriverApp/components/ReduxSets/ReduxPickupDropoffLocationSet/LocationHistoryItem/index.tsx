import React, { memo, useCallback } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Schedule } from '@material-ui/icons';
import FOAddress from 'components/FOAddress';


interface ILocationHistoryItemProps {
  onClick: (location) => void;
  location;
}

const LocationHistoryItem = memo(({ location, onClick }: ILocationHistoryItemProps) => {
  const buttonClickHandler = useCallback(() => {
    onClick(location);
  }, []);

  return (
    <ListItem button onClick={buttonClickHandler}>
      <ListItemIcon>
        <Schedule />
      </ListItemIcon>
      <ListItemText secondary={<FOAddress address={location.address} />} />
    </ListItem>
  );
});

export default LocationHistoryItem;
