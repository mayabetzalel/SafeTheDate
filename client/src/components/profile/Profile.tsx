import { Outlet } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";
import NavigationTypography from "../AppBar/NavigationTypography/NavigationTypography";
import { RoutePaths } from "../../App";
import { useAuth } from "../../hooks/userController/userContext"  

export const Profile = () => {

  const { currentUser } = useAuth();
  
  return (
    !currentUser ?
    <div style={{ color:"white", marginTop:"200sx" }}>
      <h1>   You Have To Sign In To Watch Your Profile</h1>
      <Grid container component="main"  sx={{ height: '75vh' }} >
        <Grid
          item
          sm={9}
          md={15}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/ZnLprInKM7s)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        </Grid>
    </div>
    :
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