import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyAccountScreen from '../../features/myAccount/view/MyAccountScreen';
import ProductDetailsScreen from '../../features/productDetails/view/ProductDetailsScreen';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Store" component={TabNavigator} />
        <Stack.Screen
          name="MyAccount"
          component={MyAccountScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
