import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { useSnackbar } from "notistack";
import { graphql } from "../graphql";
import { InputEvent, MutationResponse } from "../graphql/graphql";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  Paper,
  InputAdornment,
} from "@mui/material";
import ImagePicker from "./ImagePicker";

const CREATE_EVENT_MUTATION = graphql(`
  mutation CreateEvent($inputEvent: InputEvent!) {
    createEvent(inputEvent: $inputEvent) {
      message
      code
    }
  }
`);

export const CreateEvent = () => {
  const eventNameRef = useRef<HTMLInputElement | null>();
  const eventLocationRef = useRef<HTMLInputElement | null>();
  const eventTimeAndDateRef = useRef<HTMLInputElement | null>();
  const eventTypeRef = useRef<HTMLInputElement | null>();
  const eventTicketAmoutRef = useRef<HTMLInputElement | null>();
  const eventDescriptionRef = useRef<HTMLInputElement | null>();
  const eventTicketPriceRef = useRef<HTMLInputElement | null>();
  const [image, setImage] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [createEventResult, createEvent] = useMutation<{
    createEvent: MutationResponse;
  }>(CREATE_EVENT_MUTATION);

  const onChangeImage = (image) => {
    setImage(image);
  };

  const handleDiscard = () => {
    if (eventDescriptionRef.current) eventDescriptionRef.current.value = '';
    if (eventLocationRef.current) eventLocationRef.current.value = '';
    if (eventNameRef.current) eventNameRef.current.value = '';
    if (eventTicketAmoutRef.current) eventTicketAmoutRef.current.value = '';
    if (eventTicketPriceRef.current) eventTicketPriceRef.current.value = '';
    if (eventTimeAndDateRef.current) eventTimeAndDateRef.current.value = '';
    if (eventTypeRef.current) eventTypeRef.current.value = '';
  };

  function handleEventCreation() {
    const inputEvent: InputEvent = {
      name: eventNameRef.current?.value || "",
      location: eventLocationRef.current?.value || "",
      timeAndDate: Date.parse(
        eventTimeAndDateRef.current?.value || new Date().toString()
      ),
      type: eventTypeRef.current?.value || "",
      ticketsAmount: eventTicketAmoutRef.current?.value
        ? parseInt(eventTicketAmoutRef.current?.value)
        : 1,
      description: eventDescriptionRef.current?.value
        ? eventDescriptionRef.current?.value
        : "",
      ticketPrice: eventTicketPriceRef.current?.value ? parseInt(eventTicketPriceRef.current?.value) : 1,
      image: image || "",
    };

    // Call the createEvent mutation with the inputEvent object
    createEvent({ inputEvent }).then((result) => {
      if (result.data?.createEvent.code == 500) {
        console.error("Error creating event:", result.error);
        enqueueSnackbar("An error occurred", { variant: "error" });
      } else {
        navigate("/");
        enqueueSnackbar("Event created successfully", { variant: "success" });
        console.log("Event created:", result.data?.createEvent);
      }
    });
  }

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom color={"white"}>
        Create The Next Event
      </Typography>
      <Grid container padding={10}>
        <Grid item xs={3}>
          <ImagePicker image={image} onChangeImage={onChangeImage} buttonTitle={"Pick an image"} />
        </Grid>
        <Grid item container xs={9} spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name of Event"
              color={"secondary"}
              variant="outlined"
              inputRef={eventNameRef}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Location"
              color={"secondary"}
              inputRef={eventLocationRef}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Time and Date"
              color={"secondary"}
              inputRef={eventTimeAndDateRef}
              variant="outlined"
              type="datetime-local"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              color={"secondary"}
              label="Type of Event"
              inputRef={eventTypeRef}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              color={"secondary"}
              label="Tickets amount"
              inputRef={eventTicketAmoutRef}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              color={"secondary"}
              label="Tickets Price"
              inputRef={eventTicketPriceRef}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              color={"secondary"}
              label="Description"
              inputRef={eventDescriptionRef}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-around"}>
        <Grid item xs={1}>
          <Button fullWidth variant="outlined" color="secondary" onClick={handleDiscard}>
            Discard
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleEventCreation}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
