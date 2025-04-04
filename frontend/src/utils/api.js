import axios from "axios";

// Determine environment based on current URL
const isProduction = window.location.hostname !== "localhost";
const baseURL = isProduction
  ? "https://canva-mppp.onrender.com"
  : "http://localhost:8000";

const token = localStorage.getItem("canva_token");

const api = axios.create({
  baseURL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});

export default api;
