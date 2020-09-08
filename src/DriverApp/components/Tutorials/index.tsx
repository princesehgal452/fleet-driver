import React from 'react';
import { inject, observer } from 'mobx-react';
import { Dialog } from '@material-ui/core';
import TutorialStepper from '../TutorialStepper';
import MyLoadsPageOO from '../../../assets/images/png/tutorials/ownerOperator/MyLoadsPageOO';
import SettingsPageOO from '../../../assets/images/png/tutorials/ownerOperator/SettingsPageOO';
import RALPageOO from '../../../assets/images/png/tutorials/ownerOperator/RALPageOO';
import SearchPageOO from '../../../assets/images/png/tutorials/ownerOperator/SearchPageOO';
import MyLoadsPageDispatcher from '../../../assets/images/png/tutorials/dispatcher/MyLoadsPageDispatcher';
import DriversPageDispatcher from '../../../assets/images/png/tutorials/dispatcher/DriversPageDispatcher';
import SearchPageDispatcher from '../../../assets/images/png/tutorials/dispatcher/SearchPageDispatcher';
import SettingsPageDispatcher from '../../../assets/images/png/tutorials/dispatcher/SettingsPageDispatcher';
import { DriverAppStore } from '../../store/DriverAppStore';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { Tutorial } from '../../../services/constants';
import { getAppContainer } from '../../../utils/utility';


const dispatcherSteps = {
  [Tutorial.MY_LOADS_PAGE]: MyLoadsPageDispatcher,
  [Tutorial.DRIVERS_PAGE]: DriversPageDispatcher,
  [Tutorial.SEARCH_PAGE]: SearchPageDispatcher,
  [Tutorial.SETTINGS_PAGE]: SettingsPageDispatcher,
};

const defaultDriverSteps = {
  [Tutorial.MY_LOADS_PAGE]: MyLoadsPageOO,
  [Tutorial.RAL_PAGE]: RALPageOO,
  [Tutorial.SEARCH_PAGE]: SearchPageOO,
  [Tutorial.SETTINGS_PAGE]: SettingsPageOO,
};

interface ITutorialsState {
  showTutorialDialog: boolean;
}

interface ITutorialsOwnProps {
  tutorialKey: string;
}

type ITutorialsProps = IDriverAppStore & ITutorialsOwnProps;

@inject('driverAppStore')
@observer
class Tutorials extends React.Component<ITutorialsProps, ITutorialsState> {
  constructor(props: Readonly<ITutorialsProps>) {
    super(props);
    this.state = {
      showTutorialDialog: false,
    };
  }

  get tutorialValue() {
    const { driverAppStore, tutorialKey } = this.props;
    const { userStore: { FOUser: { tutorial } } } = driverAppStore as DriverAppStore;
    return Boolean(tutorial[tutorialKey]);
  }

  componentDidMount() {
    this.checkTutorialSteps();
  }

  toggleShowTutorialDialog = () => {
    const { showTutorialDialog: showTutorialDialogCurr } = this.state;
    this.setState({ showTutorialDialog: !showTutorialDialogCurr });
  };

  checkTutorialSteps = () => {
    if (!this.tutorialValue) {
      this.toggleShowTutorialDialog();
    }
  };

  tutorialCloseHandler = async () => {
    const { driverAppStore, tutorialKey } = this.props;
    const { userStore: { sendTutorialUpdate } } = driverAppStore as DriverAppStore;
    this.toggleShowTutorialDialog();
    await sendTutorialUpdate({ [tutorialKey]: true });
  };

  render() {
    const { showTutorialDialog } = this.state;
    const { driverAppStore, tutorialKey } = this.props;
    const { userStore: { dispatcher, defaultDriver }, configStore: { isGeotab } } = driverAppStore as DriverAppStore;

    if (isGeotab) {
      return null;
    }

    if (defaultDriver) {
      return (
        <Dialog open={showTutorialDialog && defaultDriverSteps[tutorialKey]} container={getAppContainer}>
          <TutorialStepper steps={defaultDriverSteps[tutorialKey]} closeHandler={this.tutorialCloseHandler} />
        </Dialog>
      );
    }
    if (dispatcher) {
      return (
        <Dialog open={showTutorialDialog && dispatcherSteps[tutorialKey]} maxWidth={false} container={getAppContainer}>
          <TutorialStepper steps={dispatcherSteps[tutorialKey]} closeHandler={this.tutorialCloseHandler} />
        </Dialog>
      );
    }
    return null;
  }
}

export default Tutorials;
