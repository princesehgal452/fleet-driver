import { yellow } from '@material-ui/core/colors';
import { ITheme } from 'theme/ITheme';

const styles = (theme: ITheme) => ({
  root: {
    height: '100%',
    background: theme.palette.background.paper,
  },
  countBadge: {
    background: yellow[600],
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    left: 0,
  },
  horizontalListContainer: {
    padding: theme.spacing(0, 2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderTop: `1px dashed ${theme.palette.borderColor}`,
  },
});

export default styles;
