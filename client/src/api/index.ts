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
        console.log("00011")
        return await axios.post(REST_API.auth.signInWithEmailAndPassword, {
          email,
          username: "username",
          firstName: "first",
          lastName: "second",
          password,
        });
      },

      async signUpWithEmailAndPassword(email : string, password : string) {
        console.log("11")
        return await axios.post(REST_API.auth.signUpWithEmailAndPassword, {
          email,
          username: "username",
          firstName: "first",
          lastName: "second",
          password,
        });
      },
    }
}

export default backendAPI;
