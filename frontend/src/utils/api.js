import axios from "axios";

const localApi = `http://localhost:8000`;
const productionApi = ``;

const token = localStorage.getItem("canva_token");

const api = axios.create({
  baseURL: localApi,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});

export default api;
