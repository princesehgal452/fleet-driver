import { makeStyles } from '@material-ui/core/styles';
import { ITheme } from 'theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  button: {
    height: 57,
    width: 67,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: theme.typography.pxToRem(14),
    borderRadius: theme.custom.borderRadius.radius12,
  },
}));

export default useStyles;
