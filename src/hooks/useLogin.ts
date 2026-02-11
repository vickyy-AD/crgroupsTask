import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../store/hooks';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { loginApi } from '../api/authApi';
import { Platform } from 'react-native';

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      dispatch(loginStart());

      const response = await loginApi({
        userName: email,
        password,
        geolocation: '23.1341,77.5632',
        LoginDevice: Platform.OS === 'android' ? 'Android' : 'iOS',
      });

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

  return { login };
};
