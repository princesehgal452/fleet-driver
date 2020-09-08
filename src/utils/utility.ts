import pickBy from 'lodash/pickBy';
import map from 'lodash/map';
import keys from 'lodash/keys';
import find from 'lodash/find';
import startCase from 'lodash/startCase';
import includes from 'lodash/includes';
import parseAddress from 'parse-address-string';
import ReactGA from 'react-ga';
import moment from 'moment';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { GA_TRACKING, InteractionEventTypes } from '../services/constants';
import { IInteraction } from '../models/interfaces/shared/INegotiateInteraction';
import { IRadius } from '../models/interfaces/shared/IRadius';
import { ICoordinate } from '../models/interfaces/shared/ICoordinate';


export const getPerMileRateForMiles = (distanceInMiles, cost) => {
  const amount = parseFloat(cost);
  return {
    price: parseFloat((amount / distanceInMiles).toFixed(2)),
    miles: distanceInMiles,
  };
};

export const getFlatRateFromMiles = (distanceInMiles: number, perMileRateValue: number) => ({
  price: parseFloat((perMileRateValue * distanceInMiles).toFixed(0)),
  miles: distanceInMiles,
});

export const sleep = (miliseconds = 0) => new Promise((resolve) => setTimeout(resolve, miliseconds));

export const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(String(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024))), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
};

export const omit = (originalObject = {}, keysToOmit: string[] = []) => {
  const clonedObject = { ...originalObject };
  for (let i = 0; i < keysToOmit.length; i += 1) {
    const path = keysToOmit[i];
    delete clonedObject[path];
  }
  return clonedObject;
};

export const getValueFromFormattedAmount = (formattedAmount: string) => parseFloat(formattedAmount.split(' ')[0].replace(',', ''));

export const getPerMileRateForMeters = (distanceInMeters, cost) => getPerMileRateForMiles(distanceInMeters * 0.00062137, cost);

export const recursiveObjectFlatten = (object) => (
  // taken from https://stackoverflow.com/questions/33036487/one-liner-to-flatten-nested-object
  Object.assign(
    {},
    ...(function _flatten(o) {
      if (o) {
        return [].concat(...Object.keys(o)
        .map((k) => (typeof o[k] === 'object'
          ? _flatten(o[k])
          : ({ [k]: o[k] }))));
      }
      return [];
    }(object)),
  )
);

export const getAllTrueKeysList = (object) => {
  const allTrueKeys = pickBy(recursiveObjectFlatten(object), (value) => value === true);
  return map(keys(allTrueKeys), startCase);
};

export const getAllTrueKeysFormatted = (object) => getAllTrueKeysList(object).join(', ');

export const getCityAndState: (address, { cityOnly, stateOnly }) => Promise<string> = (address, { cityOnly, stateOnly }) => new Promise((resolve, reject) => {
  parseAddress(address, (err, addressObj) => {
    if (err) {
      reject(err);
    } else if (addressObj.city || addressObj.state) {
      if (addressObj.city && addressObj.state) {
        if (cityOnly) {
          resolve(`${addressObj.city}`);
        }
        if (stateOnly) {
          resolve(`${addressObj.state}`);
        }
        resolve(`${addressObj.city}, ${addressObj.state}`);
      } else {
        resolve(`${addressObj.city ? addressObj.city : addressObj.state}`);
      }
    } else {
      resolve(address);
    }
  });
});

export const getCityStateCountry: (address) => Promise<Object> = (address) => new Promise((resolve, reject) => {
  parseAddress(address, (err, addressObj) => {
    if (err) {
      reject(err);
    } else if (addressObj.city || addressObj.state) {
      resolve(addressObj);
    } else {
      resolve(address);
    }
  });
});

export const refactorWeightValue = (weight) => {
  let newWeight = {};
  const weightArray = weight.split(',');
  if (weightArray[0] === '0') {
    newWeight = {
      high: parseFloat(weightArray[1]),
    };
  } else if (weightArray[1] === '0') {
    newWeight = {
      low: parseFloat(weightArray[0]),
    };
  } else {
    newWeight = {
      low: parseFloat(weightArray[0]),
      high: parseFloat(weightArray[1]),
    };
  }
  return newWeight;
};

export const refactorMileRate = (value) => ({
  price: parseFloat(value),
  currency: 'USD',
});

export const getAddressComponent = (value, type) => find(value.address_components, (addressComponent) => includes(addressComponent.types, type));

export const parseAddressAndRefactorLocation = async (value, setAll?: boolean) => {
  if ((value.description || value.address) && !value.city && !value.state && !value.country) {
    const addressParsed = await getCityStateCountry(value.description || value.address);
    value.city = addressParsed.city;
    value.state = addressParsed.state;
    value.country = addressParsed.country;
  }
  return refactorLocation(value, setAll);
};

export const refactorLocation = (value, setAll?: boolean) => {
  const components = {
    city: '',
    state: '',
    country: '',
  };
  if (value) {
    const vcity = value.city;
    const locality = getAddressComponent(value, 'locality');
    const addCompCity = locality ? locality.long_name : '';
    const vstate = value.state;
    const administrative_area_level_1 = getAddressComponent(value, 'administrative_area_level_1');
    const addCompstate = administrative_area_level_1 ? administrative_area_level_1.short_name : '';
    const vcountry = value.country;
    const country = getAddressComponent(value, 'country');
    const addCompcountry = country ? country.short_name : '';
    if (setAll) {
      if (vcity || addCompCity) {
        components.city = vcity || addCompCity;
      }
      if (vstate || addCompstate) {
        components.state = vstate || addCompstate;
      }
      if (vcountry || addCompcountry) {
        components.country = vcountry || addCompcountry;
      }
    } else {
      // Only set the city, state or country. Not all three.
      if (vcity || addCompCity) {
        components.city = vcity || addCompCity;
      } else if (vstate || addCompstate) {
        components.state = vstate || addCompstate;
      } else if (vcountry || addCompcountry) {
        components.country = vcountry || addCompcountry;
      }
    }
  }
  return {
    address: value?.description || '',
    coordinates: value?.coordinates || null,
    ...components,
  };
};

export const refactorRadius = (value): IRadius => ({
  amount: parseFloat(value),
  unit: 'mile',
});

export const trackPageView = (pathname, search = '') => {
  // we want to track load detail and match detail page as load/details in GA
  if (pathname) {
    if (pathname.includes('detail')) {
      ReactGA.pageview(`/driver/load/detail${search}`);
    } else if (pathname.includes('redirect')) {
      console.log('Redirect');
    } else {
      // console.log(`${pathname}${search}`);
      ReactGA.pageview(`${pathname}${search}`);
    }
  }
};

export const trackPreferredLane = (lane) => {
  ReactGA.event({
    category: GA_TRACKING.CATEGORIES.DRIVER,
    action: GA_TRACKING.ACTIONS.PREFERRED_LANE,
    label: lane,
  });
};

export const trackEquipment = (equipment) => {
  ReactGA.event({
    category: GA_TRACKING.CATEGORIES.DRIVER,
    action: GA_TRACKING.ACTIONS.EQUIPMENT,
    label: equipment,
  });
};

export const filterBids = (interactions: (IInteraction)[]) => {
  const bidEventTypes = ['NEGOTIATING', 'NEGOTIATE_REJECT', 'NEGOTIATE_ACCEPT'];
  return interactions.filter((interaction) => bidEventTypes.includes(interaction.eventType));
};

export const getDateTime = (inputDate, inputTime) => {
  const momentDate = moment(inputDate);
  const momentTime = moment(inputTime, 'h:mm a');
  return momentDate.set({
    hour: momentTime.get('hour'),
    minute: momentTime.get('minute'),
    second: momentTime.get('second'),
  });
};

export const getDummyInteraction = () => {
  const dummyInteraction: IInteraction = {
    email: '',
    phone: '',
    displayName: '',
    firebaseUID: '',
    mcNumber: '',
    timestamp: 0,
    flatRate: true,
    unit: 'USD',
    price: 0,
    eventType: InteractionEventTypes.REJECT,
    userType: 'driver',
  };
  return dummyInteraction;
};

export const insertionSort = (array, value, comparator) => {
  let head = -1;
  let tail = -1;
  const { length } = array;

  if (length === 0) {
    array.push(value);
    return 0;
  }

  for (let index = 0; index < length; index += 1) {
    if (comparator(array[index], value)) {
      head = index;
    } else {
      tail = index;
      break;
    }
  }

  if (head === -1) {
    array.unshift(value);
  } else if (tail === -1) {
    tail = array.push(value) - 1;
  } else {
    array.splice(tail, 0, value);
  }

  // return index of insertion point
  return tail;
};

export const getDocumentNameFromKey = (documents, documentKey) => {
  let documentName = '';
  if (documents && documents[documentKey]) {
    if (documentKey === 'other' && documents[documentKey][documentKey]) {
      const documentNameSplit = documents[documentKey][documentKey].split('/');
      documentName = documents[documentKey][documentKey].split('/')[documentNameSplit.length - 1];
    } else {
      const documentNameSplit = documents[documentKey].split('/');
      documentName = documents[documentKey].split('/')[documentNameSplit.length - 1];
    }
  }
  return documentName;
};

export const calculateAverageCoordinates = (coordinates: ICoordinate[]): ICoordinate => {
  if (coordinates.length === 1) {
    return coordinates[0];
  }

  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  coordinates.forEach((coordinate) => {
    const latitude = coordinate.lat * Math.PI / 180;
    const longitude = coordinate.lng * Math.PI / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  });

  const total = coordinates.length;

  x /= total;
  y /= total;
  z /= total;

  const centralLongitude = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLatitude = Math.atan2(z, centralSquareRoot);

  return {
    lat: centralLatitude * 180 / Math.PI,
    lng: centralLongitude * 180 / Math.PI,
  };
};

export const growFromTopStyle: CSSProperties = {
  transformOrigin: 'top',
};

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  const b: any = theBlob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  // Cast to a File() type
  return <File>theBlob;
};

export const convertMetersToMiles = (distanceInMeters: number) => Number((distanceInMeters / 1609.344).toFixed(2));

export const buildURLBasedFilters = (URLSearchParams) => {
  const searchParams = {};

  if (URLSearchParams.weightLow) {
    searchParams.weight = `${parseFloat(URLSearchParams.weightLow)},${parseFloat(URLSearchParams.weightHigh)}`;
  } else if (URLSearchParams.weightHigh) {
    searchParams.weight = `0,${parseFloat(URLSearchParams.weightHigh)}`;
  }

  const { pickupAddress, pickupState, pickupCity, pickupCountry, pickupLat, pickupLng } = URLSearchParams;
  if (pickupAddress) {
    searchParams.pickupLocation = {
      address: pickupAddress,
      city: pickupCity,
      state: pickupState,
      country: pickupCountry,
      description: pickupAddress,
      coordinates: {
        lat: parseFloat(pickupLat),
        lng: parseFloat(pickupLng),
      },
    };
  }

  const { dropoffAddress, dropoffState, dropoffCity, dropoffCountry, dropoffLat, dropoffLng } = URLSearchParams;
  if (dropoffAddress) {
    searchParams.dropoffLocation = {
      address: dropoffAddress,
      city: dropoffCity,
      state: dropoffState,
      country: dropoffCountry,
      coordinates: {
        lat: parseFloat(dropoffLat),
        lng: parseFloat(dropoffLng),
      },
    };
  }

  const { radiusAmount, radiusUnit } = URLSearchParams;
  if (radiusAmount) {
    searchParams.radius = {
      amount: radiusAmount,
      unit: radiusUnit,
    };
  }

  const { equipmentTypeList } = URLSearchParams;
  if (equipmentTypeList) {
    searchParams.equipmentTypeList = (typeof equipmentTypeList === 'string')
      ? equipmentTypeList.split(',') : equipmentTypeList;
  }

  const { availableDate } = URLSearchParams;
  if (availableDate) {
    searchParams.availableDate = moment(availableDate * 1000);
  }

  const { expiresOn } = URLSearchParams;
  if (expiresOn) {
    searchParams.expiresOn = moment(expiresOn * 1000);
  }

  const { perMileRatePrice, perMileRateCurrency } = URLSearchParams;
  if (perMileRatePrice) {
    searchParams.perMileRate = {
      price: perMileRatePrice,
      currency: perMileRateCurrency,
    };
  }

  const { pickupDate } = URLSearchParams;
  if (pickupDate) {
    searchParams.pickupDate = moment(pickupDate * 1000);
  }

  const { laneSize } = URLSearchParams;
  if (laneSize) {
    searchParams.laneSize = laneSize;
  }

  if (URLSearchParams.weightLow) {
    searchParams.weight = `${parseFloat(URLSearchParams.weightLow)},${parseFloat(URLSearchParams.weightHigh)}`;
  } else if (URLSearchParams.weightHigh) {
    searchParams.weight = `0,${parseFloat(URLSearchParams.weightHigh)}`;
  }

  return searchParams;
};

export const getLocationText = (city, state, country) => {
  let text = '';
  if (city) {
    text += `${city}`;
  }
  if (state) {
    text += `, ${state}`;
  }
  if (country) {
    text += `, ${country}`;
  }
  return text;
};

export const parseQueryParamsToSingleOutput = (param?: string | string[]) => {
  if (param) {
    if (Array.isArray(param) && param.length > 0) {
      return param[0];
    }
    if (typeof param === 'string') {
      return param;
    }
  }
  return null;
};

export const getGreetings = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return 'Good Morning';
  }
  if (hours < 17) {
    return 'Good Afternoon';
  }
  return 'Good Evening';
};

export const fetchRandomValueFromArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const formatNumberToString = (numericNum) => {
  if (typeof numericNum === 'number') {
    return numericNum.toLocaleString('en');
  }
  return numericNum;
};

export const getAppContainer = () => {
  return document.getElementById('root');
};

export const sentenceCase = (string) => {
  const capitalizeString = string.charAt(0).toUpperCase() + string.slice(1)
  return capitalizeString.replace(/([A-Z])/g, ' $1').trim()
};

export const isObjectId = (id: string) => Boolean(id.match(/^[0-9a-fA-F]{24}$/));

export const isSelectedDateToday = (selectedDate): boolean | null => (
  selectedDate ? moment(selectedDate).isSame(moment(), 'day') : null
);
