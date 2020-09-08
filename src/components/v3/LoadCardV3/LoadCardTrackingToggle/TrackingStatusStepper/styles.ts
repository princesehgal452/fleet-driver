import { makeStyles } from '@material-ui/core/styles';
import { ITheme } from 'theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  chip: {
    fontSize: theme.typography.pxToRem(14),
    borderRadius: theme.custom.borderRadius.radius8,
    borderColor: theme.palette.primary.main,
  },
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
  },
  circleIconRoot: {
    color: theme.palette.grey[500],
    display: 'flex',
    height: 22,
  },
  circleIcon: {
    marginTop: '5px',
    fontSize: theme.typography.pxToRem(12),
  },
  circleIconActive: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(20),
    zIndex: 1,
  },
  circleIconCompleted: {
    color: theme.palette.primary.main,
    borderRadius: theme.custom.borderRadius.radiusCircle,
    background: theme.palette.primary.light,
    boxShadow: '0px 0px 2px 4px rgba(49,185,88,0.25)',
    MozBoxShadow: '0px 0px 2px 4px rgba(49,185,88,0.25)',
    WebkitBoxShadow: '0px 0px 2px 4px rgba(49,185,88,0.25)',
    zIndex: 1,
  },
  stepRoot: {
    '& .MuiStepLabel-label': {
      marginTop: theme.spacing(1),
      fontSize: theme.typography.pxToRem(8),
      textTransform: 'uppercase',
      color: theme.palette.grey[500],
      '&.MuiStepLabel-active': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiStepConnector-alternativeLabel': {
      top: '10px',
      left: 'calc(-50% + 5px)',
      right: 'calc(50% + 5px)',
    },
    '& .MuiStepConnector-lineHorizontal': {
      borderWidth: '2px',
    },
    '& .MuiStepConnector-completed': {
      '& .MuiStepConnector-lineHorizontal': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiStepConnector-active': {
      '& .MuiStepConnector-lineHorizontal': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));
export default useStyles;
