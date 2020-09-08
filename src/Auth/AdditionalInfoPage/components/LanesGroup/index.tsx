import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FOCheckField from '../../../../components/FOCheckField';

class LanesGroup extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    allValues: PropTypes.object,
    change: PropTypes.func,
    formSectionName: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      indeterminate: false,
    };
  }

  componentDidMount() {
    const { allValues } = this.props;
    this.setIndeterminate(allValues);
  }

  componentDidUpdate() {
    const { allValues } = this.props;
    this.setIndeterminate(allValues);
  }

  setIndeterminate = (allValues) => {
    const { data, formSectionName } = this.props;
    let checkedCount = 0;
    let count = 0;
    for (let index = 0; index < data.items.length; index += 1) {
      const name = data.items[index].value;
      count += 1;
      if (allValues && allValues[formSectionName] && allValues[formSectionName][name]) {
        checkedCount += 1;
      }
    }
    this.setState({
      indeterminate: (count !== checkedCount) && (checkedCount > 0),
    });
  };

  handleChangeCheckAll = (event) => {
    const { data, change, formSectionName } = this.props;
    for (let index = 0; index < data.items.length; index += 1) {
      const name = data.items[index].value;
      change(`${formSectionName}.${name}`, event.target.checked);
    }
    this.setState({
      indeterminate: false,
    });
  };

  renderList = items => items.map((item) => {
    if (item.length > 18) {
      return (
        <Grid item xs={8} sm={4} className='details-col' key={item.value}>
          <Field
            component={FOCheckField}
            className='col-checkbox'
            name={item.value}
            label={item.label}
            value={item.value}
            onChange={this.handleChange}
          />
        </Grid>
      );
    }
    return (
      <Grid item xs={4} sm={4} className='details-col' key={item.value}>
        <Field
          component={FOCheckField}
          className='col-checkbox'
          name={item.value}
          label={item.label}
          value={item.value}
          onChange={this.handleChange}
        />
      </Grid>
    );
  });

  render() {
    const { indeterminate } = this.state;
    const { data } = this.props;
    const { image, title, items } = data;
    return (
      <div>
        <Grid container className='input-section input-section--lanes' spacing={1}>
          <Grid item xs={4} className='details-col details-col--flex'>
            {image}
          </Grid>
          <Grid item xs={4} className='details-col details-col--flex'>
            <Typography className='col-title' variant='h6'>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={4} className='details-col details-col--flex'>
            {indeterminate
              ? (
                <Field
                  component={FOCheckField}
                  className='col-checkbox col-checkbox--all'
                  name={title.toLowerCase()}
                  label='Check All'
                  value={title.toLowerCase()}
                  onChange={this.handleChangeCheckAll}
                  indeterminate
                />
              )
              : (
                <Field
                  component={FOCheckField}
                  className='col-checkbox col-checkbox--all'
                  name={title.toLowerCase()}
                  label='Check All'
                  value={title.toLowerCase()}
                  onChange={this.handleChangeCheckAll}
                />
              )
            }
          </Grid>
        </Grid>
        <Grid container className='input-section' spacing={1}>
          {this.renderList(items)}
        </Grid>
      </div>
    );
  }
}

export default LanesGroup;
