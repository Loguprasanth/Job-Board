import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://job-board-backend-q170.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
