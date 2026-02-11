import apiClient from '../../../shared/api/apiClient';

interface ListRequest {
  id: number;
  geolocation: string;
 
}

export const fetchListApi = async (payload: ListRequest) => {
  const response = await apiClient.post(
    '/api/integration/listlinerun',
    payload,
  );
  return response.data;
};
