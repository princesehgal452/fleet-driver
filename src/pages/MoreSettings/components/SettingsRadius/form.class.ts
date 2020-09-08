import MobxReactForm from 'mobx-react-form';
import { plugins, options } from 'utils/formUtils';

const fields = [
  {
    name: 'pickupRadius',
    label: 'Pickup Radius',
    type: 'number',
  },
  {
    name: 'dropoffRadius',
    label: 'Drop-off Radius',
    type: 'number',
  },
];


const form = new MobxReactForm({ fields }, { plugins, options });

export default form;
