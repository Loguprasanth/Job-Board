import axios from './axios'; // pre-configured axios instance

export const createJob = async (jobData) => {
  try {
    const response = await axios.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const getJobById = async (id) => {
  try {
    const response = await axios.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error);
    throw error;
  }
};


export const getAllJobs = async () => {
  try {
    const response = await axios.get('/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
