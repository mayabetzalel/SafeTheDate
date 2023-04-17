import { Outlet } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";
import NavigationTypography from "../AppBar/NavigationTypography/NavigationTypography";
import { RoutePaths } from "../../App";

export const Profile = () => {
  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.default,
        display: 'flex',
        height: '100%'
      })}
    >
      <Grid
        container
        columns={1}
        sx={(theme) => ({
          placeItems: 'center',
          color: theme.palette.primary.main,
          flexDirection: 'row',
          width: '9rem',
          height: '50%',
          zIndex: 100,
        })}
      >
        <Grid item xs={1} >
          <NavigationTypography route={RoutePaths.MY_EVENTS}>
            My Events
          </NavigationTypography>
        </Grid>
        <Grid item xs={1}>
          <NavigationTypography route={RoutePaths.MY_TICKETS}>
            My Tickets
          </NavigationTypography>
        </Grid>
        <Grid item xs={1}>
          <NavigationTypography route={RoutePaths.MY_DETAILS}>
            Account Details
          </NavigationTypography>
        </Grid>
      </Grid>

      <Divider orientation="vertical" flexItem light sx={(theme) => ({
        borderColor: theme.palette.secondary.main,
        marginRight: '1rem'
      })} />

      <div id="detail">
        <Outlet />
      </div>

    </Box >
  );
}