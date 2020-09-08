import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  permissionItemText: {
    fontSize: theme.typography.pxToRem(14),
  },
  permissionItemRoot: {
    paddingLeft: 16,
  },
}));

export default useStyles;
