import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  info: {
    fontSize: 12,
    color: theme.custom.colors.night,
    maxWidth: 100,
    textAlign: 'center',
  },
});

export default makeStyles(styles);
