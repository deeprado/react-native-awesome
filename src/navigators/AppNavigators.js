import React from 'react'; //只要在页面中使用了基础组件 都需要导入这句话 不然会报错
import {Button, Platform} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import HomePage from '../pages/Drawer/DrawerHome';
import Page1 from '../pages/Demo/Page1';
import Page2 from '../pages/Demo/Page2';
import Page3 from '../pages/Demo/Page3';
import Page4 from '../pages/Demo/Page4';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const AppBottomNavigator = createBottomTabNavigator(
  {
    Page1: {
      screen: Page1,
      navigationOptions: {
        tabBarLabel: '最热',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons name={'ios-home'} size={26} style={{color: tintColor}} />
        ),
      },
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        tabBarLabel: '趋势',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={'ios-appstore'} // 全部小写
            size={26}
            style={{color: tintColor}}
          />
        ),
      },
    },
    Page3: {
      screen: Page3,
      navigationOptions: {
        tabBarLabel: '收藏',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons name={'ios-people'} size={26} style={{color: tintColor}} />
        ),
      },
    },
    Page4: {
      screen: Page4,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={'ios-aperture'}
            size={26}
            style={{color: tintColor}}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
    },
  },
);

const AppStackNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
    },
    Page1: {
      screen: Page1,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.name}页面名`, //动态设置navigationOptions
      }),
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        //在这里定义每个页面的导航属性，静态配置
        title: 'This is Page2.',
      },
    },
    Page3: {
      screen: Page3,
      navigationOptions: props => {
        //在这里定义每个页面的导航属性，动态配置
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;
        return {
          title: params.title ? params.title : 'This is Page3',
          headerRight: (
            <Button
              title={params.mode === 'edit' ? '保存' : '编辑'}
              onPress={() => {
                setParams({mode: params.mode === 'edit' ? '' : 'edit'});
              }}
            />
          ),
        };
      },
    },

    Bottom: {
      screen: AppBottomNavigator,
      navigationOptions: {
        title: 'BottomNavigator',
      },
    },

    Top: {
      screen: AppTopNavigator,
      navigationOptions: {
        title: 'TopNavigator',
      },
    },
  },
  {
    defaultNavigationOptions: {
      // header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    },
  },
);

const App = createAppContainer(AppStackNavigator);
export default App;
