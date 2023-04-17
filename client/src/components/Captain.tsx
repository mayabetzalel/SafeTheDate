import { Button, DialogActions, DialogContent } from "@mui/material";
import { Chatbot } from "./Chatbot";
import { BootstrapDialog, BootstrapDialogTitle } from "./helpers/SideDialog";
import { useNavigate } from "react-router";

export default function Captain() {
  const navigate = useNavigate();
  
  function handleClose() {
    navigate("/");
  }

  function handleComplete(message: string): void {
    console.log(message);
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <BootstrapDialogTitle id="customized-dialog-title"
        onClose={handleClose}
      >
        Captain ticket
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Chatbot handleMessageComplete={handleComplete}/>
      </DialogContent>
      <DialogActions>
        <Button autoFocus
        onClick={handleClose}
        >
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}