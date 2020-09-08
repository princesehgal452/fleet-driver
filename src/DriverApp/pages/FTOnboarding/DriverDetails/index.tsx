import React from 'react';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { DriverAppStore } from '../../../store/DriverAppStore';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DispatcherDriverSelect from '../../../../Auth/AdditionalInfoPage/components/DispatcherDriverSelect';
import ConfirmFleetSetup from '../ConfirmFleetSetup';
import { UserStore } from '../../../store/UserStore';
import ConfigStore from '../../../store/ConfigStore';

const styles = (theme: Theme) => ({});

interface IDriverDetailsFormOwnProps {
  handleSubmit: () => void;
  userStore: UserStore;
  configStore: ConfigStore;
}

type IDriverDetailsFormProps = IDriverDetailsFormOwnProps &
  WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class DriverDetails extends React.Component<IDriverDetailsFormProps> {
  state = {
    showConfirmPrompt: false
  }

  setFormRef = (el) => {
    if (el) {
      this.setState({ formRef: el });
    }
  };

  showConfirmPrompt = () => {
    this.setState({ showConfirmPrompt : true})
  }

  handleDismissPrompt = () => {
    this.setState({ showConfirmPrompt : false})
  }

  render() {
    const { classes, handleSubmit, userStore, configStore } = this.props;

    return (
        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
          <Grid item container xs={12} sm={10} md={4}>
            <DispatcherDriverSelect
              ref={this.setFormRef}
              userStore={userStore}
              configStore={configStore}
              onSubmit={this.showConfirmPrompt}
            />
          </Grid>
          
          <Grid item container xs={12} sm={10} md={4}>
            <Button type='submit' color='secondary' variant='contained' fullWidth onClick={this.showConfirmPrompt}>
              NEXT <ChevronRightIcon />
            </Button>
          </Grid>
          {
            this.state.showConfirmPrompt &&
            <ConfirmFleetSetup submitCallback={handleSubmit} dismissPromptCallback={this.handleDismissPrompt} />
          }
        </Grid>
    );
  }
}

export default withStyles(styles)(DriverDetails);
