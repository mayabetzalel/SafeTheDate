import { useQuery } from "urql";
import EventCard from "./EventCard/EventCard";
import { graphql } from "../graphql";
import { Event, Exact, FilterEventParams } from "../graphql/graphql";
import { Grid, Pagination } from "@mui/material";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";
import FetchingState from "../utils/fetchingState";

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

const EVENTS_PER_FETCH = 12;

interface EventsProps {
  filterParams?: FilterEventParams;
}

const Events = ({ filterParams = {} }: EventsProps) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [events, setEvents] = useState<Exact<Event>[]>([]);
  const [{ data, fetching, error }, reexecuteQuery] = useQuery<
    { event: Exact<Event>[] },
    { filterParams: FilterEventParams; skip: number; limit: number }
  >({
    query: eventQuery,
    variables: {
      filterParams: filterParams,
      skip: (page - 1) * EVENTS_PER_FETCH,
      limit: EVENTS_PER_FETCH,
    },
  });

  useEffect(() => {
    setEvents([]);
    setPage(0);
  }, [filterParams]);

  useEffect(() => {
    if (data?.event) {
      setEvents([...data.event]);
    }
  }, [data]);

  return (
    <FetchingState isFetching={fetching}>
      <GridHiddenScroll container sx={{ height: "inherit", overflowY: "auto" }}>
        {events.map(({ id, name, type, location, timeAndDate }) => (
          <Grid key={id!} item sm={4} md={3}>
            <EventCard
              title={name!}
              header={type!}
              subheader={location!}
              onClick={() => navigate(`${RoutePaths.EVENT}/${id}`, {})}
            />
          </Grid>
        ))}
      </GridHiddenScroll>
      <Pagination
        count={10}
        page={page}
        variant={"outlined"}
        color={"primary"}
        onChange={(e_, page) => setPage(page)}
        shape="rounded"
      />
    </FetchingState>
  );
};

export default Events;
