import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: 45,
    height: 32,
  },
  switchBase: {
    padding: 0,
    top: 10,
    left: 11,
    '&$checked': {
      transform: 'translateX(12px)',
    },
  },
  formControlLabel: {
    marginLeft: 0,
    color: '#626163',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
  thumb: {
    width: 12,
    height: 12,
  },
  track: {
  },
  checked: {},
}));

export default useStyles;
