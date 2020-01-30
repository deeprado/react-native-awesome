import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';

import MyBackButton from '../../components/back/MyBackButton';

const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

export default class DrawerHome extends Component {
  //修改Back按钮
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {
      headerLeft: () => <MyBackButton />,
      headerTitle: () => <Text style={styles.headerTitle}>这是主页</Text>,
      // headerTitleStyle: {
      //   //导航栏文字的样式
      //   color: '#fff',
      //   //设置标题的大小
      //   fontSize: 16,
      //   //居中显示
      //   alignSelf: 'center',
      //   flex: 1,
      //   textAlign: 'center',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLayoutPreset: 'center',
    };
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎来到HomePage</Text>

        <Button
          title={'去 Page1'}
          onPress={() => {
            navigation.navigate('Page1', {name: '动态的'});
          }}
        />

        <Button
          title={'去 Page2'}
          onPress={() => {
            navigation.navigate('Page2');
          }}
        />

        <Button
          title={'去 Page3'}
          onPress={() => {
            navigation.navigate('Page3', {name: 'Dev iOS'});
          }}
        />

        <Button
          title={'去 Bottom Navigator'}
          onPress={() => {
            navigation.navigate('Bottom');
          }}
        />

        <Button
          title={'去 Top Navigator'}
          onPress={() => {
            navigation.navigate('Top');
          }}
        />

        <Button
          title={'去 DrawerNav'}
          onPress={() => {
            navigation.navigate('DrawerNav');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  headerTitle: {
    //导航栏文字的样式
    color: 'blue',
    //设置标题的大小
    fontSize: 16,
    //居中显示
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
