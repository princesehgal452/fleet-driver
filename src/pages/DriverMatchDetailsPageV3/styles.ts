import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    overflowY: 'auto',
    display: 'block',
    position: 'relative',
    height: '100%',
  },
  link: {
    color: theme.palette.secondary.main,
  },
});

export default styles;
