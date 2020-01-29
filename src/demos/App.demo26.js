import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeIconWithBadge from '../components/HomeIconWithBadge';
import ShoppingCart from '../pages/ShoppingCart';
import CameraRollPage from '../pages/CameraRollPage';
import ImagePickerPage from '../pages/Image/ImagePickerPage';
import PositionPage from '../pages/PositionPage';
import ClipboardPage from '../pages/ClipboardPage';
import VideoPlayer from '../pages/Video/VideoPlayer';
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

class HomeScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class CartScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: ClipboardPage,
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
        let badgeCount;
        if (routeName === 'Home') {
          badgeCount = 20;
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
          badgeCount = 0;
        } else if (routeName === 'Cart') {
          iconName = `ios-cart`;
          badgeCount = 0;
        } else if (routeName === 'Category') {
          iconName = `ios-basketball`;
          badgeCount = 0;
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
