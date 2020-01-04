import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeIconWithBadge from '../components/HomeIconWithBadge';
import AsyncStoragePage from '../pages/AsyncStoragePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';

const AppTopNavigator = createMaterialTopTabNavigator(
  {
    Page1: {
      screen: Page1,
      navigationOptions: {
        tabBarLabel: 'All',
      },
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        tabBarLabel: 'iOS',
      },
    },
    Page3: {
      screen: Page3,
      navigationOptions: {
        tabBarLabel: 'Android',
      },
    },
    Page4: {
      screen: Page4,
      navigationOptions: {
        tabBarLabel: 'React-Native',
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {mindWidth: 50},
      upperCaseLabel: false, //是否使标签大写 默认true
      scrollEndabled: true, //是否支持选项卡滚动 默认false
      style: {
        backgroundColor: '#678', //TabBar背景色
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
      }, //标签指示器样式
      labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
      }, // 文字的样式
    },
  },
);
const TabNavigator = createBottomTabNavigator(
  {
    Home: AsyncStoragePage,
    Settings: AppTopNavigator,
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
