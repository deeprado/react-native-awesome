import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';

const logo = require('../../static/img/logo.png');

export default class DrawerPage extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: 'green',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  // 构造
  constructor(props) {
    super(props);
    this._goLogin = this._goLogin.bind(this);
  }

  _goLogin() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>首页</Text>
          <Button title="登录" onPress={this._goLogin} />
          <Image source={logo} />
        </View>
      </>
    );
  }
}
