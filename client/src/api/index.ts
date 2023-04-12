import axios from 'axios';

const REST_API = {
    auth: {
        signInWithEmailAndPassword:'http://localhost:5000/api/auth/login',
        signUpWithEmailAndPassword: 'http://localhost:5000/api/auth/register'
    }
}

const backendAPI = {
    auth: {
      async signInWithEmailAndPassword(email : string, password : string) {
        return await axios.post(REST_API.auth.signInWithEmailAndPassword, {
          email,
          password
        });
      },

      async signUpWithEmailAndPassword(email: string, username: string, firstName: string, 
        lastName: string, password: string) {
        return await axios.post(REST_API.auth.signUpWithEmailAndPassword, {
          email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          password
        });
      },
    }
}

export default backendAPI;
