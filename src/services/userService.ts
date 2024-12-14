// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8800/api", // Cambia según tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
