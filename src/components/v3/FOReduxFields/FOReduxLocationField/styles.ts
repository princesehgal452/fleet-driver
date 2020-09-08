import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    height: 22,
    width: 0,
    marginLeft: 8,
    marginRight: 8,
    borderRight: 0,
  },
  paperNoRightMargin: {
    marginRight: 0,
  },
  startAdornment: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  endAdornment: {
    width: 150,
  },
  helperText: {
    padding: '0 15px',
  },
  locationIcon: {
    marginRight: 8,
  },
}));

export default useStyles;
