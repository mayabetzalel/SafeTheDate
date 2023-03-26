import {Paper, Typography} from "@mui/material";
import { useUserContext } from "../controller/userController/userContext";
import ThemeExamples from "../overrieds/ThemeExamples";

const Events = () => {
  const { user } = useUserContext();

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
    </Paper>
    // </FetchingState>
  );
};

export default Events;
