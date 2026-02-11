import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import commonStore from './src/store/commonStore';
import CustomToast from './src/components/CustomToast';
import { COLORS } from './src/constants/colors';

function App() {
 
  return (
    <SafeAreaProvider>
      <Provider store={commonStore}>
        <StatusBar backgroundColor={COLORS.BLACK} barStyle={'light-content'} />
        <AppNavigator />
        <CustomToast />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
