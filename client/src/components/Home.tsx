import { Typography } from "@mui/material";
import { useUserContext } from "../controller/userController/userContext";

const Home = () => {
  const { user } = useUserContext();

  return (
    // <FetchingState
    //   isError={isError}
    //   isSuccess={isSuccess}
    //   isLoading={isLoading}
    // >
    <>
      <Typography variant={"h4"}>
        Welcome to Safe The Date {user?.displayName}
      </Typography>
    </>
    // </FetchingState>
  );
};

export default Home;
