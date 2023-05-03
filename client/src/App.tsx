import Events from "./components/Events";
import { Box, Container } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/AppBar/AppBar";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { CreateEvent } from "./components/CreateEvent";
import { ImportTicket } from "./components/ImportTicket";
import Captain from "./components/Captain";
import ScanEvent from "./components/ScanEvent";
import { Profile } from "./components/profile/Profile";
import { MyTickets } from "./components/profile/MyTickets";
import { MyEvents } from "./components/profile/MyEvents";

// use this enum to make links to pages
export enum RoutePaths {
  LOGIN = "/login",
  SIGNUP = "/signup",
  EVENTS = "/",
  CAPTAIN = "/captain",
  CREATE_EVENT = "/create-event",
  IMPORT_TICKET = "/import-ticket",
  PROFILE = "/profile",
  MY_EVENTS = "/profile/events",
  MY_TICKETS = "/profile/tickets",
  MY_DETAILS = "/profile/details",
  EVENT_PAGE = "/event/:eventId",
  SCAN_EVENT = "/event/scan",
}

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <Box height="90%">
          <Container
            sx={{ height: "100%", paddingTop: "50px" }}
            maxWidth={"xl"}
          >
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
        path: RoutePaths.CAPTAIN,
        element: (
          <PrivateRoute>
            <Captain />
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
        children: [
          {
            path: RoutePaths.MY_EVENTS,
            element: (
              <PrivateRoute>
                <MyEvents />
              </PrivateRoute>
            ),
          },
          {
            path: RoutePaths.MY_TICKETS,
            element: (
              <PrivateRoute>
                <MyTickets />
              </PrivateRoute>
            ),
          },
          {
            path: RoutePaths.MY_DETAILS,
            element: (
              <PrivateRoute>
                <ImportTicket />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: RoutePaths.MY_EVENTS,
        element: (
          <PrivateRoute>
            <MyEvents />
          </PrivateRoute>
        ),
      },
      {
        path: RoutePaths.MY_TICKETS,
        element: (
          <PrivateRoute>
            <MyTickets />
          </PrivateRoute>
        ),
      },
      {
        path: RoutePaths.MY_DETAILS,
        element: (
          <PrivateRoute>
            <ImportTicket />
          </PrivateRoute>
        ),
      },
      {
        path: RoutePaths.SCAN_EVENT,
        element: (
          <PrivateRoute>
            <ScanEvent />
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
