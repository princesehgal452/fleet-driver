import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    height: '100%',
    overflow: 'hidden',
  },
  bodyContent: {
    background: theme.palette.background.paper,
    height: 'calc(100% - 64px)', // sticky header height
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
  },
  title: {
    marginLeft: 26,
  },
});

export default styles;
