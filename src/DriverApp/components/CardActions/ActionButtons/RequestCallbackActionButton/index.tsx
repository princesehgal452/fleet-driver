import React, { Dispatch, useState } from 'react';
import { History } from 'history';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Load from '../../../../../models/dataStructures/Load';
import AvTimer from '@material-ui/icons/AvTimer';
import FOCardActionListItem from '../../../../../components/FOCardActionListItem';
import FOTransitionUp from '../../../../../components/FOTransitionUp';
import RequestCallbackActionButtonContent from './RequestCallbackActionButtonContent';
import { MIXPANEL_EVENTS } from '../../../../../services/constants';
import { mixpanelLoadProperties, mixpanelTrack } from '../../../../../services/FOMixpanel';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import { getAppContainer } from '../../../../../utils/utility';


const useStyles = makeStyles((theme: Theme) => ({
  noGutter: {
    padding: 0,
  },
  dateHighlight: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const getLoadDetailsPath = (load: Load) => load.isMatch ? `/driver/match/${load.matchId}/detail` : `/driver/load/${load.loadId}/detail`;

const toggleShowDialog = (setShowDialog: Dispatch<boolean>,
                          state: boolean,
                          toggleShowOnboarding: () => void,
                          setLoadDetailPath: Dispatch<string>,
                          load: Load,
                          history: History,
                          inDetailsPage: boolean) =>
  async () => {
    const { rootStore: { userStore: { defaultDriver, defaultDriverCompletedOnboarding }, matchStore: { reloadMatchResults } } } = load;

    setShowDialog(state);

    if (state) {
      mixpanelTrack(MIXPANEL_EVENTS.REQUEST_CALLBACK_BUTTON, { ...mixpanelLoadProperties(load) });
    }

    // show onboarding if trying to go to load details page if they didn't finish onboarding
    if (!inDetailsPage && !state) {
      const loadDetailPath = getLoadDetailsPath(load);
      if (defaultDriver && !defaultDriverCompletedOnboarding) {
        setLoadDetailPath(loadDetailPath);
        toggleShowOnboarding();
      } else {
        history.push(loadDetailPath);
        await reloadMatchResults();
      }
    }
  };

interface IRequestCallbackActionButtonOwnProps {
  load: Load;
  setLoadDetailPath: Dispatch<string>;
  toggleShowOnboarding: () => void;
}

type IRequestCallbackActionButtonProps = IRequestCallbackActionButtonOwnProps & RouteComponentProps & IDriverAppStore;

const RequestCallbackActionButton = inject('driverAppStore')(observer(({ load, history, location, setLoadDetailPath, toggleShowOnboarding, driverAppStore }: IRequestCallbackActionButtonProps) => {
  const { anyMatchActiveRequestedCallback } = load;
  const [showDialog, setShowDialog] = useState(false);
  const { configStore: { isGeotab } } = driverAppStore as DriverAppStore;
  const inDetailsPage = location.pathname === getLoadDetailsPath(load);

  return (
    <>
      <FOCardActionListItem
        text={anyMatchActiveRequestedCallback ? 'Callback Requested' : 'Request a call'}
        Icon={AvTimer}
        color={isGeotab ? 'secondary' : 'default'}
        variant='outlined'
        onClick={toggleShowDialog(setShowDialog, true, toggleShowOnboarding, setLoadDetailPath, load, history, inDetailsPage)}
      />
      <Dialog open={showDialog} fullScreen TransitionComponent={FOTransitionUp} container={getAppContainer}>
        <RequestCallbackActionButtonContent
          active={!!anyMatchActiveRequestedCallback}
          load={load}
          closeHandler={toggleShowDialog(setShowDialog, false, toggleShowOnboarding, setLoadDetailPath, load, history, inDetailsPage)}
        />
      </Dialog>
    </>
  );
}));

export default withRouter(RequestCallbackActionButton);
