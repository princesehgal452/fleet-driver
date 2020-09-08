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
  accordianActions: {
    padding: 0,
  },
  accordianDescription: {
    padding: theme.spacing(1),
  },
  gridContainer: {
    padding: theme.spacing(1),
  },
  actionButton: {
    borderRadius: 0,
    borderColor: 'transparent !important',
    textTransform: 'capitalize',
    fontSize: theme.typography.pxToRem(10),
  },
  viewTrackingBtn: {
    fontSize: theme.typography.pxToRem(10),
  },
}));

export default useStyles;
