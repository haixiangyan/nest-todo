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

http.interceptors.response.use((response) => {
  if (response.data.retcode !== 0) {
    alert(response.data.message);
  }
  return response.data;
}, (error) => {
  if (error.message.includes('401')) {
    window.location.replace('/login');
  }
  return Promise.reject(error);
});

export default http;
