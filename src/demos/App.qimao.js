import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeIconWithBadge from '../components/badge/HomeIconWithBadge';
import Github from '../pages/Profile/github';
import Setting from '../pages/Profile/setting';

import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import MineScene from '../pages/Mine/MineScene';

// 书架
import Shelf from '../pages/Qimao/Shelf/Index';
import Record from '../pages/Qimao/Shelf/Record';
import Pencil from '../pages/Qimao/Shelf/Pencil';

// 搜索
import Search from '../pages/Qimao/Search/Search';
// 书城
import Depot from '../pages/Qimao/Depot/Index';
// 福利
import Welfare from '../pages/Qimao/Welfare/Index';
// 我的
import Profile from '../pages/Qimao/Profile/Index';
// 启动页
import SplashPage from '../pages/Qimao/Splash/Index';
// 广告
import AdPage from '../pages/Qimao/Ad/Index';

let ProfileStack = createStackNavigator(
  {
    Profile: MineScene,
    Github: Github,
    Setting: Setting,
  },
  {
    initialRouteName: 'Profile',
  },
);

let DepotStack = createStackNavigator(
  {
    DepotBox: {
      screen: Depot,
      navigationOptions: {
        header: null,
      },
    },

  },
  {
    initialRouteName: 'DepotBox',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      header: null,
    },
  },
);

let ShelfStack = createStackNavigator(
  {
    Shelf: {
      screen: Shelf,
      navigationOptions: {
        header: null,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    Pencil: {
      screen: Pencil,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
    Record: {
      screen: Record,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Shelf',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      header: null,
    },
  },
);

const AppTabNavigator = createBottomTabNavigator(
  {
    ShelfStack: {
      screen: ShelfStack,
      navigationOptions: {
        title: '书架',
      },
    },
    DepotStack: {
      screen: DepotStack,
      navigationOptions: {
        title: '书城',
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    Welfare: {
      screen: Welfare,
      navigationOptions: {
        title: '福利',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: '我的',
      },
    },
  },
  {
    initialRouteName: 'DepotStack',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'ShelfStack') {
          iconName = `ios-podium`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'DepotStack') {
          iconName = `ios-book`;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        } else if (routeName === 'Welfare') {
          iconName = `ios-gift`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person`;
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

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
});

const SwitchStack = createSwitchNavigator(
  {
    App: AppTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
  },
);

const SplashStack = createStackNavigator(
  {
    SplashPage: {
      screen: SplashPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    AdPage: {
      screen: AdPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    SwitchPage: SwitchStack,
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(SplashStack);
