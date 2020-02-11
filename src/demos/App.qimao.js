import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeIconWithBadge from '../components/badge/HomeIconWithBadge';
// 认证
import Panel from '../pages/Qimao/Auth/Panel';
import Privacy from '../pages/Qimao/Auth/Privacy';
import Agreement from '../pages/Qimao/Auth/Agreement';
import Mobile from '../pages/Qimao/Auth/Mobile';
// import Signin from '../pages/Qimao/Auth/Signin';

// 书架
import Shelf from '../pages/Qimao/Shelf/Index';
import Record from '../pages/Qimao/Shelf/Record';
import Pencil from '../pages/Qimao/Auth/Signin';

// 搜索
import Search from '../pages/Qimao/Search/Search';
// 书城
import Depot from '../pages/Qimao/Depot/Index';
// 福利
import Welfare from '../pages/Qimao/Welfare/Index';
// 我的
import Profile from '../pages/Qimao/Profile/Index';
import Cash from '../pages/Qimao/Profile/Cash';
import Gold from '../pages/Qimao/Profile/Gold';
import Invitation from '../pages/Qimao/Profile/Invitation';
import Notice from '../pages/Qimao/Profile/Notice';
import Teenager from '../pages/Qimao/Profile/Teenager';
import Privilege from '../pages/Qimao/Profile/Privilege';
import Withdraw from '../pages/Qimao/Profile/Withdraw';
import RedEnvelope from '../pages/Qimao/Profile/RedEnvelope';

// 设置
import Setting from '../pages/Qimao/Profile/Setting';
import About from '../pages/Qimao/Profile/Setting/About';
import BasicInfo from '../pages/Qimao/Profile/Setting/BasicInfo';
import AccountSafe from '../pages/Qimao/Profile/Setting/AccountSafe';
import ReadSetting from '../pages/Qimao/Profile/Setting/ReadSetting';
import CacheClear from '../pages/Qimao/Profile/Setting/CacheClear';
import Nickname from '../pages/Qimao/Profile/Setting/Nickname';
import Avatar from '../pages/Qimao/Profile/Setting/Avatar';
import AccountMobile from '../pages/Qimao/Profile/Setting/AccountMobile';
import AccountMobileChange from '../pages/Qimao/Profile/Setting/AccountMobileChange';
import AccountDestroy from '../pages/Qimao/Profile/Setting/AccountDestroy';
import AccountDestroyApplication from '../pages/Qimao/Profile/Setting/AccountDestroyApplication';

// 帮助
import Help from '../pages/Qimao/Profile/Help';
import Detail from '../pages/Qimao/Profile/Help/Detail';
import Feedback from '../pages/Qimao/Profile/Help/Feedback';
import FeedbackAdd from '../pages/Qimao/Profile/Help/FeedbackAdd';
import MultiplePic from '../pages/Qimao/Profile/Help/MultiplePic';

// 启动页
import SplashPage from '../pages/Qimao/Splash/Index';
// 广告
import AdPage from '../pages/Qimao/Ad/Index';

// 封面简介
import Cover from '../pages/Qimao/Fiction/Cover';
// 阅读器
import Reader from '../pages/Qimao/Fiction/Reader';

let SettingStack = createStackNavigator(
  {
    Default: {
      screen: Setting,
      navigationOptions: {
        header: null,
      },
    },
    About: {
      screen: About,
      navigationOptions: {
        header: null,
      },
    },
    BasicInfo: {
      screen: BasicInfo,
      navigationOptions: {
        header: null,
      },
    },
    AccountSafe: {
      screen: AccountSafe,
      navigationOptions: {
        header: null,
      },
    },
    ReadSetting: {
      screen: ReadSetting,
      navigationOptions: {
        header: null,
      },
    },
    CacheClear: {
      screen: CacheClear,
      navigationOptions: {
        header: null,
      },
    },
    Nickname: {
      screen: Nickname,
      navigationOptions: {
        header: null,
      },
    },
    Avatar: {
      screen: Avatar,
      navigationOptions: {
        header: null,
      },
    },
    AccountMobile: {
      screen: AccountMobile,
      navigationOptions: {
        header: null,
      },
    },
    AccountMobileChange: {
      screen: AccountMobileChange,
      navigationOptions: {
        header: null,
      },
    },
    AccountDestroy: {
      screen: AccountDestroy,
      navigationOptions: {
        header: null,
      },
    },
    AccountDestroyApplication: {
      screen: AccountDestroyApplication,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Default',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      header: null,
    },
  },
);

let ProfileStack = createStackNavigator(
  {
    ProfileBox: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
    Cash: {
      screen: Cash,
      navigationOptions: {
        header: null,
      },
    },
    Gold: {
      screen: Gold,
      navigationOptions: {
        header: null,
      },
    },
    Invitation: {
      screen: Invitation,
      navigationOptions: {
        header: null,
      },
    },
    Notice: {
      screen: Notice,
      navigationOptions: {
        header: null,
      },
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: {
        header: null,
      },
    },
    Teenager: {
      screen: Teenager,
      navigationOptions: {
        header: null,
      },
    },
    Privilege: {
      screen: Privilege,
      navigationOptions: {
        header: null,
      },
    },
    Withdraw: {
      screen: Withdraw,
      navigationOptions: {
        header: null,
      },
    },
    RedEnvelope: {
      screen: RedEnvelope,
      navigationOptions: {
        header: null,
      },
    },
    Record: {
      screen: Record,
      navigationOptions: {
        header: null,
      },
    },
    Help: {
      screen: Help,
      navigationOptions: {
        header: null,
      },
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
        header: null,
      },
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: {
        header: null,
      },
    },
    FeedbackAdd: {
      screen: FeedbackAdd,
      navigationOptions: {
        header: null,
      },
    },
    MultiplePic: {
      screen: MultiplePic,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'ProfileBox',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      header: null,
    },
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

let SearchStack = createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Search',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      header: null,
    },
  },
);
let WelfareStack = createStackNavigator(
  {
    WelfareBox: {
      screen: Welfare,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'WelfareBox',
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
    SearchStack: {
      screen: Cover,
      navigationOptions: {
        title: '搜索',
      },
    },
    WelfareStack: {
      screen: WelfareStack,
      navigationOptions: {
        title: '福利',
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        title: '我的',
      },
    },
  },
  {
    initialRouteName: 'SearchStack',
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
        } else if (routeName === 'SearchStack') {
          iconName = `ios-search`;
        } else if (routeName === 'WelfareStack') {
          iconName = `ios-gift`;
        } else if (routeName === 'ProfileStack') {
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
  Panel: {
    screen: Panel,
    navigationOptions: {
      header: null,
    },
  },
  Privacy: {
    screen: Privacy,
    navigationOptions: {
      header: null,
    },
  },
  Mobile: {
    screen: Mobile,
    navigationOptions: {
      header: null,
    },
  },
  Agreement: {
    screen: Agreement,
    navigationOptions: {
      header: null,
    },
  },
});

const SwitchStack = createSwitchNavigator(
  {
    App: AppTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
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
