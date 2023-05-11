import axios from "axios";

const REST_API = {
  auth: {
    signInWithEmailAndPassword: "http://localhost:5000/api/auth/login",
    getCurrentSession: "http://localhost:5000/api/auth/session",
    confirmMail: "http://localhost:5000/api/auth/confirm",
    signUpWithEmailAndPassword: "http://localhost:5000/api/auth/register",
    logout: "http://localhost:5000/api/auth/logout",
  },
};

const backendAPI = {
  auth: {
    async signInWithEmailAndPassword(
      emailOrUsername: string,
      password: string
    ) {
      return await axios.post(
        REST_API.auth.signInWithEmailAndPassword,
        {
          emailOrUsername,
          password,
        },
        {
          withCredentials: true,
        }
      );
    },

    async signUpWithEmailAndPassword(
      email: string,
      username: string,
      firstName: string,
      lastName: string,
      password: string
    ) {
      return await axios.post(
        REST_API.auth.signUpWithEmailAndPassword,
        {
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
    },

    async getCurrentSession() {
      return await axios.get(REST_API.auth.getCurrentSession, {
        withCredentials: true,
      });
    },
    async confirmMail(confirmation: string) {
      return await axios.put(
        REST_API.auth.confirmMail,
        { confirmId: confirmation },
        {
          withCredentials: true,
        }
      );
    },

    async logOut() {
      return await axios.post(
        REST_API.auth.logout,
        {},
        {
          withCredentials: true,
        }
      );
    },

    async signInWithGoogle(accessToken: string) {
      return await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
    },
  },
};

export default backendAPI;
