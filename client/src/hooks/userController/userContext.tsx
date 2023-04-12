import { createContext, useContext } from "react";
import backendAPI from '../../api';

const AuthContext = createContext({
  signUp: async (email: string, username: string, firstName: string, 
    lastName: string, password: string) => {
    backendAPI.auth.signUpWithEmailAndPassword(email, username, firstName, lastName, password)
  },
  signIn: async ( email: string, password: string ) => {
    backendAPI.auth.signInWithEmailAndPassword(email, password)
  }
})

export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}

export interface IUserContext {
  user: any | undefined;
  // user: User | undefined;
  setUser: (user: any | undefined) => void;
  // setUser: (user: User | undefined) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const defaultValue: IUserContext = {
  user: undefined,
  setUser: () => {
    console.log("setting user")
  },
  isLoading: true,
  setIsLoading: () => {
    console.log("setting is loading")
  },
};

export const UserContext = createContext(defaultValue);
export const useUserContext = (): IUserContext => useContext(UserContext);
