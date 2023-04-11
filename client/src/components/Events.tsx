import Grid from "@mui/material/Grid";
import { useUserContext } from "../hooks/userController/userContext";
import TicketCard from "./TicketCard/TicketCard";
import { gql, useQuery } from "urql";
import FetchingState from "../utils/fetchingState";
import {graphql} from "../graphql";

const ticketQuery = graphql(`
  query ticketQuery {
    ticket {
      id
      areaNumber
    }
  }
`);



const Events = () => {
  const { user } = useUserContext();
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: ticketQuery,
  });
  return (
    <Grid container spacing={3}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
        <Grid item sm={4} md={3}>
          <TicketCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default Events;
