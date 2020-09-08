import React, { Dispatch, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Box, Grid } from '@material-ui/core';
import { SearchStoreV3 } from 'DriverApp/store/SearchStoreV3';
import LoadCard from 'components/v3/LoadCardV3';
import FOInfiniteLoader from 'components/v3/FOInfiniteLoader';
import RALSubmitted from 'components/v3/RALPostContent/RALSubmitted';
import LoadSkeleton from 'components/v3/LoadSkeleton';
import SearchLoadsContentNoResults from './SearchLoadsContentNoResults';
import { SearchSteps } from '../SearchLoadsContentForm';

interface ISearchLoadsContentResultsProps {
  searchStoreV3: SearchStoreV3;
  pickupDateFieldValue;
  reflectDrawerState: Dispatch<boolean>;
  programmaticFormSumitToRAL: () => void;
  hideRalSubmittedConfirmation: () => void;
  ralSubmitLoading: boolean;
  setCurrentStep: (steps: SearchSteps) => void;
  showRALSubmitConfirmation?: boolean;
  isRALSearch?: boolean;
}

const SearchLoadsContentResults = observer(({
  searchStoreV3: { searchResults, downloadSearchResults },
  pickupDateFieldValue,
  reflectDrawerState,
  programmaticFormSumitToRAL,
  setCurrentStep,
  hideRalSubmittedConfirmation,
  ralSubmitLoading,
  showRALSubmitConfirmation,
  isRALSearch,
}: ISearchLoadsContentResultsProps) => {
  const resultsCount = useMemo(() => searchResults.results.length, [searchResults.results]);

  const NoResultsComponent = () => (
    <SearchLoadsContentNoResults
      resultsCount={resultsCount}
      pickupDateFieldValue={pickupDateFieldValue}
      reflectDrawerState={reflectDrawerState}
      ralSubmitLoading={ralSubmitLoading}
      setCurrentStep={setCurrentStep}
      programmaticFormSumitToRAL={programmaticFormSumitToRAL}
    />
  );

  const ResultsComponent = () => (
    <Grid container spacing={1}>
      {
        searchResults.results.map((load, index) => (
          <Grid item xs={12}>
            <Box px={1} py={index < 2 ? 1 : 2}>
              <LoadCard load={load} showMap={index < 3} />
            </Box>
          </Grid>
        ))
      }
    </Grid>
  );

  return (
    <>
      {
        isRALSearch && showRALSubmitConfirmation ? (
          <RALSubmitted
            resultsCount={resultsCount}
            reflectDrawerState={reflectDrawerState}
            showSearchResults={hideRalSubmittedConfirmation}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <FOInfiniteLoader
            resultsCount={resultsCount}
            NoResultsComponent={(
              <NoResultsComponent />
            )}
            LoadingMockComponent={<LoadSkeleton />}
            loading={searchResults.loading}
            error={null}
            downloadResults={downloadSearchResults}
            getMoreResults={searchResults.downloadNextResults}
            pagination={searchResults.pagination}
            ResultsComponent={(
              <ResultsComponent />
            )}
            ErrorComponent={<div />}
          />
        )
      }
    </>
  );
});

export default SearchLoadsContentResults;
