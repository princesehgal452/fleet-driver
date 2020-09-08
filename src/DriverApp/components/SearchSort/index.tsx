import React, { memo, ReactNode, RefObject } from 'react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import AttachMoneyOutlined from '@material-ui/icons/AttachMoneyOutlined';
import NewReleasesOutlined from '@material-ui/icons/NewReleasesOutlined';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import SearchStore from '../../store/SearchStore';
import SearchSortItem from './SearchSortItem';
import { SortValues } from '../../../services/constants';


const styles = (theme: Theme) => ({
  popover: {
    maxWidth: 225,
  },
});

const closeHandler = (closeHandler, setValueHandler?, value?) => () => {
  closeHandler();
  if (setValueHandler && value) {
    setValueHandler(value);
  }
};

const openHandler = (openHandler, isOpen) => (e) => {
  if (!isOpen) {
    openHandler(e);
  }
};

const transformOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

const filterText = (sortFilter: SortValues) => {
  switch (sortFilter) {
    case SortValues.RATE:
      return 'Rate';
    case SortValues.NEWEST:
      return 'Newest';
    case SortValues.PICKUP_DATE:
      return 'Pickup Date';
  }
};

interface ISearchSortOwnProps {
  searchStore: SearchStore;
  children: ReactNode;
  setRef?: RefObject<void>;
}

type ISearchSortProps = ISearchSortOwnProps & WithStyles<typeof styles>;

const SearchSort = memo(({ searchStore: { setSortFilter, sortFilter }, children, setRef, classes }: ISearchSortProps) => {
  const popupState = usePopupState({ variant: 'popover' });
  popupState.anchorEl = setRef;
  return (
    <div onClick={openHandler(popupState.open, popupState.isOpen)}>
      <div {...bindPopover(popupState)}>
        {children}
      </div>
      <Popover
        {...bindPopover(popupState)}
        onBackdropClick={closeHandler(popupState.close)}
        classes={{ paper: classes.popover }}
        transformOrigin={transformOrigin}
      >
        <Button fullWidth onClick={closeHandler(popupState.close, setSortFilter, SortValues.RATE)}>
          <SearchSortItem icon={<AttachMoneyOutlined />} label={filterText(SortValues.RATE)} />
        </Button>
        <Button fullWidth onClick={closeHandler(popupState.close, setSortFilter, SortValues.NEWEST)}>
          <SearchSortItem icon={<NewReleasesOutlined />} label={filterText(SortValues.NEWEST)} />
        </Button>
        <Button fullWidth onClick={closeHandler(popupState.close, setSortFilter, SortValues.PICKUP_DATE)}>
          <SearchSortItem icon={<CalendarTodayOutlined />} label={filterText(SortValues.PICKUP_DATE)} />
        </Button>
      </Popover>
    </div>
  );
});

export default withStyles(styles)(SearchSort);
