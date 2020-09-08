import React, { memo } from 'react';
import { Card, CardActionArea, Grid, Typography } from '@material-ui/core';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import FODriverOverviewCard from '../../../../components/FODriverOverviewCard';
import InviteNewDriver from '../../../components/InviteNewDriver';
import FOAddNewItem from '../../../../components/FOAddNewItem';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';
import ConfigStore from '../../../store/ConfigStore';


interface IDriversOverviewListOwnProps {
  drivers?: DriverTruck[];
  showDriverInvite: boolean;
  onDriverClick: (truckId: string) => () => void;
  toggleDriverInvite: () => void;
  locateHandler?: (driver: DriverTruck) => void;
  locatedDriver?: DriverTruck | null;
  configStore: ConfigStore;
}

const DriversOverviewList = memo(({
  drivers, showDriverInvite, onDriverClick, toggleDriverInvite, locateHandler, locatedDriver, configStore }: IDriversOverviewListOwnProps) => (
    <Grid container spacing={1}>
      {drivers && drivers.length > 0 ? (
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h6'>
                All Drivers
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {drivers.map((driver) => (
                <Grid item xs={12}>
                  <Card>
                    <CardActionArea onClick={onDriverClick(driver.personId)} disableRipple>
                      <FODriverOverviewCard driver={driver} showInitials showLocation locateHandler={locateHandler} locatedDriver={locatedDriver} />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          No Drivers
        </Grid>
      )}
      {
        !configStore.isGeotab &&
        <Grid item xs={12}>
          <FOAddNewItem openHandler={toggleDriverInvite} text='Add New Driver' />
          <InviteNewDriver open={showDriverInvite} closeHandler={toggleDriverInvite} />
        </Grid>
      }
    </Grid>
));

export default DriversOverviewList;
