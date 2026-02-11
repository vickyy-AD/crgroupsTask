import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/app/navigation/AppNavigator';
import { Provider } from 'react-redux';
import baseStore from './src/app/store/rootStore';
import CustomToast from './src/shared/components/CustomToast';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider store={baseStore}>
        <StatusBar backgroundColor={'#000000'} barStyle={'light-content'} />
        <AppNavigator />
        <CustomToast />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
