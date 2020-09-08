
import { makeStyles } from '@material-ui/core/styles';
import { ITheme } from 'theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  chip: {
    fontSize: theme.typography.pxToRem(14),
    borderRadius: theme.custom.borderRadius.radius8,
    borderColor: theme.palette.primary.main,
    height: 40,
    '& .MuiChip-label': {
      padding: theme.spacing(0, 1),
      fontWeight: 500,
    },
  },
  delayedChip: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));
export default useStyles;
