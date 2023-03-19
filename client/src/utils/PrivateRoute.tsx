import { Navigate, Route, useLocation } from "react-router-dom";
import { useUserContext } from "../controller/userController/userContext";
import Spinner from "./spinner";
const PrivateRoute = ({ children }: { children: JSX.Element }): any => {
  const { user, isLoading } = useUserContext();
  let location = useLocation();
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
  );
};
export default PrivateRoute;
