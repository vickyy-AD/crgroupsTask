import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStart, loginSuccess, loginFailure } from '../authSlice';
import { AppDispatch } from '../../../app/store/rootStore';
import { loginApi } from '../data/authApi';

export const loginUseCase =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());

      const response = await loginApi({
        userName: email,
        password,
        geolocation: '23.1341,77.5632',
        LoginDevice: 'Android',
      });

      console.log('LOGIN RESPONSE', response.AccessToken);
      console.log('LOGIN RESPONSE', response);

      const accessToken = response?.AccessToken || response?.accessToken;

      if (!accessToken) {
        throw new Error('Token not found');
      }

      await AsyncStorage.setItem('accessToken', accessToken);

      dispatch(loginSuccess(accessToken));
      return true;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || 'Login failed';

      dispatch(loginFailure(message));
      return false;
    }
  };
