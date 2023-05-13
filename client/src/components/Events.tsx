import { useAuth } from "../hooks/authController/AuthContext";
import { gql, useQuery } from "urql";
import FetchingState from "../utils/fetchingState";
import EventCard from "./EventCard/EventCard";
import { graphql } from "../graphql";
import { Event, Exact, FilterEventParams } from "../graphql/graphql";
import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";

const GridHiddenScroll = styled(Grid)({
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const eventQuery = graphql(`
  query eventPageQuery(
    $filterParams: FilterEventParams
    $skip: Int!
    $limit: Int!
  ) {
    event(filterParams: $filterParams, skip: $skip, limit: $limit) {
      id
      name
      location
      timeAndDate
      type
    }
  }
`);

const EVENTS_PER_FETCH = 10;

interface EventsProps {
  filterParams?: FilterEventParams;
}

const Events = (props: EventsProps) => {
  const [skipNumber, setSkipNumber] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const [events, setEvents] = useState<Exact<Event>[]>([]);
  const [{ data, fetching, error }, reexecuteQuery] = useQuery<
    { event: Exact<Event>[] },
    { filterParams: FilterEventParams; skip: number; limit: number }
  >({
    query: eventQuery,
    variables: {
      filterParams: props?.filterParams || {},
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
      {events.map(({ id, name, type, location }) => (
        <Grid key={id!} item sm={4} md={3}>
          <EventCard
            title={name!}
            header={type!}
            subhrader={location!}
            onClick={() => navigate(`${RoutePaths.EVENT}/${id}`, {})}
          />
        </Grid>
      ))}
    </GridHiddenScroll>
  );
};

export default Events;
