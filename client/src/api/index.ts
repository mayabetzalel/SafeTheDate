import axios from 'axios';

const REST_API = {
    auth: {
        signInWithEmailAndPassword:'http://localhost:5000/api/auth/login',
        signUpWithEmailAndPassword: 'http://localhost:5000/api/auth/register',
        logout: 'http://localhost:5000/api/auth/logout'
    }
}

const backendAPI = {
    auth: {
      async signInWithEmailAndPassword(emailOrUsername : string, password : string) {
        return await axios.post(REST_API.auth.signInWithEmailAndPassword, {
          emailOrUsername,
          password
        },{
          withCredentials: true 
        });
      },

      async signUpWithEmailAndPassword(email: string, username: string, firstName: string, 
        lastName: string, password: string) {
        return await axios.post(REST_API.auth.signUpWithEmailAndPassword, {
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password
        },{
          withCredentials: true 
        });
      },

      async logOut() {
        return await axios.post(REST_API.auth.logout)
      }
    }
}

export default backendAPI;
