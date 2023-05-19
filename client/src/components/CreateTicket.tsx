import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom"
import QRCode from 'react-qr-code';

export const CreateTicketComp = ( {ticket} ) => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate()
    
    const handleClose = () => {
      console.log(ticket)
      setOpen(false);
      navigate("/")
    };
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Event "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              User user
            </DialogContentText>
            <QRCode  
                value=""
                size={256}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


export default CreateTicketComp