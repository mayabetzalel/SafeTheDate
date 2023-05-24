import { gql, useQuery } from "urql";
import FetchingState from "../utils/fetchingState";
import EventCard from "./EventCard/EventCard";
import { graphql } from "../graphql";
import { Event, Exact, FilterEventParams } from "../graphql/graphql";
import { Grid, Pagination, PaginationItem } from "@mui/material";
import { MutableRefObject, useEffect, useRef, useState } from "react";
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
    $customerId: String
  ) {
    event(filterParams: $filterParams, skip: $skip, limit: $limit, customerId: $customerId) {
      id
      name
      location
      timeAndDate
      type
      image
    }
  }
`);

const eventCountQuery = graphql(`
  query eventCountQuery($filterParams: FilterEventParams, $customerId: String ) {
    eventCount(filterParams: $filterParams, customerId: $customerId)
  }
`);

const EVENTS_PER_FETCH = 12;

interface EventsProps {
  filterParams?: FilterEventParams;
  customerId?: string;
}

const Events = ({ filterParams, customerId }: EventsProps) => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [{ data = { event: [] }, fetching, error }, reexecuteQuery] = useQuery<
    { event: Exact<Event>[] },
    { filterParams: FilterEventParams; skip: number; limit: number; customerId: string; }
  >({
    query: eventQuery,
    variables: {
      filterParams: filterParams || {},
      skip: page * EVENTS_PER_FETCH,
      limit: EVENTS_PER_FETCH,
      customerId: customerId || ""
    },
  });

  const [{ data: dataCount = { eventCount: 0 } }] = useQuery<
    { eventCount: number },
    { filterParams: FilterEventParams; customerId: string;}
  >({
    query: eventCountQuery,
    variables: {
      filterParams: filterParams || {},
      customerId: customerId || ""
    },
  });

  useEffect(() => {
    setPage(0);
  }, [filterParams]);

  return (
    <FetchingState isFetching={fetching}>
      <GridHiddenScroll container sx={{ height: "inherit", overflowY: "auto" }}>
        {data.event.map(({ id, name, type, location, timeAndDate, image }) => (
          <Grid key={id!} item sm={4} md={3}>
            <EventCard
              title={name!}
              header={type!}
              subheader={location!}
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
