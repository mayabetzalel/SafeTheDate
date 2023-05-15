/* eslint-disable no-debugger */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-empty-function */

import { AnyCnameRecord } from 'dns'
import backendAPI from '../../api'
import React, { useState, useContext, createContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { googleLogout } from '@react-oauth/google'


const AuthContext = createContext({
  currentUser: null,
  signUp: async (email: string, username: string, firstName: string, 
    lastName: string, password: string) => {},
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
  isUserSignedIn: () => {},
  getUser: () => {},
  getUserProfilePicture: () => { },
  logWithGoogle: (user: any) => {}
})

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {  
  const [isFromGoogle, setIsFromGoogle] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['user-session'])
  const [currentUser, setCurrentUser] = useState(cookies['user-session'])
  const [userProfilePicture, setUserProfilePicture] = useState(
    'https://source.unsplash.com/xpTsS9PJMXQ'
  )

  async function logWithGoogle(accessToken: string) {
    try {
      const response: any = await backendAPI.auth.signInWithGoogle(accessToken)
      console.log(response.data)

      setCurrentUser({ 
        email: response.data.email, 
        firstName: response.data.given_name, 
        isConfirmed: response.data.verified_email, 
        lastName: response.data.family_name, 
        password: "", 
        username: response.data.given_name, 
        picture: response.data.picture
      })
      setIsFromGoogle(true)
      setUserProfilePicture(response.data.image)
    } catch(error) {
      throw error
    }
  }

  async function signUp(email: string, username: string, firstName: string, 
    lastName: string, password: string) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await backendAPI.auth.signUpWithEmailAndPassword(email, username, firstName, lastName, password)  
        response.data.picture = "https://source.unsplash.com/xpTsS9PJMXQ"
        setCurrentUser(response.data)
      } catch(error :any) {
        throw error
      }
    }

  async function signIn (email: string, password: string) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await backendAPI.auth.signInWithEmailAndPassword(email, password)
      response.data.picture = "https://source.unsplash.com/xpTsS9PJMXQ"
      setCurrentUser(response.data)
    } catch (error: any) {
      
      console.log("in error from user context")
      throw new Error(error.response.data.functionalityError.message)
    }
  }

  async function signOut() {
    setCurrentUser(null)
    removeCookie('user-session')
    if(isFromGoogle)
      googleLogout()
    else
      backendAPI.auth.logOut()
  }

  function isUserSignedIn() {
    return currentUser != null
  }

  function getUser() {
    return currentUser
  }

  function getUserProfilePicture() {
    return userProfilePicture
  }

  const value = {
    currentUser,
    isUserSignedIn,
    signUp,
    signIn,
    signOut,
    getUser,
    getUserProfilePicture,
    logWithGoogle
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
