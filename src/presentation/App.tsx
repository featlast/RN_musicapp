import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '../config/queryClient';
import RootNavigation from '../routes/stack/RootNavigation';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../theme';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RootNavigation />
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
