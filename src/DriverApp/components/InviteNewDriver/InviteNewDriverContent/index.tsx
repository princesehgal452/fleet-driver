import React from 'react';
import { inject, observer } from 'mobx-react';
import { connect } from 'react-redux';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { Field, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import Cancel from '@material-ui/icons/CancelRounded';
import { required, validateEmail } from '../../../../services/formValidations';
import { PostDriverInvite } from '../../../../services/APIServices/PostDriverInvite';
import { DriverAppStore } from '../../../store/DriverAppStore';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import FOTextField from '../../../../components/FOTextField';


const formName = 'driverInvitationForm';
const fieldName = 'driverInvitationEmailField';

const styles = (theme: Theme) => ({
  root: {
    overflow: 'hidden',
    paddingTop: theme.spacing(3),
  },
  submitButton: {
    width: 90,
  },
});

interface IInviteNewDriverContentOwnProps {
  closeHandler: () => void;
  [fieldName]?: string;
}

type IInviteNewDriverContentProps =
  IInviteNewDriverContentOwnProps & IDriverAppStore & WithStyles<typeof styles>
  & InjectedFormProps<{}, IInviteNewDriverContentOwnProps>;

@inject('driverAppStore')
@observer
class InviteNewDriverContent extends React.Component<IInviteNewDriverContentProps> {
  state = {
    fieldsValues: [],
    loading: false,
  };

  addField = () => {
    const { driverInvitationEmailField, reset } = this.props;
    const { fieldsValues: currentFieldsValues } = this.state;
    this.setState({ fieldsValues: [...currentFieldsValues, driverInvitationEmailField] });
    reset();
  };

  removeField = fieldIndex => () => {
    const { fieldsValues: currentFieldsValues } = this.state;
    this.setState({ fieldsValues: currentFieldsValues.filter((field, index) => index !== fieldIndex) });
  };

  uniqArray = (arrArg) => {
    return Array.from(new Set(arrArg));
  };

  submitHandler = async () => {
    const { driverAppStore, closeHandler } = this.props;
    const { fieldsValues } = this.state;
    const {
      snackbarStore: { enqueueSnackbarStore },
      userStore: { FOUser: { fleetId } },
    } = driverAppStore as DriverAppStore;
    const phoneNumbers: string[] = [];
    const emails: string[] = this.uniqArray(fieldsValues);
    try {
      this.setState({ loading: true });
      await PostDriverInvite(fleetId, emails, phoneNumbers);
      enqueueSnackbarStore('Successfully invited new drivers', { variant: 'success' });
      closeHandler();
    } catch (error) {
      this.setState({ loading: false });
      enqueueSnackbarStore('Technical error inviting new drivers', { variant: 'error' });
    }
  };

  render() {
    const { driverAppStore, handleSubmit, closeHandler, invalid, classes } = this.props;
    const { fieldsValues, loading } = this.state;
    return (
      <div>
        <DialogContent className={classes.root}>
          <Grid container direction='column' spacing={2}>
            <Grid item><Typography variant='h6' align='center'>Invite Driver</Typography></Grid>
            <Grid item><Typography variant='subtitle2' align='center'>
              Invited drivers will show once they've onboarded
            </Typography></Grid>
            <Grid item>
              <Field
                component={FOTextField}
                className='input-field'
                label='Email Address'
                name={fieldName}
                validate={[required, validateEmail]}
                fullWidth
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Button disabled={invalid} onClick={this.addField}>Add</Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              {fieldsValues.map((fieldsValue, index) => (
                <div key={`${fieldsValue}-${index}`}>
                  <Grid container justify='space-between' alignItems='center'>
                    <Grid item><Typography>{fieldsValue}</Typography></Grid>
                    <Grid item>
                      <IconButton onClick={this.removeField(index)}><Cancel /></IconButton>
                    </Grid>
                  </Grid>
                  <Divider />
                </div>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Cancel</Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.submitButton}
            disabled={fieldsValues.length < 1}
            onClick={this.submitHandler}
          >
            {loading ? <CircularProgress size={24} color='primary' /> : 'Submit'}
          </Button>
        </DialogActions>
      </div>
    );
  }
}

const InviteNewDriverContentForm = reduxForm<{}, IInviteNewDriverContentOwnProps>({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
})(withStyles(styles)(InviteNewDriverContent));

const selector = formValueSelector(formName);
export default connect<{}, {}, IInviteNewDriverContentOwnProps>(
  state => ({
    [fieldName]: selector(state, fieldName),
  }),
)(InviteNewDriverContentForm);

