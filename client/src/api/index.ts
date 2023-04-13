import axios from 'axios';

const REST_API = {
    auth: {
        signInWithEmailAndPassword:'http://localhost:5000/api/auth/login',
        signUpWithEmailAndPassword: 'http://localhost:5000/api/auth/register'
    }
}

const backendAPI = {
    auth: {
      async signInWithEmailAndPassword(emailOrUsername : string, password : string) {
        return await axios.post(REST_API.auth.signInWithEmailAndPassword, {
          emailOrUsername,
          password
        },{
          //AxiosRequestConfig parameter
          withCredentials: true //correct
        });
      },

      async signUpWithEmailAndPassword(email: string, username: string, firstName: string, 
        lastName: string, password: string) {
          console.log({
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password
          })
        return await axios.post(REST_API.auth.signUpWithEmailAndPassword, {
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password
        });
      },
    }
}

export default backendAPI;
