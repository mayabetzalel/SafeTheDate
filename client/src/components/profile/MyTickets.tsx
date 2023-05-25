import { gql, useQuery } from "urql";
import FetchingState from "../../utils/fetchingState";
import EventCard from "../EventCard/EventCard";
import { graphql } from "../../graphql";
import { Event, Exact, FilterEventParams, InputTicket, TicketResponse } from "../../graphql/graphql";
import { Grid, Pagination, PaginationItem } from "@mui/material";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../App";
import { floor } from "lodash";
import { MyTicket } from "./MyTicket";
import { useAuth } from "../../hooks/authController/AuthContext";
import CreateTicket from "../DisplayTicketUsingEvent";

const GridHiddenScroll = styled(Grid)({
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const ticketQuery = graphql(`
  query ticketPageQuery(
    $filterParams: FilterEventParams
    $skip: Int!
    $limit: Int!
    $customerId: String
  ) {
    ticket(filterParams: $filterParams, skip: $skip, limit: $limit, customerId: $customerId) {
      ticketId
      name
      location
      timeAndDate
      type
      image
      onMarketTime
      barcode
    }
  }
`);

const ticketCountQuery = graphql(`
  query TicketCountQuery($filterParams: FilterEventParams, $customerId: String) {
    ticketCount(filterParams: $filterParams, customerId: $customerId)
  }
`);

const EVENTS_PER_FETCH = 12;

interface TicketsProps {
  filterParams?: FilterEventParams;
  customerId?: string;
}

const MyTickets = ({ filterParams, customerId }: TicketsProps) => {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [{ data = { ticket: [] }, fetching, error }] = useQuery<
    { ticket: Exact<TicketResponse>[] },
    { filterParams: FilterEventParams; skip: number; limit: number; customerId: string; }
  >({
    query: ticketQuery,
    variables: {
      filterParams: filterParams || {},
      skip: page * EVENTS_PER_FETCH,
      limit: EVENTS_PER_FETCH,
      customerId: currentUser?.['_id'] || ""
    },
  });

  const [{ data: dataCount = { ticketCount: 0 } }] = useQuery<
    { ticketCount: number },
    { filterParams: FilterEventParams; customerId: string }
  >({
    query: ticketCountQuery,
    variables: {
      filterParams: filterParams || {},
      customerId: currentUser?.['_id'] || ""
    },
  });

  function localUpdateMarketTime(ticketId: string) {
    setTickets(prev => {
      const ticketIndex = prev.findIndex(ticket => ticket.ticketId === ticketId);

      let updatedTickets = [...prev];

      updatedTickets[ticketIndex].onMarketTime = prev[ticketIndex].onMarketTime ? 0 : new Date().getTime(); 
      return updatedTickets;
    })
  }

  useEffect(() => {
    setPage(0);
  }, [filterParams]);

  useEffect(() => {
    setTickets(data.ticket)
  }, [data.ticket])

  return (
    <FetchingState isFetching={fetching}>

      <GridHiddenScroll container sx={{ height: "inherit", overflowY: "auto" }}>
        {tickets.map((ticket) => {
          const { ticketId, onMarketTime } = ticket;
          return <Grid key={ticketId!} item sm={4} md={3}>
            <MyTicket
              ticket={ticket}
              localUpdateMarketTime={localUpdateMarketTime}
              isOnMarket={!!onMarketTime}
            />
          </Grid>

        }
        )}
      </GridHiddenScroll>
      <Pagination
        count={floor(dataCount?.ticketCount / EVENTS_PER_FETCH) + 1}
        page={page + 1}
        variant={"outlined"}
        color={"primary"}
        onChange={(e_, page) => setPage(page - 1)}
        shape="rounded"
      />
    </FetchingState>
  );
};

export default MyTickets;
