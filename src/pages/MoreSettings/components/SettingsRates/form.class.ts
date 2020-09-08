import MobxReactForm from 'mobx-react-form';
import { plugins, options } from 'utils/formUtils';

const fields = [{
  name: 'preferredPerMileRate',
  rules: 'required',
  type: 'number',
}];


const form = new MobxReactForm({ fields }, { plugins, options });

export default form;
