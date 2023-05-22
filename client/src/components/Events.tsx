import { useQuery } from "urql";
import FetchingState from "../utils/fetchingState";
import EventCard from "./EventCard/EventCard";
import { graphql } from "../graphql";
import { Event, Exact, FilterEventParams } from "../graphql/graphql";
import { Grid, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";
import { floor } from "lodash";

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
      ticketsAmount
      type
      image
    }
  }
`);

const eventCountQuery = graphql(`
  query eventCountQuery($filterParams: FilterEventParams) {
    eventCount(filterParams: $filterParams)
  }
`);

const EVENTS_PER_FETCH = 12;

interface EventsProps {
  filterParams?: FilterEventParams;
}

const Events = ({ filterParams }: EventsProps) => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [{ data = { event: [] }, fetching, error }, reexecuteQuery] = useQuery<
    { event: Exact<Event>[] },
    { filterParams: FilterEventParams; skip: number; limit: number }
  >({
    query: eventQuery,
    variables: {
      filterParams: filterParams || {},
      skip: page * EVENTS_PER_FETCH,
      limit: EVENTS_PER_FETCH,
    },
  });

  const [{ data: dataCount = { eventCount: 0 } }] = useQuery<
    { eventCount: number },
    { filterParams: FilterEventParams }
  >({
    query: eventCountQuery,
    variables: {
      filterParams: filterParams || {},
    },
  });

  useEffect(() => {
    setPage(0);
  }, [filterParams]);

  return (
    <FetchingState isFetching={fetching}>
      <GridHiddenScroll container sx={{ height: "inherit", overflowY: "auto" }}>
        {data.event.map(({ id, name, type, location, timeAndDate, ticketsAmount, image }) => (
          <Grid key={id!} item sm={4} md={3}>
            <EventCard
              title={name!}
              header={type!}
              subheader={location!}
              ticketsAmount={ticketsAmount!}
              image={image || undefined}
              onClick={() => navigate(`${RoutePaths.EVENT}/${id}`, {})}
            />
          </Grid>
        ))}
      </GridHiddenScroll>
      <Pagination
        count={floor(dataCount.eventCount / EVENTS_PER_FETCH) + 1}
        page={page + 1}
        variant={"outlined"}
        color={"primary"}
        onChange={(e_, page) => setPage(page - 1)}
        shape="rounded"
      />
    </FetchingState>
  );
};

export default Events;
