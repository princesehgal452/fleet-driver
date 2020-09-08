import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

interface IErrorImageOwnProps {
  image: ReactNode;
  title: ReactNode;
  caption?: ReactNode;
}

type IErrorImageProps = IErrorImageOwnProps & WithStyles<typeof styles>;

const ErrorImage = observer(({ image, title, caption, classes }: IErrorImageProps) => (
  <Grid
    container
    direction='column'
    alignItems='center'
    justify='center'
    className={classes.root}
  >
    <Grid item>
      {image}
    </Grid>
    <Grid item className={classes.content}>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='h4' align='center'>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1' align='center'>
            {caption}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
));

export default withStyles(styles)(ErrorImage);
