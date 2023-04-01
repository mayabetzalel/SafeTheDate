import { Paper, Typography } from "@mui/material";
import { useUserContext } from "../hooks/userController/userContext";
import ThemeExamples from "../overrieds/ThemeExamples";
import { gql, useQuery } from "urql";
import FetchingState from "../utils/fetchingState";

const ticketQuery = gql`
  query ticketQuery {
    ticket {
      id    
    }
  }
`;

const Events = () => {
  const { user } = useUserContext();
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: ticketQuery,
  });
  return (
    <FetchingState isError={error} isFetching={fetching}>
      <Paper>
        <Typography variant={"h4"}>
          Welcome to Safe The Date {user?.displayName}
        </Typography>
        <Typography variant={"h4"}>{data}</Typography>
      </Paper>
    </FetchingState>
  );
};

export default Events;
