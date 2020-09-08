import { makeStyles } from '@material-ui/core/styles';
import { ITheme } from 'theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    padding: 0,
    margin: '0 !important',
    borderRadius: 'inherit',
    '&:before': {
      opacity: '0 !important',
    },
  },
  accordianDescription: {
    padding: theme.spacing(1),
  },
  gridContainer: {
    padding: theme.spacing(1),
  },
  dropdown: {
    position: 'absolute',
    top: -4,
    left: theme.spacing(8),
    color: theme.palette.grey[500],
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.short,
    }),
  },
  dropdownOpen: {
    transform: 'rotate(-180deg)',
  },
  dropdownClosed: {
    transform: 'rotate(0)',
  },
}));

export default useStyles;
