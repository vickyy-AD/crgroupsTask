import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

interface LoginRequest {
  userName: string;
  password: string;
  geolocation: string;
  LoginDevice: string;
}

export const loginApi = async (payload: LoginRequest) => {
  const response = await apiClient.post(API_ENDPOINTS.LOGIN, payload);
  return response.data;
};
