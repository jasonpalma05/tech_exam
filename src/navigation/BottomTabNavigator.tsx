import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {cart} = useSelector((state: {shopReducer: any}) => state.shopReducer);
  const filterQuantity = cart.map((obj: {quantity: number}) => obj.quantity);
  let cartNumber = 0;
  if (filterQuantity?.length) {
    filterQuantity.forEach((num: number) => {
      cartNumber += num;
    });
  }
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        headerShown: false,
        title: '',
        tabBarStyle: {
          backgroundColor: '#F9FDFE',
        },
        tabBarActiveTintColor: '#00b0b0',
        tabBarInactiveTintColor: '#191C1D',
        tabBarLabel: () => null,
        tabBarIcon: ({focused, color, size}) => {
          let tabName: any;
          if (route.name === 'HomeScreen') {
            tabName = 'HOME';
          } else if (route.name === 'CartScreen') {
            tabName = 'CART';
          }
          return (
            <Text
              style={{
                color: color,
                fontWeight: 'bold',
                fontSize: moderateScale(15),
              }}>
              {tabName}
            </Text>
          );
        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{tabBarBadge: cartNumber}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
