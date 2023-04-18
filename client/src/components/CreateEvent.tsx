import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "urql";
import { InputEvent, Event } from "../graphql/graphql";
import { Card, CardContent, Typography, TextField, Button, Grid, InputAdornment } from '@mui/material';

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($inputEvent: InputEvent!) {
    createEvent(inputEvent: $inputEvent) {
      id
      name
      location
      timeAndDate
      type
    }
  }
`;

export const CreateEvent = () => {

  const eventNameRef = useRef<HTMLInputElement | null>();
  const eventLocationRef = useRef<HTMLInputElement | null>();
  const eventTimeAndDateRef = useRef<HTMLInputElement | null>();
  const eventTypeRef = useRef<HTMLInputElement | null>();

  const navigate = useNavigate();

  const [createEventResult, createEvent] = useMutation<{
    createEvent: Event;
  }>(CREATE_EVENT_MUTATION);

  function handleEventCreation() {
    const inputEvent: InputEvent = {
      name: eventNameRef.current?.value || '',
      location: eventLocationRef.current?.value || '',
      timeAndDate: eventTimeAndDateRef.current?.value || '',
      type: eventTypeRef.current?.value || ''
    };

    // Call the createEvent mutation with the inputEvent object
    createEvent({inputEvent}).then((result: any) => {
      if (result.error) {
        console.error("Error creating event:", result.error);
      } else {
        navigate("/")
        console.log("Event created:", result.data.createEvent);
      }
    });
  }

  return (
    <Card sx={{ margin: 'auto', maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Event Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name of Event"
              inputRef={eventNameRef}
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              inputRef={eventLocationRef}
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Time and Date"
              inputRef={eventTimeAndDateRef}
              variant="outlined"
              type="datetime-local"
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Type of Event"
              inputRef={eventTypeRef}
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEventCreation}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  );
};
