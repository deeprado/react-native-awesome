import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 认证
import Panel from '../pages/Qimao/Auth/Panel';
import Privacy from '../pages/Qimao/Auth/Privacy';
import Agreement from '../pages/Qimao/Auth/Agreement';
import Mobile from '../pages/Qimao/Auth/Mobile';
import Signin from '../pages/Qimao/Auth/Signin';
import Copyright from '../pages/Qimao/Auth/Copyright';
import Permission from '../pages/Qimao/Auth/Permission';

// 书架
import Shelf from '../pages/Qimao/Shelf/Index';
import Record from '../pages/Qimao/Shelf/Record';

// 搜索
import Search from '../pages/Qimao/Search/Search';
// 书城
import Depot from '../pages/Qimao/Depot/Index';
// 福利
import Welfare from '../pages/Qimao/Welfare/Index';
import Noad from '../pages/Qimao/Welfare/Noad';
import Download from '../pages/Qimao/Welfare/Download';
import Lottery from '../pages/Qimao/Welfare/Lottery';

// 我的
import Profile from '../pages/Qimao/Profile/Index';
import Cash from '../pages/Qimao/Profile/Cash';
import Gold from '../pages/Qimao/Profile/Gold';
import Invitation from '../pages/Qimao/Welfare/Invitation';
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
import Video from '../pages/Qimao/Ad/Video';

// 封面简介
import Cover from '../pages/Qimao/Fiction/Cover';
// 阅读器
import Reader from '../pages/Qimao/Fiction/Reader';

import Demo2 from '../pages/Reader/Demo2';

// 书城
import Category from '../pages/Qimao/Depot/Category';
import Rank from '../pages/Qimao/Depot/Rank';
import Product from '../pages/Qimao/Depot/Product';
import Boutique from '../pages/Qimao/Depot/Boutique';
import Filter from '../pages/Qimao/Depot/Filter';

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

const bottomTabOptions = (tabBarTitle, iconName, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    let IconComponent = Ionicons;
    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />;
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    headerTitle,
    headerTitleStyle,
    headerStyle,
    tabBarVisible,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    ShelfBox: {
      screen: Shelf,
      navigationOptions: () => bottomTabOptions('书架', 'ios-podium'),
    },
    DepotBox: {
      screen: Depot,
      navigationOptions: () => bottomTabOptions('书城', 'ios-book'),
    },
    // SearchBox: {
    //   screen: Demo2,
    //   navigationOptions: () => bottomTabOptions('搜索', 'ios-search'),
    // },
    WelfareBox: {
      screen: Welfare,
      navigationOptions: () => bottomTabOptions('福利', 'ios-gift'),
    },
    ProfileBox: {
      screen: Profile,
      navigationOptions: () => bottomTabOptions('福利', 'ios-person'),
    },
  },
  {
    initialRouteName: 'ShelfBox',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
    },
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    // 书架
    Shelf: {
      screen: Shelf,
      navigationOptions: {
        header: null,
      },
    },
    // 搜索
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    // 签到
    Signin: {
      screen: Signin,
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
    // 认证相关
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
    Copyright: {
      screen: Copyright,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
    Permission: {
      screen: Permission,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
    // 书城
    Category: {
      screen: Category,
      navigationOptions: {
        header: null,
      },
    },
    Rank: {
      screen: Rank,
      navigationOptions: {
        header: null,
      },
    },
    Product: {
      screen: Product,
      navigationOptions: {
        header: null,
      },
    },
    Boutique: {
      screen: Boutique,
      navigationOptions: {
        header: null,
      },
    },
    Filter: {
      screen: Filter,
      navigationOptions: {
        header: null,
      },
    },
    // 我的
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
    Noad: {
      screen: Noad,
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
    // 多图选择
    MultiplePic: {
      screen: MultiplePic,
      navigationOptions: {
        header: null,
      },
    },
    // 福利
    Welfare: {
      screen: Welfare,
      navigationOptions: {
        header: null,
      },
    },
    Video: {
      screen: Video,
      navigationOptions: {
        header: null,
      },
    },
    Download: {
      screen: Download,
      navigationOptions: {
        header: null,
      },
    },
    Lottery: {
      screen: Lottery,
      navigationOptions: {
        header: null,
      },
    },

    // 封面
    Cover: {
      screen: Cover,
      navigationOptions: {
        header: null,
      },
    },
    // 阅读器
    Reader: {
      screen: Reader,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
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
    AppPage: AppAllStack,
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
