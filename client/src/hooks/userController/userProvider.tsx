import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { UserContext, IUserContext } from "./userContext";
import React, { Component }  from 'react';

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUserContext["user"] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const memoValue: IUserContext = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
    }),
    [user, setUser, isLoading, setIsLoading]
  );
  return (
    <UserContext.Provider value = {memoValue}>{children}</UserContext.Provider>
  );
};
