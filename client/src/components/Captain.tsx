import { Button, DialogActions, DialogContent } from "@mui/material";
import Chatbot from "./Chatbot";
import { BootstrapDialog, BootstrapDialogTitle } from "./helpers/SideDialog";


export default function Captain() {

  return (
    <BootstrapDialog
      // onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <BootstrapDialogTitle id="customized-dialog-title"
        onClose={()=>undefined}
      >
        Captain ticket
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Chatbot />
      </DialogContent>
      <DialogActions>
        <Button autoFocus
        // onClick={handleClose}
        >
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}