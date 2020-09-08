import React, { memo, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { Badge, Box, Button, ClickAwayListener, Fab, Fade, Grid, Modal, Tooltip, Zoom, Slide } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Close, DeleteOutline, EditOutlined, FilterList } from '@material-ui/icons';

import { SearchStoreV3 } from 'DriverApp/store/SearchStoreV3';

import ReduxLoadFilters from 'components/v3/ReduxSets/ReduxLoadFilters';
import LoadFilterPartners from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterPartners';
import LoadFilterSorts from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterSorts/LoadFilterSorts';
import LoadFilterRate from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterRate';
import LoadFilterWeight from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterWeight';
import LoadFilterLaneSize from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterLaneSize';
import LoadFilterEquipments from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterEquipments';
import LoadFilterAdvancedRadius from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterAdvancedRadius';
import LoadFilterAdvancedDates from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterAdvancedDates';
import LoadFilterLoadSize from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterLoadSize';


const baseMargin = 8;

const useStyles = makeStyles((theme: Theme) => ({
  fabContainer: {
    position: 'fixed',
    bottom: 64 + baseMargin,
    right: baseMargin,
  },
  fabEditDelete: {
    position: 'fixed',
    bottom: 152,
    right: 17,
    width: 'max-content',
  },
  fabMoveToCenter: {
    bottom: 64 + 108,
    right: 150,
    '@media (max-width:320px)': {
      right: 135,
    },
    '@media (min-width:412px)': {
      right: 165,
    },
  },
  fabContainerToCenterAnimation: {
    animation: '$xAxisToCenter 200ms ease-out',
  },
  fabContainerChildToCenterAnimation: {
    animation: '$yAxisToCenter 200ms ease-in',
  },
  fabContainerToCornerAnimation: {
    animation: '$xAxisToCorner 200ms ease-in',
  },
  fabContainerChildToCornerAnimation: {
    animation: '$yAxisToCorner 200ms ease-out',
  },
  '@keyframes xAxisToCorner': {
    '100%': {
      animationTimingFunction: 'ease-out',
      transform: `translateX(${150 - baseMargin}px)`,
    },
    '@media (max-width:320px)': {
      '100%': {
        transform: `translateX(${135 - baseMargin}px)`,
      },
    },
    '@media (min-width:412px)': {
      '100%': {
        transform: `translateX(${165 - baseMargin}px)`,
      },
    },
  },
  '@keyframes yAxisToCorner': {
    '100%': {
      animationTimingFunction: 'ease-in',
      transform: 'translateY(100px)',
    },
  },
  '@keyframes xAxisToCenter': {
    '100%': {
      animationTimingFunction: 'ease-out',
      transform: `translateX(-${150 - baseMargin}px)`,
    },
    '@media (max-width:320px)': {
      '100%': {
        transform: `translateX(-${135 - baseMargin}px)`,
      },
    },
    '@media (min-width:412px)': {
      '100%': {
        transform: `translateX(-${165 - baseMargin}px)`,
      },
    },
  },
  '@keyframes yAxisToCenter': {
    '100%': {
      animationTimingFunction: 'ease-in',
      transform: 'translateY(-100px)',
    },
  },
  content: {
    position: 'absolute',
    backgroundColor: '#FBFBFB',
    borderRadius: 20,
    bottom: 64,
    width: '100%',
  },
  iconFlipper: {
    display: 'flex',
  },
  rotate: {
    animation: '$rotate 400ms',
  },
  badge: {
    '& span': {
      backgroundColor: '#FCE34D',
      border: '2px solid white',
      borderRadius: 16,
      right: 8,
      top: -18,
      height: 11,
      minWidth: 11,
    },
  },
  tooltipPopper: {
    position: 'fixed !important' as 'fixed',
    top: '437px !important',
  },
  tooltip: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 300,
    padding: theme.spacing(1, 2),
  },
  editFab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  deleteFab: {
    backgroundColor: '#FA4E45',
    color: theme.palette.common.white,
  },
  editDeleteButton: {
    width: 60,
    marginRight: 20,
    fontSize: theme.typography.pxToRem(11),
    padding: '2px, 4px',
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 2px 7px -1px rgba(0,0,0,0.36)',
  },
  '@keyframes rotate': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  extendedFabBtn: {
    height: 56,
    padding: theme.spacing(0, 2),
    borderRadius: 28,
    fontSize: theme.typography.pxToRem(16),
    textTransform: 'capitalize',
  },
  fabFilterIcon: {
    fontSize: theme.typography.pxToRem(26),
  },
}));

interface ISearchLoadsSortFiltersProps {
  searchStoreV3: SearchStoreV3;
  filtersOpen: boolean;
  setFiltersOpen: (newFilterState: boolean, revertFilterValues?: boolean) => void;
  change: (fieldName: string, value) => void;
  chipLabels: string[];
  partnersField;
  loadSortsField;
  loadSortsFieldValue;
  equipmentTypeListField;
  equipmentTypeListFieldValue;
  perMileRateField;
  weightField;
  laneSizeField;
  loadSizeField;
  laneSizeFieldValue;
  loadSizeFieldValue;
  dropoffLocationFieldValue;
  pickupDateField;
  dropoffDateField;
  pickupRadiusField;
  dropoffRadiusField;
  showBadge: boolean[];
  extendedFabFilter?: boolean;
}

const SearchLoadsSortFilters = memo(({
  searchStoreV3: {
    searchResults: {
      loading,
      results,
    },
  },
  weightField,
  change,
  laneSizeFieldValue,
  setFiltersOpen,
  loadSizeFieldValue,
  chipLabels,
  partnersField,
  loadSortsField,
  perMileRateField,
  showBadge,
  loadSizeField,
  laneSizeField,
  equipmentTypeListField,
  dropoffLocationFieldValue,
  equipmentTypeListFieldValue,
  pickupDateField,
  dropoffDateField,
  pickupRadiusField,
  dropoffRadiusField,
  filtersOpen,
  loadSortsFieldValue,
  extendedFabFilter,
}: ISearchLoadsSortFiltersProps) => {
  const classes = useStyles();

  const [rotate, setRotate] = useState(false);
  const [openedFilterFromEdit, setOpenedFilterFromEdit] = useState(false);
  const [mainFABTouching, setMainFABTouching] = useState(false);
  const [showFilterEditButtons, setShowFilterEditButtons] = useState(false);
  const [fabMoveToCenterClass, setFabMoveToCenterClass] = useState(false);
  const [fabMoveToCenterAnimation, setFabMoveToCenterAnimation] = useState(false);
  const [fabMoveToCornerAnimation, setFabMoveToCornerAnimation] = useState(false);

  const filtersInUse = useMemo(() => showBadge.find((currBadge) => currBadge), [showBadge]);

  const revertAllFilters = useCallback((e) => {
    e.stopPropagation();
    setFiltersOpen(false, true);
    setRotate(true);
  }, []);

  const onFabClick = useCallback((e) => {
    if (filtersInUse) {
      setRotate(true);
      if (showFilterEditButtons) {
        setShowFilterEditButtons(false);
      } else if (!showFilterEditButtons) {
        setShowFilterEditButtons(true);
      }
      // revertAllFilters(e);
    } else if (!fabMoveToCenterClass) {
      setFabMoveToCenterAnimation(true);
      setFabMoveToCornerAnimation(false);
    }
  }, [fabMoveToCenterClass, filtersInUse, showFilterEditButtons]);

  const onDialogClose = useCallback(() => {
    if (fabMoveToCenterAnimation) {
      setFabMoveToCenterAnimation(false);
      setFabMoveToCornerAnimation(true);
    }
  }, [fabMoveToCenterAnimation]);

  const removeRotate = useCallback((e) => {
    e.stopPropagation();
    setRotate(false);
  }, []);

  const onFabAnimationend = useCallback(() => {
    if (!filtersOpen && !fabMoveToCenterClass) {
      setFabMoveToCenterClass(true);
      setTimeout(setFiltersOpen, 0, true, !filtersInUse);
    } else {
      setFabMoveToCenterClass(false);
    }
  }, [filtersOpen, fabMoveToCenterClass]);

  const onFabEditClick = useCallback(() => {
    setOpenedFilterFromEdit(true);
    setShowFilterEditButtons(false);
    if (!fabMoveToCenterClass) {
      setFabMoveToCenterAnimation(true);
      setFabMoveToCornerAnimation(false);
    }
  }, [fabMoveToCenterClass]);

  const onFabResetClick = useCallback((e) => {
    setShowFilterEditButtons(false);
    revertAllFilters(e);
  }, []);

  const handleClose = useCallback(() => {
    if (filtersOpen) {
      setFiltersOpen(false, !openedFilterFromEdit);
    }
    setOpenedFilterFromEdit(false);
  }, [filtersOpen, openedFilterFromEdit]);

  const handleAccept = useCallback(() => {
    if (filtersOpen) {
      setFiltersOpen(false, false);
    }
  }, [filtersOpen]);

  const filterButtonEditDeleteOpenClickAwayHandler = useCallback(() => {
    if (showFilterEditButtons && !rotate && !mainFABTouching) {
      setShowFilterEditButtons(false);
    }
  }, [showFilterEditButtons, rotate, mainFABTouching]);

  const handleMainFABTouchStart = useCallback(() => {
    setMainFABTouching(true);
  }, []);

  const handleMainFABTouchEnd = useCallback(() => {
    setMainFABTouching(false);
  }, []);

  return (
    <Flipper flipKey={filtersOpen}>
      <ClickAwayListener
        touchEvent='onTouchStart'
        onClickAway={filterButtonEditDeleteOpenClickAwayHandler}
      >
        <Grid className={clsx(classes.fabEditDelete)} container direction='column' alignItems='flex-end' spacing={3}>
          <Box p={1.5}>
            <div>
              <Zoom
                in={showFilterEditButtons}
                mountOnEnter
                unmountOnExit
                style={{ transitionDelay: showFilterEditButtons ? '350ms' : '0ms' }}
              >
                <Button onClick={onFabEditClick} className={classes.editDeleteButton} variant='contained' size='small'>
                  Edit
                </Button>
              </Zoom>
              <Zoom
                in={showFilterEditButtons}
                mountOnEnter
                unmountOnExit
                style={{ transitionDelay: showFilterEditButtons ? '250ms' : '0ms' }}
              >
                <Fab onClick={onFabEditClick} size='small' className={classes.editFab}>
                  <EditOutlined />
                </Fab>
              </Zoom>
            </div>
          </Box>
          <Box p={1.5}>
            <div>
              <Zoom
                in={showFilterEditButtons}
                mountOnEnter
                unmountOnExit
                style={{ transitionDelay: showFilterEditButtons ? '300ms' : '0ms' }}
              >
                <Button onClick={onFabResetClick} className={classes.editDeleteButton} variant='contained' size='small'>
                  Clear
                </Button>
              </Zoom>
              <Zoom
                in={showFilterEditButtons}
                mountOnEnter
                unmountOnExit
                style={{ transitionDelay: showFilterEditButtons ? '150ms' : '50ms' }}
              >
                <Fab onClick={onFabResetClick} size='small' className={classes.deleteFab}>
                  <DeleteOutline />
                </Fab>
              </Zoom>
            </div>
          </Box>
        </Grid>
      </ClickAwayListener>
      <div
        className={clsx(classes.fabContainer, {
          [classes.fabMoveToCenter]: fabMoveToCenterClass,
          [classes.fabContainerToCenterAnimation]: fabMoveToCenterAnimation,
          [classes.fabContainerToCornerAnimation]: fabMoveToCornerAnimation,
        })}
      >
        <div
          className={clsx({
            [classes.fabContainerChildToCenterAnimation]: fabMoveToCenterAnimation,
            [classes.fabContainerChildToCornerAnimation]: fabMoveToCornerAnimation,
          })}
          onAnimationEnd={onFabAnimationend}
        >
          {!filtersOpen && (
            <>
              <Flipped flipId='sort-filter-container' onComplete={onDialogClose}>
                <div>
                  <Tooltip
                    title='Try adjusting the filters'
                    arrow
                    open={filtersInUse && !showFilterEditButtons && !fabMoveToCenterClass && !loading && results.length === 0}
                    classes={{ popper: classes.tooltipPopper, tooltip: classes.tooltip }}
                  >
                    <div />
                  </Tooltip>
                  <Fab
                    color='secondary'
                    onClick={onFabClick}
                    onAnimationEnd={removeRotate}
                    onTouchStart={handleMainFABTouchStart}
                    onTouchEnd={handleMainFABTouchEnd}
                    variant='extended'
                    className={classes.extendedFabBtn}
                  >
                    <div className={clsx(classes.iconFlipper, { [classes.rotate]: rotate })}>
                      {showFilterEditButtons ? (
                        <Flipped flipId='filterIcon'>
                          <>
                            <Close className={classes.fabFilterIcon} />
                            <Slide
                              direction='left'
                              in={extendedFabFilter}
                              mountOnEnter
                              unmountOnExit
                              style={{ transitionDelay: '0ms' }}
                            >
                              <Box ml={1.6}>Close</Box>
                            </Slide>
                          </>
                        </Flipped>
                      ) : (
                        <Flipped flipId='filterIcon'>
                          <>
                            <FilterList className={classes.fabFilterIcon} />
                            <Slide
                              direction='left'
                              in={extendedFabFilter}
                              mountOnEnter
                              unmountOnExit
                              timeout={{ enter: 100, exit: 50 }}
                            >
                              <Box ml={1.6}>Filter</Box>
                            </Slide>
                          </>
                        </Flipped>
                      )}
                    </div>
                  </Fab>
                  <Badge
                    key='sort-filter-fab-badge'
                    variant='dot'
                    invisible={!filtersInUse}
                    className={classes.badge}
                  />
                </div>
              </Flipped>
            </>
          )}
        </div>
      </div>
      <Modal open={filtersOpen} onClose={handleClose} disablePortal>
        <Fade>
          <Flipped flipId='sort-filter-container'>
            <div className={classes.content}>
              <ReduxLoadFilters
                onAccept={handleAccept}
                onCancel={handleClose}
                height={430}
                showBadge={showBadge}
                chipLabels={chipLabels}
                show={filtersOpen}
                bodyContent={(
                  [(
                    <Grid container direction='column' spacing={1}>

                      <Grid item>
                        <LoadFilterSorts
                          fieldName={loadSortsField.name}
                          loadSortsFieldValue={loadSortsFieldValue}
                          options={loadSortsField.options}
                        />
                      </Grid>
                    </Grid>
                  ), (
                    <Grid container direction='column' spacing={1}>
                      <Grid item>
                        <LoadFilterEquipments
                          fieldName={equipmentTypeListField.name}
                          equipmentTypeListFieldValue={equipmentTypeListFieldValue}
                        />
                      </Grid>
                      <Grid item>
                        <LoadFilterRate fieldName={perMileRateField.name} />
                      </Grid>
                      <Grid item>
                        <LoadFilterWeight fieldName={weightField.name} />
                      </Grid>
                      <Grid item>
                        <LoadFilterLaneSize
                          fieldName={laneSizeField.name}
                          change={change}
                          laneSizeFieldValue={laneSizeFieldValue}
                          options={laneSizeField.options}
                        />
                      </Grid>
                      <Grid item>
                        <LoadFilterLoadSize fieldName={loadSizeField.name} loadSizeFieldValue={loadSizeFieldValue} />
                      </Grid>
                    </Grid>
                  ), (
                    <Box p={2}>
                      <Grid container spacing={5} justify='space-between'>
                        <LoadFilterAdvancedDates
                          pickupDateField={pickupDateField}
                          dropoffDateField={dropoffDateField}
                        />
                        <LoadFilterAdvancedRadius
                          pickupRadiusField={pickupRadiusField}
                          dropoffDateField={dropoffRadiusField}
                          dropoffLocationFieldValue={dropoffLocationFieldValue}
                        />
                      </Grid>
                    </Box>
                  )]
                )}
              />
            </div>
          </Flipped>
        </Fade>
      </Modal>
    </Flipper>
  );
});

export default SearchLoadsSortFilters;
