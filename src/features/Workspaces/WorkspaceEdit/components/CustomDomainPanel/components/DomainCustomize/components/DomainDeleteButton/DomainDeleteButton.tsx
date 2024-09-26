import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const DomainDeleteButton = ({ setOpenDeleteDialog }) => {
  return (
    <IconButton
      style={{ height: '40px' }}
      onClick={() => setOpenDeleteDialog(true)}
      component="button"
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DomainDeleteButton;
