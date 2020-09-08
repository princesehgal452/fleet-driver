import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: -theme.spacing(2),
    '& .MuiSlider-mark': {
      display: 'none',
    },
    '& .MuiSlider-markLabel:last-child': {
      paddingRight: theme.spacing(5),
    },
  },
  formControlLabel: {
    width: '100%',
  },
  valueLabel: {
    width: theme.spacing(4),
    height: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1) translateY(4px) !important',
    boxShadow: '0 -4px 8px 0 rgba(140,140,140,0.2), 0 4px 8px 0 rgba(140,140,140,0.3)',
    '& > span': {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
    },
  },
  valueLabelDisabled: {
    backgroundColor: '#bdbdbd',
  },
  thumb: {
    height: theme.spacing(2.5),
    width: theme.spacing(2.5),
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 -2px 4px 0 rgba(140,140,140,0.2), 0 2px 4px 0 rgba(140,140,140,0.3)',
  },
  track: {
    height: 8,
    borderRadius: 100,
  },
  trackInverted: {
    color: '#E6E6E6',
  },
  rail: {
    height: 8,
    color: '#E6E6E6',
    opacity: 'unset',
    borderRadius: 100,
  },
  railInverted: {
    color: 'inherit',
  },
  bottomLabelTypography: {
    fontSize: theme.typography.pxToRem(12),
    color: '#AAAAAA',
  },
  formLabel: {
    color: '#282828',
    fontSize: 14,
    paddingBottom: theme.spacing(2),
  },
}));

export default useStyles;
