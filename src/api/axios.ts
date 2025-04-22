import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8001/api/';


const token = localStorage.getItem('token');
const axios_instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/json",
}
});

export default axios_instance;


