import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../../modules/auth/presentation/LoginScreen';
import ListScreen from '../../modules/list/presentation/ListScreen';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="Home" component={ListScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
