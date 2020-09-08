export const required = value => value ? undefined : 'Required';

export const minValue = value => (value === undefined || (!isNaN(Number(value)) && value > 0)) ? undefined : 'Only positive number allowed';

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) ? undefined : 'Not valid email';
};

export const validatePhone = (phoneNumber) => {
  const re = /^\+?[1-9]\d{1,14}$/;
  return re.test(phoneNumber) ? undefined : 'Not valid number';
};
