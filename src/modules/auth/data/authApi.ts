import apiClient from '../../../shared/api/apiClient';

interface LoginRequest {
  userName: string;
  password: string;
  geolocation: string;
  LoginDevice: string;
}

export const loginApi = async (payload: LoginRequest) => {
  const response = await apiClient.post('/api/account/login', payload);
  return response.data;
};
