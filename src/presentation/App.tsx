import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '../config/queryClient';
import RootNavigation from '../routes/stack/RootNavigation';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../theme';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RootNavigation />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
