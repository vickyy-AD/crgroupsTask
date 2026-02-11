import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/Login/LoginScreen';
import ListScreen from '../screens/List/ListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from '../constants/navigation';

export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.LIST]: undefined;
};

const stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName={ROUTES.LOGIN}
        screenOptions={{
          headerShown: false,
        }}
      >
        <stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        <stack.Screen name={ROUTES.LIST} component={ListScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
