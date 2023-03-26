import { Grid, IconButton } from "@mui/material";
import { RoutePaths } from "../../App";
import { Logout } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { useNavigate, useNavigation } from "react-router-dom";
import * as React from "react";
import NavigationTypography from "./NavigationTypography/NavigationTypography";

const Navbar = () => {
  const navigate = useNavigate();
  const { location } = useNavigation();

  const logout = async () => {
    try {
      // await signOut();
      navigate(RoutePaths.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      textAlign={'center'}
      sx={(theme) => ({
        background: theme.palette.background.default,
        height: "10%",
        position: "sticky",
        top: 0,
        zIndex: 100,
      })}
    >
      <Grid item xs={2}>
        <img
          style={{ height: "10vh", width: "10=7vh", cursor: "pointer" }}
          src={logo}
          alt="fireSpot"
          onClick={() => navigate(RoutePaths.EVENTS)}
        />
      </Grid>
      <Grid item xs>
        <NavigationTypography route={RoutePaths.EVENTS}>
          Events
        </NavigationTypography>
      </Grid>
      <Grid item xs>
        <NavigationTypography route={RoutePaths.CREATE_EVENT}>
          Create Events
        </NavigationTypography>
      </Grid>
      <Grid item xs>
        <NavigationTypography route={RoutePaths.IMPORT_TICKET}>
          Import Tickets
        </NavigationTypography>
      </Grid>
      <Grid item xs>
        <NavigationTypography route={RoutePaths.PROFILE}>
          Profile
        </NavigationTypography>
      </Grid>
      <Grid item xs={2} container justifyContent={"center"}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          onClick={logout}
        >
          <Logout />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Navbar;
