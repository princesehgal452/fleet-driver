import { ITheme } from 'theme/ITheme';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: ITheme) => ({
  phoneNumber: {
    background: theme.palette.primary.light,
    fontSize: 8,
    color: theme.palette.primary.main,
    display: 'inline',
    padding: theme.spacing(0.4),
  },
}));
export default useStyles;
