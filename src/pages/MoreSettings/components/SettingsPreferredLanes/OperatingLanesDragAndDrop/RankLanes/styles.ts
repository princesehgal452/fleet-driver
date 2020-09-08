import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  icon: {
    fontSize: 16,
    marginLeft: -2,
    marginRight: 4,
    color: theme.palette.text.secondary, // '#626163',
  },
  info: {
    fontSize: 9,
    color: theme.custom.colors.stoneLight,
  },
});

export default makeStyles(styles);
