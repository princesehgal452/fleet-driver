import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

export const plugins = { dvr: dvr(validatorjs) };

export const options = {
  validateOnChangeAfterInitialBlur: true,
  showErrorsOnReset: false,
};
