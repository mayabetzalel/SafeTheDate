/* eslint-disable @typescript-eslint/no-empty-function */
import { AnyCnameRecord } from 'dns';
import backendAPI from '../../api';
import React, { useState, useContext, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';


const AuthContext = createContext({
  currentUser: null,
  signUp: async (email: string, username: string, firstName: string, 
    lastName: string, password: string) => {},
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
  isUserSignedIn: () => {},
  getUser: () => {},
  getUserProfilePicture: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {  
  const [cookies, setCookie, removeCookie] = useCookies(['user-session']);
  const [currentUser, setCurrentUser] = useState(cookies['user-session']);
  const [userProfilePicture, setUserProfilePicture] = useState(
    'https://source.unsplash.com/xpTsS9PJMXQ'
  );

  async function  signUp(email: string, username: string, firstName: string, 
    lastName: string, password: string) {
      try {
        const response = await backendAPI.auth.signUpWithEmailAndPassword(email, username, firstName, lastName, password)  
        setCurrentUser(response.data)

      }  catch {
        console.log()
      }
    }

  async function signIn (email: string, password: string) {
    try {
      const response = await backendAPI.auth.signInWithEmailAndPassword(email, password)
      setCurrentUser(response.data)
    } catch {
      console.log("erorr")
    }
  }

  async function signOut() {
    setCurrentUser(null);
    removeCookie('user-session');
    backendAPI.auth.logOut()
  }

  function isUserSignedIn() {
    return currentUser != null;
  }

  function getUser() {
    return currentUser;
  }

  function getUserProfilePicture() {
    return userProfilePicture;
  }

  const value = {
    currentUser,
    isUserSignedIn,
    signUp,
    signIn,
    signOut,
    getUser,
    getUserProfilePicture
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;



