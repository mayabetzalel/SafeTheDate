import { Navigate, Route, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/authController/AuthContext";
import Spinner from "./spinner";

const PrivateRoute = ({ children }: { children: JSX.Element }): any => {
  const { currentUser } = useAuth()
  let location = useLocation()
  return (
    <>
      {true ? (
        false ? (
          <Navigate to="/login" state={{ from: location }} />
        ) : (
          { ...children }
        )
      ) : (
        <Spinner />
      )}
    </>
  )
}
export default PrivateRoute
