import { Grid } from "@mui/material";
import TicketCard from "../TicketCard/TicketCard";
import { graphql } from "../../graphql";
import { useQuery } from "urql";
import Spinner from "../../utils/spinner";

export const MyTickets = () => {

    const ticketQuery = graphql(`
  query ticketQuery {
    ticket {
      id
      areaNumber
    }
  }
`);

    const [{ data: myTicketsEvents, fetching: fetchingTicketsEvents, error: getTicketsErroe }, reexecuteQuery] = useQuery({
        query: ticketQuery,
    });

    return (
        fetchingTicketsEvents ?
            <Spinner />
            :
            <Grid container spacing={3}>
                {/* {myTicketsEvents && myTicketsEvents?.ticket.map((i) => (
              <Grid key={i?.id} item sm={4} md={3}> */}
                {[1, 2, 3, 4, 5, 6, 7,].map((i) => (
                    <Grid key={i} item sm={4} md={3}>
                        <TicketCard />
                    </Grid>
                ))}
            </Grid>
    );
}