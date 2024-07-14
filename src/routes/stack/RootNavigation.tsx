import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStackNavigationScreens from './MyStackNavigationScreens';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <MyStackNavigationScreens />
    </NavigationContainer>
  );
};

export default RootNavigation;
