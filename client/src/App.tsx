import Home from "./components/Home";
import { Box, Container } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/AppBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { useUserContext } from "./controller/userController/userContext";

// use this enum to make links to pages
export enum RoutePaths {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
}

const App = () => {
  const { user } = useUserContext();

  return (
    <Router>
      {/* {user && <Navbar />} */}
      <Navbar />
      <Box height="90%" marginTop={5}>
        <Container sx={{ height: "inherit" }}>
          <Routes>
            <Route path={RoutePaths.LOGIN} element={<Login />} />
            <Route path={RoutePaths.SIGNUP} element={<Signup />} />
            <Route
              path={RoutePaths.HOME}
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
