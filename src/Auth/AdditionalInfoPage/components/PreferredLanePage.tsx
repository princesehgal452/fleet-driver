import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormSection, getFormValues, reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import LanesGroup from './LanesGroup';
import Lanes from '../../../assets/images/png/register-page/lanes.png';
import Northwest from '../../../assets/images/png/register-page/northwest.png';
import Southwest from '../../../assets/images/png/register-page/southwest.png';
import Central from '../../../assets/images/png/register-page/central.png';
import South from '../../../assets/images/png/register-page/south.png';
import Midwest from '../../../assets/images/png/register-page/midwest.png';
import Southeast from '../../../assets/images/png/register-page/southeast.png';
import Northeast from '../../../assets/images/png/register-page/northeast.png';
import Canada from '../../../assets/images/png/register-page/canada.png';

import './style.scss';


const formName = 'preferredLaneForm';

const lanes = [
  {
    title: 'Northwest',
    image: <img src={Northwest} className='col-image' alt='NorthWest Map' />,
    items: [
      {
        label: 'Idaho',
        value: 'ID',
      },
      {
        label: 'Oregon',
        value: 'OR',
      },
      {
        label: 'Montana',
        value: 'MT',
      },
      {
        label: 'Washington',
        value: 'WA',
      },
      {
        label: 'Wyoming',
        value: 'WY',
      },
    ],
  },
  {
    title: 'Southwest',
    image: <img src={Southwest} className='col-image' alt='Southwest Map' />,
    items: [
      {
        label: 'Arizona',
        value: 'AZ',
      },
      {
        label: 'California',
        value: 'CA',
      },
      {
        label: 'Colorado',
        value: 'CO',
      },
      {
        label: 'Nevada',
        value: 'NV',
      },
      {
        label: 'New Mexico',
        value: 'NM',
      },
      {
        label: 'Utah',
        value: 'UT',
      },
    ],
  },
  {
    title: 'Central',
    image: <img src={Central} className='col-image' alt='Central Map' />,
    items: [
      {
        label: 'Kansas',
        value: 'KS',
      },
      {
        label: 'North Dakota',
        value: 'ND',
      },
      {
        label: 'Nebraska',
        value: 'NE',
      },
      {
        label: 'South Dakota',
        value: 'SD',
      },
    ],
  },
  {
    title: 'South',
    image: <img src={South} className='col-image' alt='South Map' />,
    items: [
      {
        label: 'Arkansas',
        value: 'AR',
      },
      {
        label: 'Mississippi',
        value: 'MS',
      },
      {
        label: 'Texas',
        value: 'TX',
      },
      {
        label: 'Oklahoma',
        value: 'OK',
      },
      {
        label: 'Louisiana',
        value: 'LA',
      },
    ],
  },
  {
    title: 'Midwest',
    image: <img src={Midwest} className='col-image' alt='Midwest Map' />,
    items: [
      {
        label: 'Illinois',
        value: 'IL',
      },
      {
        label: 'Minnesota',
        value: 'MN',
      },
      {
        label: 'Iowa',
        value: 'IA',
      },
      {
        label: 'Indiana',
        value: 'IN',
      },
      {
        label: 'Michigan',
        value: 'MI',
      },
      {
        label: 'Ohio',
        value: 'OH',
      },
      {
        label: 'Wisconsin',
        value: 'WI',
      },
      {
        label: 'Missouri',
        value: 'MO',
      },
    ],
  },
  {
    title: 'Southeast',
    image: <img src={Southeast} className='col-image' alt='Southeast Map' />,
    items: [
      {
        label: 'Alabama',
        value: 'AL',
      },
      {
        label: 'Georgia',
        value: 'GA',
      },
      {
        label: 'Florida',
        value: 'FL',
      },
      {
        label: 'South Carolina',
        value: 'SC',
      },
      {
        label: 'Tennessee',
        value: 'TN',
      },
      {
        label: 'Kentucky',
        value: 'KY',
      },
    ],
  },
  {
    title: 'Northeast',
    image: <img src={Northeast} className='col-image' alt='Northeast Map' />,
    items: [
      {
        label: 'Connecticut',
        value: 'CT',
      },
      {
        label: 'Maine',
        value: 'ME',
      },
      {
        label: 'Vermont',
        value: 'VT',
      },
      {
        label: 'Massachusetts',
        value: 'MA',
      },
      {
        label: 'New Jersey',
        value: 'NJ',
      },
      {
        label: 'Rhode',
        value: 'RI',
      },
      {
        label: 'Pennsylvania',
        value: 'PA',
      },
      {
        label: 'West Virginia',
        value: 'WV',
      },
      {
        label: 'New York',
        value: 'NY',
      },
      {
        label: 'Virgin Islands',
        value: 'VI',
      },
      {
        label: 'Delaware',
        value: 'DE',
      },
      {
        label: 'Maryland',
        value: 'MD',
      },
      {
        label: 'North Carolina',
        value: 'NC',
      },
    ],
  },
  {
    title: 'Canada',
    image: <img src={Canada} className='col-image' alt='Canada Map' />,
    items: [
      {
        label: 'British Columbia',
        value: 'BC',
      },
      {
        label: 'Saskatchewan',
        value: 'SK',
      },
      {
        label: 'Alberta',
        value: 'AB',
      },
      {
        label: 'New Brunswick',
        value: 'NB',
      },
      {
        label: 'Manitoba',
        value: 'MB',
      },
      {
        label: 'Ontario',
        value: 'ON',
      },
      {
        label: 'Prince Edward',
        value: 'PE',
      },
      {
        label: 'Nova Scotia',
        value: 'NS',
      },
      {
        label: 'Québec',
        value: 'QC',
      },
      {
        label: 'Northwest Territories',
        value: 'NT',
      },
      {
        label: 'Nunavut',
        value: 'NU',
      },
      {
        label: 'Newfoundland and Labrador',
        value: 'NL',
      },
      {
        label: 'Yukon',
        value: 'YT',
      },
    ],
  },
];

class PreferredLanePage extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    allValues: PropTypes.object,
    loading: PropTypes.bool,
    preferredLanesSectionName: PropTypes.string,
    formRef: PropTypes.instanceOf(Element),
    setCheckedAllState: PropTypes.func,
    checkedAll: PropTypes.bool,
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

  // componentDidUpdate() {
  //   const { allValues } = this.props;
  //   this.setIndeterminate(allValues);
  // }

  setIndeterminate = (allValues) => {
    const { change, preferredLanesSectionName, setCheckedAllState } = this.props;
    let checkedCount = 0;
    let count = 0;
    for (let laneIndex = 0; laneIndex < lanes.length; laneIndex += 1) {
      let tempCount = 0;
      let tempCheckedCount = 0;
      for (let index = 0; index < lanes[laneIndex].items.length; index += 1) {
        const name = lanes[laneIndex].items[index].value;
        tempCount += 1;
        if (allValues && allValues[preferredLanesSectionName] && allValues[preferredLanesSectionName][name]) {
          tempCheckedCount += 1;
        }
      }
      change(`${preferredLanesSectionName}.${lanes[laneIndex].title.toLowerCase()}`, tempCount === tempCheckedCount);
      count += tempCount;
      checkedCount += tempCheckedCount;
    }
    this.setState({
      indeterminate: (count !== checkedCount) && (checkedCount > 0),
    });
    setCheckedAllState(count === checkedCount);
  };

  handleChangeCheckAll = (event) => {
    const { change, preferredLanesSectionName, setCheckedAllState } = this.props;
    this.setState({
      indeterminate: false,
    });
    setCheckedAllState(event.target.checked);
    for (let laneIndex = 0; laneIndex < lanes.length; laneIndex += 1) {
      for (let index = 0; index < lanes[laneIndex].items.length; index += 1) {
        const name = lanes[laneIndex].items[index].value;
        change(`${preferredLanesSectionName}.${name}`, event.target.checked);
      }
      change(`${preferredLanesSectionName}.${lanes[laneIndex].title.toLowerCase()}`, event.target.checked);
    }
  };

  render() {
    const { indeterminate } = this.state;
    const {
      loading, handleSubmit, preferredLanesSectionName, allValues, change, formRef,
      checkedAll, onSubmit, setCheckAllRef,
    } = this.props;
    return (
      <form className='form-container' ref={formRef} onSubmit={handleSubmit}>
        <FormSection className='form-container-section' name={preferredLanesSectionName}>
          <div className='additional-info-form additional-info-form--lanes'>
            <div className='additional-info-form__header additional-info-form__header--lanes'>
              <div className='image-section'>
                <img src={Lanes} alt='lanes' />
              </div>
              <div className='title-section'>
                <Typography variant='subtitle1' className='form-title'>
                  What lanes do you prefer?
                </Typography>
              </div>
            </div>
            <div className='additional-info-form__content lane-content'>
              {lanes.map(lane => (
                <LanesGroup
                  formSectionName={preferredLanesSectionName}
                  key={lane.title}
                  data={lane}
                  allValues={allValues}
                  change={change}
                />
              ))}
            </div>
          </div>
          <div className='form-actions'>
            <Grid container className='checkall-section'>
              <Grid item xs={8} className='details-col details-col--flex'>
                <Grid container direction='column' alignItems='baseline'>
                  <Grid item>
                    <Typography className='checkall-title' variant='subtitle1'>
                      I follow the money!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className='checkall-description' variant='h5'>
                      Selecting this will show loads across the entire U.S.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} className='details-col'>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      className='checkall-checkbox'
                      disabled={loading}
                      control={(
                        <Checkbox
                          checked={checkedAll}
                          onChange={this.handleChangeCheckAll}
                          value='checkedAll'
                          indeterminate={indeterminate}
                          inputRef={setCheckAllRef} // Give ref of this element to the parent, so that they can call focus() on it
                          // when it loads. This is to fix a bug specifc to safari where scrolling would not work
                          // because the focus is on parent element.
                          // Check - https://stackoverflow.com/questions/48873171/webkit-overflow-touch-stops-working-when-tapping-on-element-outside-of-scroll
                        />
                      )}
                      label='Check All'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      className='btn-form btn-form--previous'
                      onClick={handleSubmit((data) => {
                        onSubmit(data, true);
                      })}
                    >
                      Skip and Continue
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </FormSection>
      </form>
    );
  }
}

const PreferredLaneForm = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(PreferredLanePage);

const PreferredLanePageConnect = connect(
  state => ({ allValues: getFormValues(formName)(state) }),
  null,
  null,
  { forwardRef: true },
)(PreferredLaneForm);

export default PreferredLanePageConnect;
