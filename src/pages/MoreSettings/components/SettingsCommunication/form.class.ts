import MobxReactForm from 'mobx-react-form';
import { plugins, options } from 'utils/formUtils';

const fields = [
  {
    name: 'contact_email',
    label: 'Contact Email',
    placeholder: 'Enter Email',
    rules: 'email',
    type: 'email',
  },
  {
    name: 'brf_certified_recommendations',
    label: 'Receive BigRoad Freight Certified Recommendations',
    placeholder: 'These notifications are special offers from our BigRoad Certified partners, including companies like Loadsmart.',
    rules: 'boolean',
    type: 'checkbox',
  },
  {
    name: 'load_request_responses',
    label: 'Receive Responses to Load Requests',
    placeholder: 'These are notifications you receive for matches to truck postings and load requests.',
    rules: 'boolean',
    type: 'checkbox',
  },
  {
    name: 'scientific_recommendations',
    label: 'Receive Scientifically Sourced Recommendations',
    placeholder: 'These are notifications you receive based on shipment recommendations built by our data science team.',
    rules: 'boolean',
    type: 'checkbox',
  },
];


const form = new MobxReactForm({ fields }, { plugins, options });

export default form;
