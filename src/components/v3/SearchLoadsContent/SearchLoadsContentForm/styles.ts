import { Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const styles = (theme: Theme) => ({
  backButton: {
    fontSize: theme.typography.pxToRem(10),
    background: green.A100,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: theme.spacing(1, 2),
    textAlign: 'center',
  },
  fullHeight: {
    height: '100%',
  },
  flexGrow: {
    flexGrow: 1,
    width: '100%',
  },
});

export default styles;
