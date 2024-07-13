import React from 'react';
import HomeScreen from './screens/HomeScreen';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '../config/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
};

export default App;
