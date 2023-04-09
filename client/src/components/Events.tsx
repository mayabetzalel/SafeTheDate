import { Paper, Typography } from "@mui/material";
import { useUserContext } from "../hooks/userController/userContext";
import ThemeExamples from "../overrieds/ThemeExamples";
import { gql, useQuery } from "urql";
import FetchingState from "../utils/fetchingState";

interface ticketData {

    ticket: { areaNumber: number; id: string }[];

}

const ticketQuery = gql`
  query ticketQuery {
    ticket {
      id
      areaNumber
    }
  }
`;

const Events = () => {
  const { user } = useUserContext();
  const [{ data, fetching, error }, reexecuteQuery] = useQuery<ticketData>({
    query: ticketQuery,
  });
  return (
    <FetchingState isError={error} isFetching={fetching}>
      <Paper>
        <Typography variant={"h4"}>
          Welcome to Safe The Date {user?.displayName}
        </Typography>
        <Typography variant={"h4"}>areaNumber: {data?.ticket?.[0].areaNumber}</Typography>
      </Paper>
    </FetchingState>
  );
};

export default Events;
