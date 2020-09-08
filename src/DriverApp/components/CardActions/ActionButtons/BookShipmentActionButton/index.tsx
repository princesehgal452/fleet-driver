import React, { ComponentType, Dispatch } from 'react';
import { History, Location } from 'history';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DoneOutlineRounded } from '@material-ui/icons';
import Load from '../../../../../models/dataStructures/Load';
import Match from '../../../../../models/dataStructures/Match';
import FOCardActionListItem from '../../../../../components/FOCardActionListItem';
import FOBottomSheet from '../../../../../components/FOBottomSheet';
import { UserStore } from '../../../../store/UserStore';
import BookShipmentActionButtonContent from './BookShipmentActionButtonContent';
import BookShipmentConfirmDocument from './BookShipmentConfirmDocument';
import { MIXPANEL_EVENTS, ROUTES } from '../../../../../services/constants';
import { mixpanelLoadProperties, mixpanelTrack } from '../../../../../services/FOMixpanel';


const getLoadDetailsPath = (load: Load) => (load.isMatch ? `/driver/match/${load.matchId}/detail` : `/driver/load/${load.loadId}/detail`);

const toggleShowDialog = (showBottomSheet: boolean, load: Load, history: History,
  location: Location, toggleShowOnboarding: () => void, setLoadDetailPath: Dispatch<string>) => async () => {
  const { rootStore: { userStore: { defaultDriver, defaultDriverCompletedOnboarding }, matchStore: { reloadMatchResults } }, loadBookingStore: { loading } } = load;

  // Prevent closing dialog when loading in progress
  if (loading && !showBottomSheet) {
    return;
  }
  const loadDetailPath = getLoadDetailsPath(load);
  const inDetailsPage = location.pathname.includes(getLoadDetailsPath(load));

  // Show onboarding
  if (!inDetailsPage && !showBottomSheet) {
    if (defaultDriver && !defaultDriverCompletedOnboarding) {
      setLoadDetailPath(loadDetailPath);
      toggleShowOnboarding();
    }
  }
  if (inDetailsPage && !showBottomSheet) {
    (history.length < 2) ? history.push(loadDetailPath) : history.back();
    await reloadMatchResults();
  }
  if (!inDetailsPage && showBottomSheet) {
    // Cannot push 2 routes sequentially
    setTimeout(history.push, 0, `${loadDetailPath}`);
    setTimeout(history.push, 10, `${loadDetailPath}/${ROUTES.BOOK_SHOW}`);
  }
  if (inDetailsPage && showBottomSheet) {
    history.push(`${loadDetailPath}/${ROUTES.BOOK_SHOW}`);
  }
  if (showBottomSheet) {
    mixpanelTrack(MIXPANEL_EVENTS.BOOK_BUTTON_CLICKED, { ...mixpanelLoadProperties(load) });
  }
};

const uploadClickHandler = (load: Load, history: History, { isWebview, queryEmail, queryAuthToken }: UserStore) => () => {
  const loadDetailPath = getLoadDetailsPath(load);
  if (isWebview) {
    window.open(`${loadDetailPath}/${ROUTES.DOCUMENTS_SHOW}?email=${queryEmail}&authToken=${queryAuthToken}`);
  } else {
    history.push(`${loadDetailPath}/${ROUTES.DOCUMENTS_SHOW}`);
  }
};

const buttonText = (matchBooked?: Match, anyMatchBookedPending?: Match) => {
  if (matchBooked) {
    if (matchBooked.currentlyBeingTracked) {
      return 'In Progress';
    }
    if (matchBooked.matchBooked) {
      return 'Booked';
    }
  }
  if (anyMatchBookedPending) {
    return 'Processing';
  }
  return 'Book Now';
};

interface IBookShipmentActionButtonOwnProps {
  load: Load;
  userStore: UserStore;
  setLoadDetailPath: Dispatch<string>;
  toggleShowOnboarding: () => void;
  showCallDialog?: () => void;
  Icon?: ComponentType;
  lightGreen?: boolean;
}

type IBookShipmentActionButtonProps = IBookShipmentActionButtonOwnProps & RouteComponentProps;

const BookShipmentActionButton = observer(({
  load, userStore, history, location, lightGreen,
  setLoadDetailPath, toggleShowOnboarding, Icon, showCallDialog,
}: IBookShipmentActionButtonProps) => {
  const { bookedMatch, anyMatchBookedPending } = load;
  const { hasRequiredDocuments } = userStore;

  const showBottomSheet = location.pathname.includes(ROUTES.BOOK_SHOW);

  return (
    <>
      <FOCardActionListItem
        text={buttonText(bookedMatch, anyMatchBookedPending)}
        color='primary'
        lightGreen={lightGreen}
        Icon={Icon || DoneOutlineRounded}
        onClick={toggleShowDialog(true, load, history, location, toggleShowOnboarding, setLoadDetailPath)}
      />
      <FOBottomSheet
        open={showBottomSheet}
        closeHandler={toggleShowDialog(false, load, history, location, toggleShowOnboarding, setLoadDetailPath)}
      >
        {hasRequiredDocuments ? (
          <BookShipmentActionButtonContent
            load={load}
            closeHandler={toggleShowDialog(false, load, history, location, toggleShowOnboarding, setLoadDetailPath)}
          />
        ) : (
          <BookShipmentConfirmDocument
            cancelHandler={toggleShowDialog(false, load, history, location, toggleShowOnboarding, setLoadDetailPath)}
            uploadClickHandler={uploadClickHandler(load, history, userStore)}
          />
        )}
      </FOBottomSheet>
    </>
  );
});

export default withRouter(BookShipmentActionButton);
