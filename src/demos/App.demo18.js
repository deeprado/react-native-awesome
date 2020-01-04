import React from 'react';
import {StyleSheet, View, Button, Text, Image, ScrollView} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

class AppInfoScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'appInfoPage',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../assets/image/logo.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>APP 信息展示页</Text>
        <Button
          style={styles.btn}
          title={'侧栏'}
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
      </View>
    );
  }
}

class Setting extends React.Component {
  static navigationOptions = {
    drawerLabel: 'setting',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../assets/image/logo.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
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
        <Text style={styles.text}>设置页</Text>
      </View>
    );
  }
}

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

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        {/* <View style={{width: 200, height: 100, backgroundColor: 'red'}}></View> */}
        <DrawerItems {...props} />
      </SafeAreaView>
    </SafeAreaProvider>
  </ScrollView>
);

//this.props.navigation.openDrawer();//打开抽屉
//this.props.navigation.closeDrawer();//关闭抽屉
const AppStackNavigator = createDrawerNavigator(
  {
    AppInfo: {
      screen: AppInfoScreen,
    },
    Main: {
      screen: MainScreen,
    },
    Set: {
      screen: Setting,
    },
  },
  {
    order: ['AppInfo', 'Set', 'Main'], //routeNames数组，用于定义抽屉项目的顺序。
    initialRouteName: 'Main', //初始路由的routeName。
    drawerLockMode: 'locked-open', //设置是否响应手势
    //'unlocked'   可以通过手势和代码 打开关闭抽屉
    //'locked-closed' 抽屉关闭状态  不能通过手势打开  只能通过代码实现
    //'locked-open'  抽屉打开状态  不能通过手势关闭  只能通过代码实现

    drawerWidth: 250, //抽屉的宽度或返回的功能。
    drawerPosition: 'left', //选项是left或right。默认是left位置。
    useNativeAnimations: false, //启用原生动画。默认是true。
    // drawerBackgroundColor: 'pink', //使用抽屉背景获取某种颜色。默认是white。

    //用于呈现抽屉内容的组件，例如导航项。收到navigation抽屉的道具。默认为DrawerItems
    //用于自定义
    //contentComponent: '',
    contentComponent: CustomDrawerContentComponent,

    //配置抽屉内容  items相关
    contentOptions: {
      // items: [OtherScreen],//可以修改或覆盖路由数组  不知道干嘛用的
      // activeItemKey: 'AppInfo', //识别活动路线的关键  也不知道干嘛用的

      activeTintColor: 'white', //活动标签的标签和图标颜色
      activeBackgroundColor: 'blue', //活动标签的背景颜色
      inactiveTintColor: 'black', //非活动标签的标签和图标颜色
      inactiveBackgroundColor: 'red', //非活动标签的背景颜色

      // //按下项目时要调用的函数 不知道是否使用错误 一直没反应
      //github上面有答案 在自定义视图的时候 会有用
      // onItemPress(route) {
      //     console.log('onItemPress'+route);
      // },

      // itemsContainerStyle: '', //内容部分的样式对象
      // itemStyle: '', //单个项目的样式对象，可以包含图标和 / 或标签
      // labelStyle: '', //Text当标签是字符串时，样式对象在内容部分内覆盖样式
      // activeLabelStyle: '', //Text当标签是字符串（与之合并labelStyle）时，样式对象覆盖活动标签的样式
      // inactiveLabelStyle: '', //Text当标签是字符串（与之合并labelStyle）时，样式对象覆盖非活动标签的样式
      // iconContainerStyle: '', //样式对象以覆盖View图标容器样式。
    },
  },
);
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

const App = createAppContainer(AppStackNavigator);
export default App;
