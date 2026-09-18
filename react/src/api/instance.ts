import axios from 'axios';

const axiosConfig = {
  baseUrl: process.env.REACT_APP_API_URL,
};

const request = axios.create({
  baseURL: axiosConfig.baseUrl,
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.data?.debug) {
      console.log('API Debug Information:', error.response.data.debug);
    }
    throw error;
  },
);

export default request;
