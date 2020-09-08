import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  actionButton: {
    verticalAlign: 'text-top',
  },
});

export default styles;
