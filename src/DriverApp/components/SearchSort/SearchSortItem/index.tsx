import React, { ReactNode } from 'react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = (theme: Theme) => ({
  label: {
    paddingLeft: theme.spacing(2),
    textTransform: 'capitalize' as 'capitalize',
  },
});

interface ISearchSortItemOwnProps {
  icon: ReactNode;
  label: ReactNode;
}

type ISearchSortItemProps = ISearchSortItemOwnProps & WithStyles<typeof styles>;

const SearchSortItem = ({ icon, label, classes }: ISearchSortItemProps) => (
  <Grid container alignItems='center'>
    {icon}
    <Grid item className={classes.label}>
      {label}
    </Grid>
  </Grid>
);

export default withStyles(styles)(SearchSortItem);
