import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import QRCode from 'react-qr-code';
import { Divider, Grid } from "@mui/material";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/authController/AuthContext"
import { TicketResponse } from '../graphql/graphql';
import { useState } from "react"


const BARCODE_SIZE = 256

interface DisplayTicketProps {
    ticket: TicketResponse;
    isOpen: boolean;
    toggleIsOpen: () => void;
}

export const DisplayTicket = (props: DisplayTicketProps) => {
    const { ticket, isOpen, toggleIsOpen } = props;
    const { timeAndDate, barcode, location, name } = ticket;
    const { currentUser } = useAuth()
    const [open, setOpen] = useState(true);

    let firstName = ""
    let lastName = ""

    if (currentUser) {
        firstName = currentUser["firstName"]
        lastName = currentUser["lastName"]
    }
    let time = new Date(timeAndDate || new Date());

    const hourTime = time.toLocaleTimeString("it-IT", {hour: '2-digit', minute:'2-digit'});
    const dateTime = time.toLocaleDateString("he");

    const handleClose = () => {
        setOpen(false)
    };


    return (
        <div>
            <Dialog
                open={isOpen && open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                      backgroundColor: '#CDC5E2',
                      boxShadow: 'none',
                    },
                  }}
            >
                <Grid item xs={2}>
                    <img
                        style={{ height: "10vh", width: "10=7vh", cursor: "pointer" }}
                        src={logo}
                        alt="fireSpot"
                    />
                </Grid>
                <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }} id="alert-dialog-title">
                    {"Entry Ticket - "}
                    {name}
                    <h6 style={{ textAlign: "center", marginBottom: "20px", marginTop: "15px" }}>Present in the entry with id</h6>
                    <Divider />

                </DialogTitle>
                <DialogContent style={{ marginTop: "0"}}>
                    <DialogContentText id="alert-dialog-description">
                        <h3> {firstName} {lastName} </h3>
                        <h5>{dateTime}   {hourTime} </h5>
                        <h5> {location} </h5>
                    </DialogContentText>
                    <QRCode
                        value={ticket.barcode || ""}
                        size={BARCODE_SIZE}
                    />
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: "black" }} onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );


}
