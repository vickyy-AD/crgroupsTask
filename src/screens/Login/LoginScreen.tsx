import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/CustomInputField';
import Button from '../../components/CustomButton';
import { isValidEmail } from '../../utils/validators';
import { useAppSelector } from '../../store/hooks';
import { useLogin } from '../../hooks/useLogin';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { showErrorToast, showSuccessToast } from '../../utils/Toast';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/navigation';
import { styles } from './LoginScreen.styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTES.LOGIN
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useLogin();
  const { loading, error } = useAppSelector(state => state.authReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const onLogin = async () => {
    let hasError = false;

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) return;

    const success = await login(email, password);
    if (success) {
      showSuccessToast('Login successful');
      navigation.replace(ROUTES.LIST);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}
    >
      <StatusBar backgroundColor={COLORS.LIGHT_ORANGE} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subWelcomeText}>Log in to continue</Text>
          </View>
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoIcon}>📱</Text>
              </View>
            </View>
          </View>
        </View>

        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.formSection}>
            <Text style={styles.title}>Enter Credentials</Text>

            <InputField
              label="Email Address"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (emailError) setEmailError(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
              placeholder="example@mail.com"
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (passwordError) setPasswordError(null);
              }}
              secureTextEntry
              error={passwordError}
              placeholder="********"
            />

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button title="Continue" onPress={onLogin} loading={loading} />

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>By continuing, you agree to our </Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>T&C</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}> and </Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Privacy policy</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}>.</Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
