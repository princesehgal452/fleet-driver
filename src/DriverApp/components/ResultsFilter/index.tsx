import React, { Dispatch, memo, ReactNode, useState } from 'react';
import { Button, Grid, makeStyles, Theme, Typography, Hidden } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import FOGrid from '../../../components/FOGrid';
import { Pagination } from '../../../models/interfaces/shared/IPagination';
import Fade from '@material-ui/core/Fade';
import SearchFilters from '../SearchPanel/SearchFilters';
import FOFullPageDialog from '../../../components/FOFullPageDialog';

interface IResultsFilter {
  resultType: string;
  dialogTitle: string;
  pagination?: Pagination;
  type: string;
}

interface IResultsCounter {
  totalItems?: null;
  resultType: string;
}

const spacingUnit = 1;

const useStyles = makeStyles((theme: Theme) => ({
  dialogRoot: {
    padding: theme.spacing(0, spacingUnit),
  },
  root:{
    backgroundColor: theme.palette.common.white,
  },
}));

const ResultsCounter = memo(({ totalItems, resultType }: IResultsCounter) => {
  if (!totalItems) return null;
  return (
    <>
      <Typography variant='inherit' color='primary' display='inline'>
        {resultType}
      </Typography>
      <>
        {` ${totalItems > 1 ? 'Results' : 'Result'} ${totalItems}`}
      </>
    </>
  );
});

const toggleShowFilterDialog = (setShowFilterDialog: Dispatch<boolean>, state: boolean) => () => setShowFilterDialog(!state);

const ResultsFilter = ({ resultType, pagination: { totalItems }, dialogTitle, type }: IResultsFilter) => {
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <FOGrid vSpacing={0} justify='space-between'>
      <Grid item>
        <Typography variant='subtitle2'>
          <ResultsCounter totalItems={totalItems} resultType={resultType} />
        </Typography>
      </Grid>
      <Grid item >
        <Button size='small' variant='text' onClick={toggleShowFilterDialog(setShowFilterDialog, showFilterDialog)}>
          <Grid container spacing={2} alignItems='center' wrap='nowrap'>
            <Grid item>
              Filter
            </Grid>
            <ArrowDropDown />
          </Grid>
        </Button>
      </Grid>
      <Hidden smDown={true}>
        <Fade in={showFilterDialog} mountOnEnter unmountOnExit >
          <Grid container>
            <Grid item md={12}>
              <SearchFilters type={type} />
            </Grid>
          </Grid>
        </Fade>
      </Hidden>

      <Hidden mdUp={true}>
        <FOFullPageDialog
          open={showFilterDialog}
          dialogTitle={dialogTitle}
          closeHandler={toggleShowFilterDialog(setShowFilterDialog, showFilterDialog)}
        >
          <div className={classes.dialogRoot}>
            <SearchFilters type={type} />
          </div>
        </FOFullPageDialog>
      </Hidden>
    </FOGrid>
    </div>
  );
};

export default ResultsFilter;
