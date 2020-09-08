import React from 'react';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import SearchLoadsContentForm from '../SearchLoadsContent/SearchLoadsContentForm';

interface IRALPostContentProps {
  isDrawerOpen: boolean;
  reflectDrawerState: (newState: boolean) => void;
  prefillSearchQuery?;
}

const RALPostContent = ({ isDrawerOpen, reflectDrawerState, prefillSearchQuery }: IRALPostContentProps) => {
  const theme = useTheme();

  return (
    <Box height={theme.custom.constants.fullHeight}>
      <SearchLoadsContentForm
        isRALSearch
        drawerClosed={!isDrawerOpen}
        reflectDrawerState={reflectDrawerState}
        prefillSearchQuery={prefillSearchQuery}
      />
    </Box>
  );
};

export default RALPostContent;
