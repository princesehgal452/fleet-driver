import { yellow } from '@material-ui/core/colors';
import { ITheme } from 'theme/ITheme';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: ITheme) => ({
  countBadge: {
    background: yellow[600],
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    left: 0,
  },
}));
export default useStyles;
