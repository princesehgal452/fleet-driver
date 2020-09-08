import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    background: theme.palette.background.paper,
    overflow: 'hidden',
  },
  title: {
    marginRight: theme.spacing(3),
  },
});

export default styles;
