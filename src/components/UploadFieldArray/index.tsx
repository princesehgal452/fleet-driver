import * as React from 'react';
import UploadField from '../../src/components/UploadField';
import { Field, FieldArray } from 'redux-form';
import { required } from '../../src/services/Validations';

const renderUploadButtons = ({ fields, meta: { error, submitFailed } }) => (
  <div className="upload-documents">
    {fields.map((field, index) => {
      return (<Field
        key={field + index}
        component={UploadField}
        name={field}
        validate={[required]}
        label={field.label}
        onDestroy={() => fields.remove(index)}
      />);
    })}
  </div>
);

class UploadFieldArray extends React.PureComponent {
  render() {
    return (
      <FieldArray name='uploadedFiles' component={renderUploadButtons} />
    );
  }
}

export default UploadFieldArray;
