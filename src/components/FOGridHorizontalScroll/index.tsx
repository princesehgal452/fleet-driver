import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  gridList: (props) => ({
    borderRadius: props.listEdgeBorderRadius,
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
  }),
}));

interface IFOGridHorizontalScrollOwnProps {
  listEdgeBorderRadius?: number;
  listItems: any[];
  renderItem: (item: any, index: number) => ReactNode;
}

type IFOGridHorizontalScrollProps = IFOGridHorizontalScrollOwnProps;

const FOGridHorizontalScroll = ({ listItems = [], renderItem, listEdgeBorderRadius = 0 }: IFOGridHorizontalScrollProps) => {
  const classes = useStyles({ listEdgeBorderRadius });
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight='auto'>
        {
          (listItems || []).map((item, index) => renderItem(item, index))
        }
      </GridList>
    </div>
  );
};

export default FOGridHorizontalScroll;