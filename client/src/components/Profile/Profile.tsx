import { Outlet, redirect } from "react-router-dom";
import { Box, Divider, Grid, Stack } from "@mui/material";
import NavigationTypography from "../AppBar/NavigationTypography/NavigationTypography";
import { RoutePaths } from "../../App";

export const Profile = () => {
  redirect(RoutePaths.MY_DETAILS);

  return (
    <Grid container>
      <Grid item xs={3}>
        <Stack alignItems={"center"} spacing={3}>
          <NavigationTypography route={RoutePaths.MY_EVENTS}>
            My Events
          </NavigationTypography>
          <NavigationTypography route={RoutePaths.MY_TICKETS}>
            My Tickets
          </NavigationTypography>
          <NavigationTypography route={RoutePaths.MY_DETAILS}>
            Account Details
          </NavigationTypography>
        </Stack>
      </Grid>
      <Grid item xs={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
