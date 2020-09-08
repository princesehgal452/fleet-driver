import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  fullHeight: {
    height: '100%',
  },
  displayFlex: {
    display: 'flex',
  },
  flexStretch: {
    flex: 1,
  },
  noResultsOrError: {
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
  fullWidth: {
    width: '100%',
  },
  gridList: {
    borderRadius: 4,
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
  },
}));

export default useStyles;
