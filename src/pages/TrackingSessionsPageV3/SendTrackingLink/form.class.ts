import MobxReactForm from 'mobx-react-form';
import { plugins, options } from 'utils/formUtils';

const customOptions = {
  ...options,
  validateOnBlur: false,
  validateOnChangeAfterInitialBlur: false,
};

const fields = [{
  name: 'targetEmail',
  label: 'Enter Email',
  rules: 'required|email',
  type: 'email',
}];


const form = new MobxReactForm({ fields }, { plugins, options: customOptions });

export default form;
