import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';


interface IEditIconButtonProps {
  onClick: () => void;
  editing?: boolean;
}

const EditIconButton = memo(({ editing, onClick }: IEditIconButtonProps) => (
  <IconButton
    color={editing ? 'secondary' : 'default'}
    onClick={onClick}
    size='small'
  >
    <EditOutlined />
  </IconButton>
));

export default EditIconButton;
