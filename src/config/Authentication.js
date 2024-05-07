import customAxios from "../api/axios";
const login = async (user, pwd) => {
  const LOGIN_URL = "/auth";
  console.log("Logging In");
  try {
    const response = await customAxios.post(
      LOGIN_URL,
      JSON.stringify({ username: user, password: pwd }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    localStorage.setItem("auth", JSON.stringify(response.data));
    const QueuedUrl = localStorage.getItem("QueuedUrl");
    if (QueuedUrl) {
      localStorage.removeItem("QueuedUrl");
      window.location.href = QueuedUrl;
    }
    return response;
  } catch (e) {
    console.log("Failed to login");
    return e;
  }
};
const logout = async () => {
  const LOGOUT_URL = "/logout";
  console.log("Logging Out");
  const response = await customAxios.get(LOGOUT_URL);
  localStorage.removeItem("auth");
  return response;
};
export { login, logout };
