import React from "react";
import { createPortal } from "react-dom";
import { MODAL_ROOT_IDENTIFIER } from "../../constants/constants.ts";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IModalProps {
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ onClose, children, onConfirm, title = "Modal" }: IModalProps) => {
  return createPortal(
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      aria-labelledby="modal-dialog-title"
    >
      <DialogTitle id="modal-dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {onConfirm && (
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      )}
    </Dialog>,
    document.getElementById(MODAL_ROOT_IDENTIFIER)!,
  );
};

export default Modal;