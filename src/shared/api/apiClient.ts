import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://test-api.crgroups.in',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

 apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

 apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default apiClient;
