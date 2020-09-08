import React, { ReactNode } from 'react';
import { Button } from '@material-ui/core';
import useStyles from './styles';

interface ISecondaryActionButtonOwnProps {
  text: string | ReactNode;
  startIcon?: string | ReactNode | null;
  endIcon?: string | ReactNode | null;
  onClick: () => void;
}

type ISecondaryActionButtonProps = ISecondaryActionButtonOwnProps;

const SecondaryActionButton = ({ text, startIcon, endIcon, onClick }: ISecondaryActionButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      variant='outlined'
      size='large'
      className={classes.activeLoadsBtn}
      fullWidth
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SecondaryActionButton;
