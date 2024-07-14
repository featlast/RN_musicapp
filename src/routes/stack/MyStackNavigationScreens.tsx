import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {DetailsScreen, HomeScreen, ProfileScreen} from '../../presentation';
import {screenOptions} from './screenOptions';

export type RootStackParams = {
  Home: undefined;
  Detail: {mbid: string};
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

function MyStackNavigationScreens() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default MyStackNavigationScreens;
