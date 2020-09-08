import React, { useCallback, useState } from 'react';
import { Grid, Typography, Box, ButtonGroup, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  actionBtnGroup: {
    position: 'absolute',
    bottom: 0,
  },
  actionButtons: {
    borderRadius: 0,
  },
  closeAction: {
    background: 'transparent',
  },

  customButton: {
    textTransform: 'none',
    height: 52,
    color: 'rgba(40, 40, 40, 0.88)',
    padding: theme.spacing(1)
  },
  customButtonActive: {
    color: '#000',
    borderColor: theme.palette.primary.main,
  }
}));

interface IContactEmailPromptOwnProps {
  contactDetails?: any;
  cancelDelete: (showPrompt: boolean) => () => void;
}

type IContactEmailPromptProps = IContactEmailPromptOwnProps;

const buttonItems = [
  { key: 1, text: 'Accept rate & ask for details', icon: <InsertDriveFileOutlinedIcon fontSize='inherit' color='inherit' /> },
  { key: 2, text: 'Send offer & ask for detail', icon: <SendOutlinedIcon fontSize='inherit' color='inherit' /> },
  { key: 3, text: 'Request rate & ask for detail', icon: <CommentOutlinedIcon fontSize='inherit' color='inherit' /> },
  { key: 4, text: 'Write my own', icon: <DescriptionOutlinedIcon fontSize='inherit' color='inherit' /> },
];

const ContactEmailPrompt = ({
  contactDetails,
  cancelDelete,
}: IContactEmailPromptProps) => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(null)

  const handleButtonToggle = useCallback((key) => () => {
    setSelectedValue(key)
  }, []);

  const ButtonItem = (item) => (
    <Button variant='outlined' onClick={handleButtonToggle(item.key)} fullWidth size='large'
    className={clsx(classes.customButton, { [classes.customButtonActive]: (item.key === selectedValue) })}>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item xs={3}>
          <Box textAlign='left' mt='6px' fontSize={26}>
            {item.icon}
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box fontSize={12} whiteSpace='normal' textAlign='left' color='inherit' lineHeight='16px'>
            {item.text}
          </Box>
        </Grid>
        <Grid item xs={2}>
        {
          item.key === selectedValue && (
            <Box textAlign='right' fontSize={16} marginTop='-15px'>
              <CheckCircleIcon color='primary' fontSize='inherit' />
            </Box>
          )
        }
        </Grid>
      </Grid>
    </Button>
  );

  return (
    <>
      <Box p={2}>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <Typography variant='h6' gutterBottom>
              Email Options
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction='row' spacing={1} alignItems='stretch'>
              {buttonItems.map((item) => {
                return (
                  <Grid item xs={6}>
                    {ButtonItem(item)}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ButtonGroup
        variant='contained'
        className={classes.actionBtnGroup}
        fullWidth
        size='large'
      >
        <Button
          className={classNames(classes.actionButtons, classes.closeAction)}
          color='inherit'
          onClick={cancelDelete(false)}
        >
          CANCEL
        </Button>
        <Button className={classes.actionButtons} color='primary'>
          NEXT
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ContactEmailPrompt;
