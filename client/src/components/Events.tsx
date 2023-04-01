import { Paper, Typography } from "@mui/material";
import { useUserContext } from "../hooks/userController/userContext";
import ThemeExamples from "../overrieds/ThemeExamples";
import {gql, useQuery} from "urql";

const ticketQuery = gql`
    query ticketQuery {
        ticket
    }
`

const Events = () => {
  const { user } = useUserContext();
    const [result, reexecuteQuery] = useQuery({query: ticketQuery})
  return (
    // <FetchingState
    //   isError={isError}
    //   isSuccess={isSuccess}
    //   isLoading={isLoading}
    // >
    <Paper>
      <Typography variant={"h4"}>
        Welcome to Safe The Date {user?.displayName}
      </Typography>
      <Typography variant={"h4"}>
          {result.data['ticket']}
      </Typography>
    </Paper>
    // </FetchingState>
  );
};

export default Events;
