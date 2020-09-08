const maxLength = max => value => (value?.length > max ? `Must be no more than ${max} characters` : undefined);
const minLength = min => value => (value?.length < min ? `Must be at least ${min} characters` : undefined);
export const exactLength = length => value => (value?.length !== length ? `Must be ${length} characters` : undefined);

const requiredErrorMsg = {
  displayName: 'Please enter your Full Name',
  phone: 'Please enter a valid 10 digit phone number',
  equipmentTypeList: 'Please select at least one trailer type',
};

export const required = (...value) => {
  if (value[0]) {
    return undefined;
  }
  return requiredErrorMsg[value[3]] ? requiredErrorMsg[value[3]] : 'This field is mandatory';
};

export const requiredArray = (...value) => {
  if (value[0]) {
    return undefined;
  }
  return requiredErrorMsg[value[3]] ? requiredErrorMsg[value[3]] : 'This field is mandatory';
};

export const USCanadaZipCodeValidation = value => (value && (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)
  || /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value)) ? undefined : 'Should be US or Canada Zipcode');
export const exactLength3 = exactLength(3);
export const exactLength5 = exactLength(5);
export const exactLength9 = exactLength(9);
export const maxLength12 = maxLength(12);
export const minLength5 = minLength(5);
export const minLength6 = minLength(6);


export const phoneExactLength10 = (value) => {
  if (!value) return undefined;
  const valueLength = value.match(/\d/g).length;
  if ((valueLength !== 10) && valueLength !== 11) {
    return 'Not valid phone number';
  }
  return undefined;
};

export const locationRequired = (value) => {
  if (value) {
    if (value.coordinates) {
      return undefined;
    }
    return 'Invalid address. Please choose one of the suggestions below.';
  }
  return 'This field is mandatory';
};

export const uniqueLaneName = (value, allValues , props, name) => {
  const { operatingLanes, selectedOperatingLane } = props;
  if (value) {
    if(operatingLanes) {
      let duplicateItems = operatingLanes.filter(lane => (
        (!selectedOperatingLane || (selectedOperatingLane && selectedOperatingLane.rank !== lane.rank)) &&
        lane.name.toLowerCase().trim() === value.toLowerCase().trim())
      )
      if(duplicateItems && duplicateItems.length > 0) {
        return 'Lane name already exists, please enter a new name.';
      }
    }
  }
};
