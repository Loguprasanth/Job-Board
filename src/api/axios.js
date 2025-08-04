import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // or use your deployed backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
