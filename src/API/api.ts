import axios from "axios";

const meetingHubApi = axios.create({
  baseURL: "http://localhost:8800",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (credentials: { email: String; password: String }) => {
  meetingHubApi.post("/auth/Login", credentials);
};
