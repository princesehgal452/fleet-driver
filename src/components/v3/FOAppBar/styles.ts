import { makeStyles } from '@material-ui/core';
import { ITheme } from 'theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: props => ({
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: props.secondaryActionButtons ? theme.spacing(1) : theme.spacing(2),
    background: '#fff',
    borderBottom: props.noBorder ? 'inherit' : `1px dashed ${theme.palette.borderColor}`,
    zIndex: 100,
  }),
  toolbarRoot: {
    alignItems: 'flex-start',
    minHeight: 'auto',
  },
  title: {},
  backButton: {
    verticalAlign: 'text-top',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 26,
  },
  notificationDot: {
    position: 'absolute',
    right: 2,
    top: 4,
    height: 12,
    width: 12,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    border: '2px solid #fff',
  },
  secondaryActionContainer: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
