import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import HomeIconWithBadge from '../components/HomeIconWithBadge';
import SafeAreaPage from '../pages/Example/SafeAreaPage';
import MovieTalk from '../pages/Movie/MovieTalk';
import MovieDetail from '../pages/Movie/MovieDetail';
import AppIntroDemo from '../pages/AppIntro/AppIntroDemo';

const StackNavigator = createStackNavigator(
  {
    MovieTalk: {
      screen: MovieTalk,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    MovieDetail: {
      screen: MovieDetail,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
  },
  {
    mode: 'card',
    // headerMode: 'none',
    initialRouteName: 'MovieTalk',
    tabBarLabel: '电影',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: SafeAreaPage,
    Other: StackNavigator,
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
        } else if (routeName === 'Other') {
          iconName = `ios-stats`;
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

const AppNavigator = createStackNavigator(
  {
    AppIntroDemo: {
      screen: AppIntroDemo,
      navigationOptions: {
        gesturesEnabled: true,
        header: null, //去掉 react-navigation 提供的标题
      },
    },
    MyTab: {
      screen: TabNavigator,
      navigationOptions: {
        gesturesEnabled: true,
        // header: null,
      },
    },
  },
  {
    mode: 'card',
    // headerMode: 'none',
    initialRouteName: 'AppIntroDemo',
  },
);

export default createAppContainer(AppNavigator);
