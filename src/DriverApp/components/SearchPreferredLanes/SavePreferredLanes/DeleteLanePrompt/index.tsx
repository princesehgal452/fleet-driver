import React, { useCallback } from 'react';
import { Grid, Typography, Box, Fab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme: Theme) => ({
  
}));

interface IDeleteLanePromptOwnProps {
  confirmDelete: () => void;
  cancelDelete: (showPrompt: boolean) => void;
}

type IDeleteLanePromptProps = IDeleteLanePromptOwnProps;

const DeleteLanePrompt = ({
  confirmDelete,
  cancelDelete,
}: IDeleteLanePromptProps) => {
  const classes = useStyles();

  const handleCancelDelete = useCallback(() => {
    cancelDelete(false);
  }, [cancelDelete]);

  return (
    <Box p={2}>
      <Grid container justify='flex-end'>
        <CloseOutlinedIcon onClick={handleCancelDelete} />
      </Grid>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        spacing={1}
      >
        <Grid item>
          <Typography variant='subtitle1' gutterBottom>
            Are you sure you want to delete this lane?
          </Typography>
        </Grid>
        <Grid item>
          <Fab color='primary' aria-label='add' onClick={confirmDelete}>
            <DeleteOutlineOutlinedIcon />
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeleteLanePrompt;
