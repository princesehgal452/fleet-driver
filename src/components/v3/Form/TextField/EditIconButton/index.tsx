import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import { EditOutlined, DoneOutlined } from '@material-ui/icons';


interface IEditIconButtonProps {
  onClick: () => void;
  editing?: boolean;
}

const EditIconButton = memo(({ editing, onClick }: IEditIconButtonProps) => (
  <IconButton
    color={editing ? 'primary' : 'default'}
    onClick={onClick}
    size='small'
  >
    {editing ? <DoneOutlined /> : <EditOutlined />}
  </IconButton>
));

export default EditIconButton;
