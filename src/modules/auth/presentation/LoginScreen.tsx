import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import InputField from '../../../shared/components/CustomInputField';
import Button from '../../../shared/components/CustomButton';
import { isValidEmail } from '../../../shared/utils/validators';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { loginUseCase } from '../domain/loginUseCase';
import { RootStackParamList } from '../../../app/navigation/AppNavigator';
import { showErrorToast, showSuccessToast } from '../../../shared/utils/Toast';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector(state => state.authReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const onLogin = async () => {
    let valid = true;

    if (!email) {
      showErrorToast('Email is required');
      return;
    } 
    
    if (!isValidEmail(email)) {
      showErrorToast('Enter a valid email');
      return;
    }

    if (!password) {
      showErrorToast('Password is required');
      return;
    } 

    if (!valid) return;

    const success = await dispatch(loginUseCase(email, password));

    if (success) {
      showSuccessToast('Login successful');
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
       />

      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
       />

      <Button title="Login" onPress={onLogin} loading={loading} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
