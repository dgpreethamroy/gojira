import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:3500",
});
customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error: " + error.response?.data?.message);
    if (error.response?.status === 408) {
      window.location.href = "/";
    } else {
      return error;
    }
  }
);
let cancelToken;
customAxios.interceptors.request.use((request) => {
  const local_auth = localStorage.getItem("auth");
  if (local_auth) {
    request.headers.Authorization = `Bearer ${
      JSON.parse(local_auth).accessToken
    }`;
  }
  if (cancelToken) {
    cancelToken.cancel("Request canceled due to new request.");
  }
  cancelToken = axios.CancelToken.source();
  request.cancelToken = cancelToken.token;
  return request;
});
export default customAxios;
