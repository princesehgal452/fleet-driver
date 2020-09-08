import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    borderTop: '1px solid #C7C4C4',
    padding: theme.spacing(2),
    height: 'calc(100% - 64px)', // sticky header height
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
  },
});

export default styles;
