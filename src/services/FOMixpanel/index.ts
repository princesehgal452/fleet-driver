import mixpanel, { Dict } from 'mixpanel-browser';
import config from '../../../config';
import { ICoordinate } from '../../models/interfaces/shared/ICoordinate';
import { MIXPANEL_KEYS } from '../constants';
import { getAddressComponent } from '../../utils/utility';
import Load from '../../models/dataStructures/Load';
import { FOUser } from '../../models/dataStructures/FOUser';


export const mixpanelInit = () => mixpanel.init(config.mixpanelConfig.token);

export const mixpanelTrack = (event_name: string, properties?: Dict, callback?: () => void) => {
  mixpanel.track(
    event_name, { [MIXPANEL_KEYS.DATE_TIME]: new Date().toISOString(), ...properties }, callback);
};

export const mixpanelSetUser = (
  {
    firebaseUID, displayName, phone, email, userType, mcNumber,
    equipmentTypeList, preferredLanes, companyType, drivers, documents,
  }: FOUser,
  coordinates: ICoordinate) => {

  mixpanel.identify(firebaseUID);

  mixpanel.people.set_once(MIXPANEL_KEYS.FIRST_LOGIN_DATE, new Date().toISOString());

  const peopleProps = {
    [MIXPANEL_KEYS.USER_TYPE]: userType,
    [MIXPANEL_KEYS.DISPLAY_NAME]: displayName,
    [MIXPANEL_KEYS.MCNUMBER]: mcNumber,
    [MIXPANEL_KEYS.PHONE]: phone,
    [MIXPANEL_KEYS.EMAIL]: email,
    [MIXPANEL_KEYS.EQUIPMENT_LIST]: equipmentTypeList,
    [MIXPANEL_KEYS.PREFERRED_LANES]: preferredLanes.states,
    [MIXPANEL_KEYS.COMPANY_TYPE]: companyType,
  };
  if (drivers && drivers.length > 0) {
    drivers.forEach((driver) => {
      peopleProps[MIXPANEL_KEYS.EQUIPMENT_LIST] = [
        ...peopleProps[MIXPANEL_KEYS.EQUIPMENT_LIST], ...driver.equipmentTypeList,
      ];
    });
  }
  peopleProps[MIXPANEL_KEYS.EQUIPMENT_LIST] = Array.from(new Set(peopleProps[MIXPANEL_KEYS.EQUIPMENT_LIST]));
  if (documents) {
    peopleProps[MIXPANEL_KEYS.DOCUMENT_TYPES] = Object.keys(documents);
  }

  const superProps = {
    [MIXPANEL_KEYS.DISPLAY_NAME]: displayName,
    [MIXPANEL_KEYS.PHONE]: phone,
    [MIXPANEL_KEYS.EMAIL]: email,
    [MIXPANEL_KEYS.USER_TYPE]: userType,
  };

  mixpanel.people.set(peopleProps);
  mixpanel.register(superProps);

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: coordinates }, (geocodeResults) => {
    if (geocodeResults && geocodeResults.length > 0) {
      const currentLocationAddress = { [MIXPANEL_KEYS.CURRENT_LOCATION]: geocodeResults[0].formatted_address };
      const currentLocation = { ...currentLocationAddress };
      geocodeResults[0].address_components.forEach((addressComponent) => {
        if (addressComponent.types.includes('locality')) {
          currentLocation[MIXPANEL_KEYS.CITY] = addressComponent.long_name;
        }
        if (addressComponent.types.includes('administrative_area_level_1')) {
          currentLocation[MIXPANEL_KEYS.STATE] = addressComponent.long_name;
        }
        if (addressComponent.types.includes('country')) {
          currentLocation[MIXPANEL_KEYS.COUNTRY] = addressComponent.long_name;
        }
        if (addressComponent.types.includes('postal_code')) {
          currentLocation[MIXPANEL_KEYS.POSTAL_CODE] = addressComponent.long_name;
        }
      });
      mixpanel.register(currentLocationAddress);
      mixpanel.people.set(currentLocation);
    }
  });
};

export const mixpanelSetSearchRALCitiesStates = (value) => {
  const locality = getAddressComponent(value, 'locality');
  const city = locality ? locality.long_name : null;
  const administrative_area_level_1 = getAddressComponent(value, 'administrative_area_level_1');
  const state = administrative_area_level_1 ? administrative_area_level_1.short_name : null;
  if (value.city || city) {
    mixpanel.people.append([MIXPANEL_KEYS.SEARCHED_CITY], value.city || city);
  }
  if (value.state || state) {
    mixpanel.people.append([MIXPANEL_KEYS.SEARCHED_STATE], value.state || state);
  }
};

export const mixpanelLoadProperties = (load: Load) => ({
  matchId: load.isMatch ? load.matchId : null,
  loadId: load.loadId,
  [MIXPANEL_KEYS.LOAD_SOURCE]: load.source,
});
