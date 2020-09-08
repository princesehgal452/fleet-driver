import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Card, Grid, Typography } from '@material-ui/core';
import BrfCertified from '../../assets/images/png/BrfCertified.png';
import FreightTabCertified from '../../assets/images/png/FreightTabCertified.png';
import FOGrid from '../FOGrid';


const useStyles = makeStyles((theme: Theme) => ({
  brfCertifiedImage: props => ({
    height: 16,
    verticalAlign: 'middle',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: props.isGeotab ? 13 : 8,
  }),
  brfCertifiedImageTopPadding: {
    marginTop: '8px !important',
  },
  cardRoot: props => ({
    borderLeft: props.isGeotab ? '3px solid #2D2A85' : '3px solid #3a103b',
    borderRight: props.isGeotab ? '3px solid #2D2A85' : '3px solid #651e66',
    backgroundPosition: '0 100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 3px',
    backgroundImage: props.isGeotab ? 'linear-gradient(to right, #2D2A85 0%, #2753a5 100%)' : 'linear-gradient(to right, #3a103b 0%, #651e66 100%)',
    paddingBottom: 3,
  }),
  cardHeader: props => ({
    backgroundImage: props.isGeotab ? 'linear-gradient(to right, #2D2A85 0%, #2753a5 100%)' : 'linear-gradient(to right, #3a103b 0%, #651e66 100%)',
  }),
  preText: {
    color: theme.palette.common.white,
  },
}));

interface ICertifiedLoadProps {
  certfied?: boolean;
  isGeotab?: boolean;
  preText?: string;
  logo?: string;
  children: ReactNode;
}

const CertifiedLoad = observer(({ certfied, preText, logo, children, isGeotab }: ICertifiedLoadProps) => {
  const classes = useStyles({ isGeotab });
  return (
    <Card classes={{ root: certfied ? classes.cardRoot : undefined }}>
      {certfied && (
        <Grid item xs={12} className={classes.cardHeader}>
          <FOGrid vSpacing={0} hSpacing={2} spacing={2}>
            {preText && (
              <Grid item>
                <Typography className={classes.preText}>
                  {preText}
                </Typography>
              </Grid>
            )}
            <img
              src={isGeotab ? FreightTabCertified : (logo || BrfCertified)}
              alt='Certifed Load'
              className={classNames(classes.brfCertifiedImage, {
                [classes.brfCertifiedImageTopPadding]: preText,
              })}
            />
          </FOGrid>
        </Grid>
      )}
      {children && (
        <>
          {children}
        </>
      )}
    </Card>
  );
});

export default CertifiedLoad;
