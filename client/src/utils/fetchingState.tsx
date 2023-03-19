import { useSnackbar } from "notistack";
import React from "react";
import Spinner from "./spinner";

interface FetchingStateProps {
  isLoading: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  children: React.ReactNode;
}
const FetchingState: React.FunctionComponent<FetchingStateProps> = ({
  isLoading,
  isError = false,
  isSuccess = false,
  children,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  if (isError) {
    enqueueSnackbar("error!", { variant: "error" });
    return <></>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess) {
    return <>{children}</>;
  }
  enqueueSnackbar("Something bad happened!", { variant: "error" });
  return <></>;
};
export default FetchingState;
