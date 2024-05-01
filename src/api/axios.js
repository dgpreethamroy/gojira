import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://gojira-server.onrender.com",
  // baseURL: "http://localhost:10000",
});
let cancelToken = {};

customAxios.interceptors.response.use((response, error) => {
  const request_url = response.config.url;
  delete cancelToken[request_url];
  if (response) return response;
  else if (error) {
    console.log("Error: " + error.response?.data?.message);
    if (error.response?.status === 408) {
      window.location.href = "/";
    } else {
      return error;
    }
  }
});

customAxios.interceptors.request.use((request) => {
  const local_auth = localStorage.getItem("auth");
  if (local_auth) {
    request.headers.Authorization = `Bearer ${JSON.parse(local_auth).accessToken}`;
  }
  if (cancelToken[request.url]) {
    cancelToken[request.url].cancel("Request canceled due to new request.");
    console.log("Request Cancelled due to new request");
  }

  cancelToken[request.url] = axios.CancelToken.source();
  request.cancelToken = cancelToken.token;
  return request;
});
export default customAxios;
