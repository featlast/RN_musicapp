import {createStackNavigator} from '@react-navigation/stack';
import {DetailsScreen, HomeScreen, ProfileScreen} from '../../presentation';

const Stack = createStackNavigator();

function MyStackNavigationScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default MyStackNavigationScreens;
