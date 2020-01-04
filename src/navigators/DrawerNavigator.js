import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomePage from '../pages/DrawerHome';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import Login from '../pages/DrawerLogin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    backgroundColor: 'pink',
    fontSize: 15,
  },
  btn: {
    backgroundColor: 'red',
    color: 'blue',
    width: 60,
    height: 44,
    marginTop: 115,
    marginLeft: 100,
  },
  icon: {
    width: 22,
    height: 22,
  },
});

class MainScreen extends React.Component {
  //一直在想怎么样实现 抽屉包装一个组件 但是不要在侧边栏存在这个组件的相关显示与响应
  //于是在这里对drawerLabel给了一个View 并且将它隐藏了
  //运行起来的结果看起来还不错  没有显示  也没有交互
  static navigationOptions = {
    drawerLabel: () => <View style={{opacity: 0}}></View>,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.btn}
          title={'侧栏'}
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <Text style={styles.text}>首页 进行信息展示</Text>
      </View>
    );
  }
}

const DrawerNav = createDrawerNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Page4: {
      screen: Page4,
      navigationOptions: {
        drawerLabel: 'Page4',
        drawerIcon: ({tintColor}) => (
          <MaterialIcons
            name={'drafts'}
            size={24}
            style={{
              color: tintColor,
            }}
          />
        ),
      },
    },
    Page5: {
      screen: Page5,
      navigationOptions: {
        drawerLabel: 'Page5',
        drawerIcon: ({tintColor}) => (
          <MaterialIcons
            name={'move-to-inbox'}
            size={24}
            style={{color: tintColor}}
          />
        ),
      },
    },
  },
  {
    order: ['Page4', 'Page5', 'Main'],
    drawerWidth: '30%',
    initialRouteName: 'Page4',
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
    useNativeAnimations: true,
    drawerPosition: 'right',
    drawerBackgroundColor: 'white',
    overlayColor: 'rgba(0,0,0,0.1)',
    // contentComponent: props => (
    //   <ScrollView style={{backgroundColor: '#789', flex: 1}}>
    //     <SafeAreaProvider>
    //       <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
    //         <DrawerItems {...props} />
    //       </SafeAreaView>
    //     </SafeAreaProvider>
    //   </ScrollView>
    // ),
  },
);

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
      tabStyle: {
        mindWidth: 50,
      },
      upperCaseLabel: false, // 是否使标签大写 默认true
      scrollEndabled: true, // 是否支持选项卡滚动 默认false
      style: {
        backgroundColor: '#678', // TabBar背景色
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

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomePage,
    },
    Page1: {
      screen: Page1,
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
                setParams({
                  mode: params.mode === 'edit' ? '' : 'edit',
                });
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

    DrawerNav: {
      screen: DrawerNav,
      navigationOptions: {
        title: 'This is DrawNavigator',
      },
    },
  },
  {
    defaultNavigationOptions: {
      // header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    navigationOptions: {
      // header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    },
  },
);

const AppStackNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

const App = createAppContainer(AppStackNavigator);
export default App;
