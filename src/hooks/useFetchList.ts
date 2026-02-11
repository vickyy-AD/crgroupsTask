import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchListStart,
  fetchListSuccess,
  fetchListFailure,
} from '../store/slices/listSlice';
import { fetchListApi } from '../api/listApi';
import { formatDate, formatDateTime } from '../utils/dateFormatter';

export const useList = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector(state => state.listReducer);

  const fetchList = async () => {
    try {
      dispatch(fetchListStart());

      const response = await fetchListApi({
        id: page,
        geolocation: '23.1341,77.5632',
      });

      const apiData = response?.Data || [];

      const mappedData = apiData.map((item: any) => ({
        id: item.Id,
        date: formatDate(item.Date),
        lrNo: item.LrNo,
        runnerName: item.RunnerName,
        startTime: formatDateTime(item.StartTime),
        endTime: formatDateTime(item.EndTime),
        status: item.Status,
        vehicleNo: item.VehicleNo,
        vehicleType: item.VehicleType,
        purpose: item.PurposeName,
      }));

      dispatch(fetchListSuccess(mappedData));
    } catch (error: any) {
      dispatch(
        fetchListFailure(
          error?.response?.data?.Msg ||
          error?.message ||
          'Failed to load list',
        ),
      );
    }
  };

  return { fetchList };
};
