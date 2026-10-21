import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartScreen from '../../features/cart/view/CartScreen';
import HomeScreen from '../../features/home/view/HomeScreen';
import WishlistScreen from '../../features/wishlist/view/WishlistScreen';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { useAppSelector } from '../store/hooks';

type StoreTabParamList = {
  Shop: undefined;
  Bag: undefined;
  Wishlist: undefined;
};

const Tab = createBottomTabNavigator<StoreTabParamList>();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  const cartItemCount = useAppSelector(state =>
    state.cart.reduce((count, item) => count + item.quantity, 0),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#EEEEEE',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
        },
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name="Shop"
        options={{
          tabBarIcon: ShopTabIcon,
        }}
      />
      <Tab.Screen
        component={CartScreen}
        name="Bag"
        options={{
          tabBarIcon: BagTabIcon,
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#111111',
            color: '#FFFFFF',
            fontSize: 9,
            minWidth: 17,
          },
        }}
      />
      <Tab.Screen
        component={WishlistScreen}
        name="Wishlist"
        options={{
          tabBarIcon: WishlistTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

function ShopTabIcon() {
  return <Lucide name="layout-grid" size={23} color="black" />;
}

function BagTabIcon() {
  return <Lucide name="shopping-bag" size={23} color="black" />;
}

function WishlistTabIcon() {
  return <Lucide name="heart" size={23} color="black" />;
}
