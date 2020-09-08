import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  activeLoadsBtn: {
    justifyContent: 'left',
    borderRadius: 4,
    textTransform: 'capitalize',
    borderColor: theme.palette.grey[200],
    paddingLeft: theme.spacing(1.5),
    '& .MuiButton-endIcon': {
      position: 'absolute',
      right: theme.spacing(1),
    },
  },
}));

export default useStyles;
