import EventCard from "./EventCard/EventCard";
import { useQuery } from "urql";
import { graphql } from "../graphql";
import { Event, Exact } from "../graphql/graphql";
import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const GridHiddenScroll = styled(Grid)({
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const eventQuery = graphql(`
  query eventPageQuery($skip: Int!, $limit: Int!) {
    event(skip: $skip, limit: $limit) {
      id
      name
      location
      timeAndDate
      type
    }
  }
`);

const EVENTS_PER_FETCH = 10;

const Events = () => {
  const [skipNumber, setSkipNumber] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const rootRef = useRef(null);
  const [events, setEvents] = useState<Exact<Event>[]>([]);
  const [{ data, fetching, error }, reexecuteQuery] = useQuery<
    { event: Exact<Event>[] },
    { skip: number; limit: number }
  >({
    query: eventQuery,
    variables: {
      skip: skipNumber,
      limit: EVENTS_PER_FETCH,
    },
  });

  useEffect(() => {
    if (data?.event) {
      setEvents(() => [...events, ...data.event]);
    }
  }, [data]);

  useEffect(() => {
    reexecuteQuery();
  }, [skipNumber]);

  const onScroll = () => {
    if (rootRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = rootRef.current;
      if (
        maxHeight < scrollHeight &&
        scrollTop + clientHeight > scrollHeight - 10
      ) {
        setSkipNumber((prev) => prev + EVENTS_PER_FETCH);
        setMaxHeight(scrollHeight);
      }
    }
  };

  return (
    <GridHiddenScroll
      container
      spacing={3}
      ref={rootRef}
      onScroll={onScroll}
      sx={{ height: "inherit", overflowY: "auto" }}
    >
      {events.map((event) => (
        <Grid key={event.id} item sm={4} md={3}>
          <EventCard
            title={event.name!}
            header={event.type!}
            subhrader={event.location!}
          />
        </Grid>
      ))}
    </GridHiddenScroll>
  );
};

export default Events;
