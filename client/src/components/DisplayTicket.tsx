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

    let firstName = ""
    let lastName = ""

    if (currentUser) {
        firstName = currentUser["firstName"]
        lastName = currentUser["lastName"]
    }
    let time = new Date(timeAndDate || new Date());

    const hourTime = time.toLocaleTimeString("it-IT");
    const dateTime = time.toLocaleDateString("he");

    const handleClose = () => {
        console.log(ticket)
        window.location.reload()
        toggleIsOpen()
    };


    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid item xs={2}>
                    <img
                        style={{ height: "10vh", width: "10=7vh", cursor: "pointer" }}
                        src={logo}
                        alt="fireSpot"
                    />
                </Grid>
                <DialogTitle style={{ textAlign: "center" }} id="alert-dialog-title">
                    {"Entry Ticket - "}
                    {name}
                </DialogTitle>
                <h6 style={{ textAlign: "center" }}>Present in the entry with id</h6>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h3> {firstName} {lastName} </h3>
                        <h5>{dateTime}  {hourTime} </h5>
                        <h5> {location} </h5>
                    </DialogContentText>
                    <QRCode
                        value={ticket.barcode || ""}
                        size={BARCODE_SIZE}
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
