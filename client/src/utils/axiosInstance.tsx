import axios from "axios";

const AxiosInstance = axios.create({
  responseType: "json",
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

AxiosInstance.interceptors.request.use(async (request: any) => {
  // const auth = firebase.getFirebaseAuth();
  // local storage token
  // const currentUser = auth.currentUser;
  // const token = await currentUser?.getIdToken();
  // if (token) {
  //   request.headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  // } else {
  //   window.location.href = "/login";
  // }
  return request;
});
export default AxiosInstance;
