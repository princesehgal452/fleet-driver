import React from 'react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import DocumentsCarouselItem from './DocumentsCarouselItem';
import { UserStore } from '../../store/UserStore';
import { observer } from 'mobx-react';


const styles = (theme: Theme) => ({
  gridListContainer: {
    flexWrap: 'nowrap' as 'nowrap',
  },
});

interface IDocumentsCarouselOwnProps {
  userStore: UserStore;
  handleCarouselItemClick?: () => void;
}

type IDocumentsCarouselProps = IDocumentsCarouselOwnProps & WithStyles<typeof styles>;

const DocumentsCarousel = observer(({ userStore, handleCarouselItemClick, classes }: IDocumentsCarouselProps) => {
  const { FOUser: { documents } } = userStore;
  return (
    <GridList cellHeight={100} spacing={0} className={classes.gridListContainer}>
      {documents && Object.keys(documents).map((documentKey) => {
        return (
          <DocumentsCarouselItem
            handleCarouselItemClick={handleCarouselItemClick}
            key={documentKey}
            documentKey={documentKey}
            userStore={userStore}
          />
        );
      })}
    </GridList>
  );
});

export default withStyles(styles)(DocumentsCarousel);
