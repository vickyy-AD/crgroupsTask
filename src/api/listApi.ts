import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

interface ListRequest {
  id: number;
  geolocation: string;

}

export const fetchListApi = async (payload: ListRequest) => {
  const response = await apiClient.post(
    API_ENDPOINTS.LIST_LINE_RUN,
    payload,
  );
  return response.data;
};
