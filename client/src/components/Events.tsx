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
import { useAuth } from "../hooks/authController/AuthContext";

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
    $userId: String
  ) {
    event(filterParams: $filterParams, skip: $skip, limit: $limit, userId: $userId) {
      id
      name
      location
      timeAndDate
      ticketsAmount
      ticketPrice
      type
      image
    }
  }
`);

const eventCountQuery = graphql(`
  query eventCountQuery($filterParams: FilterEventParams, $userId: String ) {
    eventCount(filterParams: $filterParams, userId: $userId)
  }
`);

const EVENTS_PER_FETCH = 12;

interface EventsProps {
  filterParams?: FilterEventParams;
  userId?: string;
}

const Events = ({ filterParams, userId }: EventsProps) => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [{ data = { event: [] }, fetching, error }, reexecuteQuery] = useQuery<
    { event: Exact<Event>[] },
    { filterParams: FilterEventParams; skip: number; limit: number; userId: string; }
  >({
    query: eventQuery,
    variables: {
      filterParams: filterParams || {},
      skip: page * EVENTS_PER_FETCH,
      limit: EVENTS_PER_FETCH,
      userId: userId || ""
    },
  });

  const [{ data: dataCount = { eventCount: 0 } }] = useQuery<
    { eventCount: number },
    { filterParams: FilterEventParams; userId: string; }
  >({
    query: eventCountQuery,
    variables: {
      filterParams: filterParams || {},
      userId: userId || ""
    },
  });

  useEffect(() => {
    setPage(0);
  }, [filterParams]);

  return (
    <FetchingState isFetching={fetching}>
      <GridHiddenScroll container sx={{ height: "inherit", overflowY: "auto" }}>
        {data.event.map(({ id, name, type, location, timeAndDate, ticketsAmount, ticketPrice, image }) => (
          <Grid key={id!} item sm={4} md={3}>
            <EventCard
              title={name!}
              header={type!}
              subheader={location!}
              ticketsAmount={ticketsAmount!}
              ticketPrice={ticketPrice!}
              image={image || undefined}
              onClick={() => navigate(`${RoutePaths.EVENT}/${id}`, {})}
              id={id || ""}
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
