import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabNavigator';
const Stack = createNativeStackNavigator();
export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="Home" component={BottomTabs} />
    </Stack.Navigator>
  );
};
