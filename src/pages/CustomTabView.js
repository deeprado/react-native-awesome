import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';

import MyTabBar from '../components/MyTabBar';

export default class CustomTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabNames: ['主页', '分类', '书籍', '我的'],
      tabIconNames: ['ios-home', 'ios-grid', 'ios-book', 'ios-contact'],
    };
  }
  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;
    return (
      <ScrollableTabView
        style={styles.container}
        renderTabBar={() => (
          <MyTabBar tabNames={tabNames} tabIconNames={tabIconNames} />
        )}
        tabBarPosition={'bottom'}
        locked={false}
        initialPage={0}
        prerenderingSiblingsNumber={1}>
        <View tabLabel="page1" style={styles.center}>
          <Icon name="logo-github" size={50} />
          <IconFont.Button name="github" backgroundColor="#FF3399" size={20}>
            专为开发人员而设
          </IconFont.Button>
        </View>

        <View tabLabel="page2" style={styles.center}>
          <Icon name="logo-apple" size={50} />
          <IconFont.Button name="apple" backgroundColor="#FF3399" size={20}>
            在 Apple 上构建任何应用
          </IconFont.Button>
        </View>
        <View tabLabel="page3" style={styles.center}>
          <Icon name="logo-android" size={50} />
          <IconFont.Button name="android" backgroundColor="#FF3399" size={20}>
            在 android 上构建任何应用
          </IconFont.Button>
        </View>

        <View tabLabel="page4" style={styles.center}>
          <Icon name="logo-html5" size={50} />
          <IconFont.Button name="html5" backgroundColor="#FF3399" size={20}>
            在 html5 上构建任何应用
          </IconFont.Button>
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
