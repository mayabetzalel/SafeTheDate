import { useRef } from "react";
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
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [createEventResult, createEvent] = useMutation<
    {
      createEvent: MutationResponse;
    },
    { inputEvent: InputEvent }
  >(CREATE_EVENT_MUTATION);

  function handleEventCreation() {
    const inputEvent: InputEvent = {
      name: eventNameRef.current?.value || "",
      location: eventLocationRef.current?.value || "",
      timeAndDate: Date.parse(eventTimeAndDateRef.current?.value || new Date().toString()),
      type: eventTypeRef.current?.value || "",
    };

    // Call the createEvent mutation with the inputEvent object
    createEvent({ inputEvent }).then((result) => {
      if (result.error) {
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
    <Stack spacing={5}>
      <Typography variant="h3" align="center" gutterBottom color={"white"}>
        Event Form
      </Typography>
      <Paper>
        <Grid container padding={10}>
          <Grid item xs={9}>
            <Stack spacing={3}>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}>
                  <Typography variant="h4">Name of Event</Typography>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    placeholder="Name of Event"
                    color={"secondary"}
                    inputRef={eventNameRef}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}>
                  <Typography variant="h4">Location</Typography>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    placeholder="Location"
                    color={"secondary"}
                    inputRef={eventLocationRef}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}>
                  <Typography variant="h4">Time and Date</Typography>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    placeholder="Time and Date"
                    color={"secondary"}
                    inputRef={eventTimeAndDateRef}
                    variant="outlined"
                    type="datetime-local"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}>
                  <Typography variant="h4">Type of Event</Typography>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    color={"secondary"}
                    placeholder="Type of Event"
                    inputRef={eventTypeRef}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            image uploader
          </Grid>
        </Grid>
      </Paper>
      <Grid container justifyContent={"space-around"}>
        <Grid item xs={1}>
          <Button fullWidth variant="outlined" color="secondary">
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
    </Stack>
  );
};
