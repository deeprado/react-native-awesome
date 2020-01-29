import React from 'react';
//导入 react-navigation 组件

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation-tabs';

//页面切换动画插入器
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
// 矢量图
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';
import SplashPage from '../pages/Splash/SplashPage';
import IndexPage from '../pages/Home/IndexPage';
import CategoryPage from '../pages/Category/CategoryPage';
import BrandPage from '../pages/BrandPage';
import CartPage from '../pages/Chat/CartPage';
import MyPage from '../pages/Mine/MyPage';
import CustomTabBar from '../components/CustomTabBar';
import SearchPage from '../pages/SearchPage';

const CategoryTab = createMaterialTopTabNavigator(
  {
    CategoryPage: {
      screen: CategoryPage,
      navigationOptions: {
        tabBarLabel: '品类',
      },
    },
    BrandPage: {
      screen: BrandPage,
      navigationOptions: {
        tabBarLabel: '品牌',
      },
    },
  },
  {
    swipeEnabled: true, // 允许左右滑动
    animationEnabled: true, //切换页面时显示动画
    backBehavior: 'none',
    tabBarOptions: {
      // tabbar上label的style
      labelStyle: {},
      // tabbar的style
      style: {
        height: theme.actionBar.height + theme.barContentPad, //修改高度
        marginHorizontal: theme.screenWidth / 6,
        paddingTop: theme.barContentPad, //不同平台高度不一样
        backgroundColor: '#fff',
        elevation: 0, //组件的高度为0 就没有阴影了
        shadowOpacity: 0, //阴影完全透明
      },
      // 每个选项卡的样式
      tabStyle: {
        width: (theme.screenWidth * 1) / 3,
      },
      // label和icon的背景色 活跃状态下
      activeBackgroundColor: '#fff',
      // label和icon的前景色 活跃状态下（选中）
      activeTintColor: theme.primaryColor,
      // label和icon的背景色 不活跃状态下
      inactiveBackgroundColor: '#fff',
      // label和icon的前景色 不活跃状态下(未选中)
      inactiveTintColor: theme.lightBlack,
      showIcon: false, //是否显示 Icon
      // 是否显示label，默认为true
      showLabel: true,
      // 按下选项卡的透明度(iOS和Android < 5.0)
      pressOpacity: 0.3,
      indicatorStyle: {
        // Tabbar下划线样式
        height: 2,
        width: theme.screenWidth / 9,
        backgroundColor: theme.primaryColor,
        left: theme.screenWidth / 9,
      },
    },
    //自定义 TabBar
    tabBarComponent: props => <CustomTabBar {...props} />,
  },
);
const MyTab = createBottomTabNavigator(
  {
    IndexPage: {
      screen: IndexPage,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
            name={`ios-home${focused ? '' : '-outline'}`}
            size={25}
            color={tintColor}
          />
        ),
      },
    },
    CategoryTab: {
      screen: CategoryTab,
      navigationOptions: {
        tabBarLabel: '分类',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
            name={`ios-apps${focused ? '' : '-outline'}`}
            size={25}
            color={tintColor}
          />
        ),
      },
    },
    CartPage: {
      screen: CartPage,
      navigationOptions: {
        tabBarLabel: '购物车',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
            name={`ios-cart${focused ? '' : '-outline'}`}
            size={25}
            color={tintColor}
          />
        ),
      },
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
            name={`ios-person${focused ? '' : '-outline'}`}
            size={25}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      // label和icon的前景色 活跃状态下（选中）
      activeTintColor: theme.primaryColor,
      // label和icon的背景色 不活跃状态下
      inactiveBackgroundColor: theme.lightGray,
      // label和icon的前景色 不活跃状态下(未选中)
      inactiveTintColor: theme.lightBlack,
    },
  },
);
const AppNavigator = createStackNavigator(
  {
    SplashPage: {
      screen: SplashPage,
      navigationOptions: {
        gesturesEnabled: true,
        header: null, //去掉 react-navigation 提供的标题
      },
    },
    MyTab: {
      screen: MyTab,
      navigationOptions: {
        gesturesEnabled: true,
        // header: null,
      },
    },
    SearchPage: {
      screen: SearchPage,
      navigationOptions: {
        gesturesEnabled: true,
        header: null,
      },
    },
  },
  {
    mode: 'card', // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    // headerMode: 'none', //// 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    transitionConfig: () => ({
      //切换动画
      screenInterpolator: StackViewStyleInterpolator.forHorizontal, //水平动画
    }),
  },
);

export default createAppContainer(AppNavigator);
