import Raven from 'raven-js';


export const ApiFail = (error) => {
  if (error && error.response && error.response.status && error.response.status === 500) {
    return;
  }
  Raven.captureException(error, { extra: error.response || error.message || error.request || 'API Call Fail' });
};

export const ErrorException = (error, errorInfo) => {
  Raven.captureException(error, { extra: errorInfo });
};
