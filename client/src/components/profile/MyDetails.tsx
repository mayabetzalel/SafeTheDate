import { Grid, Stack, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authController/AuthContext";

export const MyDetails = () => {
  const { currentUser = {} } = useAuth();

  return (
    <Stack spacing={3}>
      <Grid
        item
        sm={9}
        md={15}
        sx={{
          backgroundImage: `url(${currentUser?.["picture"]})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <img src={currentUser?.["picture"]} width="500" height="300"></img>
      <Typography variant={"h4"} color={"primary"}>
        {currentUser?.["firstName"]} {currentUser?.["lastName"]}
      </Typography>
      <Typography variant={"h4"} color={"primary"}>
        {currentUser?.["username"]}
      </Typography>
      <Typography variant={"h4"} color={"primary"}>
        {currentUser?.["email"]}
      </Typography>
    </Stack>
  );
};
