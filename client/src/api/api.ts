import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3900/api", // Base para todas las peticiones
  headers: { "Content-Type": "application/json" }
});


