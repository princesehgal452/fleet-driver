import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    padding: '0 45px',
    '& svg': {
      width: '100%',
      height: 'auto',
    },
  },
  content: {
    marginTop: theme.spacing(10),
  },
});

interface IFOErrorImageOwnProps {
  image: ReactNode;
  title: ReactNode;
  caption?: ReactNode;
}

type IFOErrorImageProps = IFOErrorImageOwnProps & WithStyles<typeof styles>;

const FOErrorImage = observer(({ image, title, caption, classes }: IFOErrorImageProps) => (
  <Grid container direction='column' alignItems='center' justify='center' className={classes.root}>
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

export default withStyles(styles)(FOErrorImage);
