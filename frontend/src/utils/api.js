import axios from "axios";

const localApi = `http://localhost:8000`;
const productionApi = `https://canva-mppp.onrender.com`;

const token = localStorage.getItem("canva_token");

const api = axios.create({
  baseURL: productionApi,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});

export default api;
