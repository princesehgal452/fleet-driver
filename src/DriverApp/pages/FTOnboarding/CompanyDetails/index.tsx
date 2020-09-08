import React from 'react';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change, reduxForm, Field } from 'redux-form';
import FOTextField from '../../../../components/FOTextField';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Box, Grid, Button } from '@material-ui/core';
import FreightLogo from '../../../../assets/images/png/ftCreateAccount/FreightLogo.png';
import BlueTruckIcon from '../../../../assets/images/png/ftCreateAccount/BlueTruckIcon.png';
import { required, phoneExactLength10 } from '../../../../services/Validations';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = (theme: Theme) => ({});

const formName = 'companyInfo';

interface ICompanyDetailsFormOwnProps {
  handleSubmit: PropTypes.func.isRequired;
  onSubmit: (values) => void;
}

type ICompanyDetailsFormProps = ICompanyDetailsFormOwnProps &
  WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class CompanyDetails extends React.Component<ICompanyDetailsFormProps> {
  submitHandler = (values) => {
    this.props.onSubmit(values);
  };

  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitHandler)}>
        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
          <Grid item >
            <Box mt={8} mb={6}>
              <img src={FreightLogo} />
            </Box>
          </Grid>
          <Grid item>
            <Box mb={4}>
              <img src={BlueTruckIcon} />
            </Box>
          </Grid>
          <Grid item container xs={12} sm={10} md={4}>
            <Field
              component={FOTextField}
              name='companyName'
              label='Company Name'
              fullWidth
              validate={[required]}
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item container xs={12} sm={10} md={4}>
            <Field
              component={FOTextField}
              name='firstName'
              label='First Name'
              fullWidth
              validate={[required]}
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item container xs={12} sm={10} md={4}>
            <Field
              component={FOTextField}
              name='lastName'
              label='Last Name'
              fullWidth
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item container xs={12} sm={10} md={4}>
            <Field
              component={FOTextField}
              name='phone'
              label='Phone Number'
              fullWidth
              validate={[required]}
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item container xs={12} sm={10} md={4}>
            <Field
              component={FOTextField}
              name='dotNumber'
              label='DOT Number'
              fullWidth
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item container xs={12} sm={10} md={4}>
            <Button type='submit' color='secondary' variant='contained' fullWidth>
              NEXT <ChevronRightIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const CompanyDetailsForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
  enableReinitialize: true,
})(CompanyDetails);

const CompanyDetailsFormConnect = connect(
  (state, ownProps) => ({}),
  (dispatch) => bindActionCreators({ change }, dispatch),
  null,
  { forwardRef: true }
)(CompanyDetailsForm);

export default withStyles(styles)(CompanyDetailsFormConnect);
