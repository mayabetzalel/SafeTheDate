import {
  Avatar,
  CardMedia,
  Grid,
  Typography,
  Card,
  Stack,
  Divider,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import EventIcon from "@mui/icons-material/Event";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "urql";
import { graphql } from "../../graphql";
import FetchingState from "../../utils/fetchingState";
import { useEffect, useState } from "react";
import { Exact, Event as EventType } from "../../graphql/graphql";
import PaymentForm from "../checkout/PaymentForm";
import { useAuth } from "../../hooks/authController/AuthContext";
import { Login, Logout } from "@mui/icons-material";
import * as React from "react";
import { RoutePaths } from "../../App";
import { Center } from "../../utils/center";

const EVENT_QUERY = graphql(`
  query event($ids: [String]) {
    event(ids: $ids) {
      id
      name
      location
      ticketsAmount
      ticketPrice
      timeAndDate
      description
      image
    }
  }
`);

const EVENT_QUERY_IMAGE = graphql(`
  query eventImage($ids: [String]) {
    event(ids: $ids) {
      id
      image
    }
  }
`);

export const Event = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const publisherName = "publisher name";
  const [event, setEvent] = useState<Exact<EventType>>();
  const { id = "" } = useParams();
  const [{ data, fetching }] = useQuery<{
    event: Exact<EventType>[];
  }>({
    query: EVENT_QUERY,
    variables: { ids: [id] },
  });

  const [dataImage] = useQuery<{
    event: Exact<EventType>[];
  }>({
    query: EVENT_QUERY_IMAGE,
    variables: { ids: [id] },
  });

  useEffect(() => {
    if (data?.event.length == 1) {
      setEvent(data.event.at(0));
    }
  }, [data]);

  return (
    <FetchingState isFetching={fetching}>
      <Grid
        container
        columnSpacing={3}
        sx={(theme) => ({ color: theme.palette.primary.main, height: "100%" })}
      >
        <Grid item xs>
          <Card sx={{ borderRadius: "40px", height: "100%" }}>
            <CardMedia
              sx={{ height: "100%" }}
              image={
                dataImage.data?.event.at(0)?.image ||
                "https://thumbs.dreamstime.com/b/nightclub-party-lightshow-18331890.jpg"
              }
            />
          </Card>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent={"space-between"}
          xs
        >
          <Stack spacing={2}>
            <Typography variant={"h3"}>{event?.name}</Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Tooltip title="scan event tickets">
                  <IconButton onClick={() => navigate(`${RoutePaths.SCAN_EVENT}/${id}`, {})}> <QrCodeScannerIcon fontSize="large" /></IconButton>
                </Tooltip>
                <Avatar
                  sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}
                >
                  {publisherName.charAt(0)}
                </Avatar>
                <Typography variant="h6">{publisherName}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon />
                <Typography variant="h6">{event?.location}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6">
                  {event?.ticketsAmount
                    ? event?.ticketsAmount + " tickets avilable" + (event?.ticketPrice || 0) + 'NIS'
                    : "No avilable tickets"}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <EventIcon />
                <Typography variant="h6">
                  {event?.timeAndDate &&
                    new Date(event?.timeAndDate).toDateString()}
                </Typography>
              </Stack>
            <Divider color={"grey"} variant="middle" />
            <Typography>
              {event?.description}
            </Typography>

            {currentUser ? (
              <div>
                {event?.ticketsAmount ? <PaymentForm amount={20} description={event?.name ?? "Event"} /> : <></>}
              </div>
            ) : (
              <Button
                variant={"text"}
                color={"secondary"}
                fullWidth
                onClick={() => navigate(RoutePaths.LOGIN)}
                endIcon={<Login />}
              >
                Sign In For Purchase
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </FetchingState>
  );
};
