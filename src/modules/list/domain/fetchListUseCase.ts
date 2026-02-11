import { AppDispatch, RootState } from '../../../app/store/rootStore';
import {
  fetchListStart,
  fetchListSuccess,
  fetchListFailure,
} from '../listSlice';
import { fetchListApi } from '../data/listApi';

export const fetchListUseCase =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(fetchListStart());

      const { page, search, statusFilter } = getState().listReducer;

      const response = await fetchListApi({
        id: page,
         geolocation: '23.1341,77.5632',
      });

       const apiData = response?.Data || [];

      const mappedData = apiData.map((item: any) => ({
        id: item.Id,
        date: item.Date,
        lrNo: item.LrNo,
        runnerName: item.RunnerName,
        startTime: item.StartTimeString,
        endTime: item.EndTimeString,
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
