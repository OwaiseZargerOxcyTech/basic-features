import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Row } from './types';

interface ActionsMenuProps {
  row: Row;
  onUpdateStatus: (id: number, newStatus: Row['status']) => void;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ row, onUpdateStatus }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus: Row['status']) => {
    onUpdateStatus(row.idInvoice, newStatus);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleStatusChange('Pending')}>Pending</MenuItem>
        <MenuItem onClick={() => handleStatusChange('Complete')}>Complete</MenuItem>
        <MenuItem onClick={() => handleStatusChange('Cancel')}>Cancel</MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;