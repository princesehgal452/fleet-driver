import React, { useState } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import useResizeObserver from 'use-resize-observer';
import { Grid, Hidden, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FOInfiniteLoader from '../../../../components/FOInfiniteLoader';
import { PostMyTruckCard } from '../../../components/PostMyTruckCard';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import PostTruckPanelAdditionalOptions from '../../../components/PostTruckPanel/PostTruckPanelAdditionalOptions';
import FOGrid from '../../../../components/FOGrid';


const useStyles = makeStyles((theme: Theme) => ({
  // We want content inside of the infinite loader to scroll only.
  // Rest of the them should hide overflow
  // Refer to https://stackoverflow.com/questions/56093138/scrollable-flex-child-with-flex-grow-1
  flexStretch: {
    flexGrow: 1,
  },
  hideOverflow: {
    overflow: 'hidden',
  },
  autoOverflow: {
    overflow: 'auto',
  },
  infiniteLoader: ({ heightContainer, heightTitle }) => ({
    height: heightContainer - heightTitle,
    padding: 2,
    overflow: 'hidden',
    display: 'flex',
  }),
  driverPageContent: {
    maxHeight: 'calc(100vh - 322px) !important'
  },
}));

const handleMenuClick = (currentMenuAnchorEl, setMenuAnchorEl, currentRequestId, setRequestId) => (requestId) => (event) => {
  if (currentRequestId !== requestId) {
    setRequestId(requestId);
  }
  if (currentMenuAnchorEl !== event?.target) {
    setMenuAnchorEl(event.currentTarget);
  }
};

const handleMenuClose = (currentMenuAnchorEl, setMenuAnchorEl, currentRequestId, setRequestId) => () => {
  if (currentRequestId !== null) {
    setMenuAnchorEl(null);
  }
  if (currentMenuAnchorEl !== null) {
    setRequestId(null);
  }
};

const handleMenuItemAction = (requestId: string | null, { deleteRALRequest }: DriverTruck, menuCloseHandler: () => void) => () => {
  if (requestId) {
    deleteRALRequest(requestId);
  }
  menuCloseHandler();
};

interface ITruckPageContent {
  loading: boolean;
  isGeotab: boolean;
  driverTruck: DriverTruck | null;
}

const TruckPageContent = observer(({
                                     driverTruck, minDate, validateDates, clearValues, pristine, loading, submitting, isGeotab,
                                   }: ITruckPageContent) => {
  const [refContainer, widthContainer, heightContainer] = useResizeObserver();
  const [refTitle, widthTitle, heightTitle] = useResizeObserver();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const classes = useStyles({ heightContainer, heightTitle });

  const menuCloseHandler = handleMenuClose(menuAnchorEl, setMenuAnchorEl, requestId, setRequestId);
  const menuClickHandler = handleMenuClick(menuAnchorEl, setMenuAnchorEl, requestId, setRequestId);

  return (
    <Grid container item className={classNames(classes.flexStretch)}>
      <div className={classNames('driver-page-content', classes.flexStretch, (isGeotab && classes.driverPageContent))} ref={refContainer}>
        <Grid container spacing={3} className={classNames(classes.flexStretch)}>
          <Hidden smDown>
            <Grid item xs={6}>
              <FOGrid>
                <Paper>
                  <FOGrid>
                    <PostTruckPanelAdditionalOptions
                      validateDates={validateDates}
                      pristine={pristine}
                      clearValues={clearValues}
                      minDate={minDate}
                      submitting={submitting}
                      loading={loading}
                      fullRowFields
                    />
                  </FOGrid>
                </Paper>
              </FOGrid>
            </Grid>
          </Hidden>
          <Grid
            item
            xs
            wrap='nowrap'
            container
            direction='column'
            className={classNames(classes.flexStretch)}
          >
            <Grid item ref={refTitle}>
              <Typography variant='subtitle2' className='historical-searches__container'>
                Recent Load Requests
              </Typography>
            </Grid>
            {driverTruck && (
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={menuCloseHandler}
              >
                <MenuItem onClick={handleMenuItemAction(requestId, driverTruck, menuCloseHandler)}>
                  Delete
                </MenuItem>
              </Menu>
            )}
            <Grid container item className={classes.flexStretch}>
              {driverTruck && (
                <FOInfiniteLoader
                  ResultsComponent={driverTruck.RALRequests.results && driverTruck.RALRequests.results.length > 0 && (
                    <div className={classes.infiniteLoader}>
                      <Grid
                        container
                        direction='column'
                        spacing={1}
                        className={classNames(classes.flexStretch, classes.autoOverflow)}
                        wrap='nowrap'
                      >
                        {driverTruck.RALRequests.results.map((truckRequest) => (
                          <Grid item>
                            <Paper>
                              <PostMyTruckCard
                                collectionItem={truckRequest}
                                handleMenuClick={menuClickHandler}
                              />
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  )}
                  LoadingMockComponent={<div>loading</div>}
                  downloadResults={driverTruck.RALRequests.downloadResults}
                  loading={loading}
                  ErrorComponent={<div />}
                  NoResultsComponent={<Typography>Your requests for loads will show here</Typography>}
                  resultsCount={driverTruck.RALRequests.results.length}
                  pagination={driverTruck.RALRequests.pagination}
                  getMoreResults={driverTruck.RALRequests.downloadNextResults}
                  downloadResultArgs={{ personId: driverTruck.personId }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
});

export default TruckPageContent;
