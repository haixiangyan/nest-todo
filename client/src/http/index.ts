import axios from "axios"
import {baseURL} from "../constants"

const http = axios.create({
  baseURL,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (!token) return config;

  const bearerAuth = `Bearer ${localStorage.getItem('token')}`;

  return {
    ...config,
    headers: { Authorization: bearerAuth }
  }
}, (error) => {
  return Promise.reject(error);
});

export default http;
