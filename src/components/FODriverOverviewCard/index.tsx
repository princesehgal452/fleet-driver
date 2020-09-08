import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid, Hidden, IconButton, Typography, makeStyles, Theme } from '@material-ui/core';
import { MyLocation } from '@material-ui/icons';
import { DriverTruck } from '../../models/dataStructures/DriverTruck';
import FOGrid from '../FOGrid';
import MatchDetailInfoCol from '../../DriverApp/pages/DriverMatchDetailsPage/components/MatchDetailInfoCol';
import DriverNameInitials from './DriverNameInitials';
import DriverPermissionsPopover from '../DriverPermissionsPopover';
import classNames from 'classnames';
import { sentenceCase } from '../../utils/utility';

const useStyles = makeStyles((theme: Theme) => ({
  h6: {
    fontSize: theme.typography.pxToRem(16)
  }
}));

const DEFAULT_STRING = '-';

const handleLocateButtonClick = (driver: DriverTruck, locateHandler: (driver: DriverTruck) => void) => () => {
  locateHandler(driver);
};

const downloadGeolocation = (driver: DriverTruck) => () => {
  if (!driver.geolocation) {
    driver.getGeolocation();
  }
};

const stopPropagationSettingsItem = (e) => e.stopPropagation();

const handlePermissionsChange = (driver: DriverTruck) => (permissionKey: string, permissionValue) => () => {
  driver.updatePermissions(permissionKey, permissionValue);
};

interface IDriverOverviewCardOwnProps {
  driver: DriverTruck;
  showInitials?: boolean;
  showLocation?: boolean;
  showEquipment?: boolean;
  locateHandler?: (driver: DriverTruck) => void;
  locatedDriver?: DriverTruck | null;
  isGeotab?: boolean;
}

const FODriverOverviewCard = observer(({ driver, showInitials, showLocation, showEquipment, locateHandler, locatedDriver, isGeotab }: IDriverOverviewCardOwnProps) => {
  useEffect(downloadGeolocation(driver), [showLocation]);
  const popupId = `${driver.fleetId}-settings-popover`;
  const equipment = driver.equipmentTypeList.length > 0 ? driver.equipmentTypeList[0] : DEFAULT_STRING;
  const location = driver.geolocation || DEFAULT_STRING;
  const classes = useStyles();

  return (
    <FOGrid>
      { showInitials && (
      <Grid item>
        <DriverNameInitials initials={driver.driverInitials} />
      </Grid>
      )}
      <Grid item xs>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='h6' className={classNames({ [classes.h6]: isGeotab })}>
              {driver.driverFullName}
            </Typography>
          </Grid>
          { showEquipment && (
          <Grid item>
            <MatchDetailInfoCol title='Equipment Type' value={sentenceCase(equipment)} isGeotab={isGeotab} />
          </Grid>
          )}
          { showLocation && (
          <Grid item>
            <MatchDetailInfoCol title='Current Location' value={location} />
          </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item onClick={stopPropagationSettingsItem}>
        <DriverPermissionsPopover
          popupId={popupId}
          permissions={driver.permissions}
          changeHandler={handlePermissionsChange(driver)}
        />
        {locateHandler && (
          <Hidden smDown>
            <IconButton
              onClick={handleLocateButtonClick(driver, locateHandler)}
              color={locatedDriver === driver ? 'primary' : 'default'}
            >
              <MyLocation />
            </IconButton>
          </Hidden>
        )}
      </Grid>
    </FOGrid>
  );
});

export default FODriverOverviewCard;
