import Events from "./components/Events";
import { Box, Container } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/AppBar/AppBar";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { useUserContext } from "./hooks/userController/userContext";
import {CreateEvent} from "./components/CreateEvent";
import {ImportTicket} from "./components/ImportTicket";
import {Profile} from "./components/Profile";

// use this enum to make links to pages
export enum RoutePaths {
  LOGIN = "/login",
  SIGNUP = "/signup",
  EVENTS = "/",
  CREATE_EVENT = "/create-event",
  IMPORT_TICKET = "/import-ticket",
  PROFILE = "/profile",
}

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <Box height="90%">
          <Container sx={{ height: "inherit"}} maxWidth={"xl"}>
            <Outlet />
          </Container>
        </Box>
      </>
    ),
    children: [
      {
        path: RoutePaths.LOGIN,
        element: <Login />,
      },
      {
        path: RoutePaths.SIGNUP,
        element: <Signup />,
      },
      {
        path: RoutePaths.EVENTS,
        element: (
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        ),
      },
      {
        path: RoutePaths.CREATE_EVENT,
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: RoutePaths.IMPORT_TICKET,
        element: (
          <PrivateRoute>
            <ImportTicket />
          </PrivateRoute>
        ),
      },
      {
        path: RoutePaths.PROFILE,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
