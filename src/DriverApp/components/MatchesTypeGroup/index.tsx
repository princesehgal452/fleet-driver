import React, { memo } from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = (theme: Theme) => ({
  root: {
    paddingLeft: 10,
    paddingRight: 10,
    '&:first-child': {
      paddingTop: 5,
    },
  },
  typeText: {
    color: theme.palette.primary.main,
  },
});

interface IMatchesTypeGroupOwnProps {
  type: string;
}

type IMatchesTypeGroupProps = IMatchesTypeGroupOwnProps & WithStyles<typeof styles>;

const MatchesTypeGroup = memo(({ type, classes }: IMatchesTypeGroupProps) => (
  <Grid container justify='space-between' spacing={1} className={classes.root}>
    <Grid item xs={12}>
      <Typography variant='subtitle2' align='left' className={classes.typeText}>
        {type}
      </Typography>
    </Grid>
  </Grid>
));

export default withStyles(styles)(MatchesTypeGroup);
