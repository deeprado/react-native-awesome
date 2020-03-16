import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeIconWithBadge from '../components/badge/HomeIconWithBadge';
import ShoppingCart from '../pages/Cart/ShoppingCart';
import CityList from '../pages/List/CityList';
import NativePage from '../pages/Example/NativePage';
import ContactsPage from '../pages/Contacts/ContactsPage';
import CategoryList from '../pages/Category/CategoryList';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: NativePage,
    Category: CategoryList,
    Settings: SettingsScreen,
    Cart: ShoppingCart,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        } else if (routeName === 'Cart') {
          iconName = `ios-cart`;
        } else if (routeName === 'Category') {
          iconName = `ios-basketball`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabNavigator);
