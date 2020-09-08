import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  bodyContent: {
    marginBottom: theme.spacing(8),
  },
  trackingImg: {
    position: 'relative',
    top: '-2px',
  },
});
export default styles;
