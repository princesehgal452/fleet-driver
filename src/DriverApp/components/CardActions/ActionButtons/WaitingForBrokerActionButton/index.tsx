import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import FOCardActionListItem from '../../../../../components/FOCardActionListItem';
import Load from '../../../../../models/dataStructures/Load';
import WaitingForBrokerDialog from '../../ActionDialogs/WaitingForBrokerDialog';


interface IWaitingForBrokerActionButtonOwnProp {
  load: Load | null;
}

type IWaitingForBrokerActionButtonProp = IWaitingForBrokerActionButtonOwnProp & RouteComponentProps;

@observer
class WaitingForBrokerActionButton extends React.Component<IWaitingForBrokerActionButtonProp> {
  state = {
    openWaitingDialog: false,
  };

  locationUnlisten;

  bidActionButtonClickHandler = () => {
    const { history, match } = this.props;
    this.openWaitingDialog();
    history.push(`${match.url}/waiting`);
  };

  openWaitingDialog = () => {
    const { history } = this.props;
    this.setState({ openWaitingDialog: true });
    this.locationUnlisten = history.listen(({ location }) => {
      if (!location.pathname.includes('waiting')) {
        this.closeWaitingDialog();
      }
    });
  };

  closeWaitingDialog = () => {
    const { history, match } = this.props;
    this.setState({ openWaitingDialog: false });
    this.locationUnlisten();
    history.push(match.url);
  };

  render() {
    const { load } = this.props;
    const { openWaitingDialog } = this.state;
    return (
      load && (
        <>
          <FOCardActionListItem
            text='Offer Sent'
            color='secondary'
            variant='contained'
            onClick={this.bidActionButtonClickHandler}
          />
          <WaitingForBrokerDialog open={openWaitingDialog} load={load} closeHandler={this.closeWaitingDialog} />
        </>
      ));
  }
}

export default withRouter(WaitingForBrokerActionButton);
