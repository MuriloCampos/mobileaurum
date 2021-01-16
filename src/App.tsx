import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppProvider from './hooks';
import Routes from './routes';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
