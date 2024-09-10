import React, { memo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

interface ReusableDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const ReusableDialog: React.FC<ReusableDialogProps> = ({
  open,
  onClose,
  title,
  content,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
      <DialogTitle sx={{ py: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ fontSize: "20px" }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </DialogTitle>

      {content}
    </Dialog>
  );
};

export default memo(ReusableDialog);
