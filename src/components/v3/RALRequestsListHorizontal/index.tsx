import React, { ReactNode } from 'react';
import 'firebase/auth';
import { observer } from 'mobx-react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import FOGridHorizontalScroll from 'components/v3/FOGridHorizontalScroll';
import FOSectionTitle from 'components/v3/FOSectionTitle';
import RALRequestListCard from './RALRequestListCard';

interface IRALRequestsListHorizontalOwnProps {
  title: string | ReactNode;
  listItems;
}

type IRALRequestsListHorizontalProps = IRALRequestsListHorizontalOwnProps;

const RALRequestsListHorizontal = observer(({ title, listItems }: IRALRequestsListHorizontalProps) => {

  const renderLaneCardContent = (result, index) => (
    <RALRequestListCard result={result} index={index} />
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box pt={1.75} pl={1.75} pb={1.5}>
          <FOSectionTitle>
            {title}
          </FOSectionTitle>
        </Box>
      </Grid>
      <Grid container>
        <FOGridHorizontalScroll
          listItems={listItems}
          renderItem={renderLaneCardContent}
          listEdgeBorderRadius={4}
        />
      </Grid>
    </Grid>
  );
});

export default RALRequestsListHorizontal;
