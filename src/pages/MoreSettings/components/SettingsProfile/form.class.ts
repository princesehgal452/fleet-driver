import MobxReactForm from 'mobx-react-form';
import { plugins, options } from 'utils/formUtils';

const fields = [{
  name: 'email',
  label: 'Email',
  rules: 'required|email',
  type: 'email',
}, {
  name: 'displayName',
  label: 'Name',
  rules: 'required',
  type: 'text',
}, {
  name: 'phone',
  label: 'Phone',
  rules: 'required',
  type: 'text',
}];


const form = new MobxReactForm({ fields }, { plugins, options });

export default form;
