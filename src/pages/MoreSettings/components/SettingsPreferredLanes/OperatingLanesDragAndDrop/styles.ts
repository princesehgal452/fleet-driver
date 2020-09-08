import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  arrowIcon: {
    fontSize: 16,
    color: theme.custom.colors.tree,
  },
  iconButton: {
    height: '12px',
    width: 'auto',
    color: theme.custom.colors.night,
    padding: '0 1px',
  },
  infoWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 10,
  },
});

export default makeStyles(styles);
