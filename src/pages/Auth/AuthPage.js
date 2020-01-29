import React, {Component} from 'react';
import {View, Button} from 'react-native';

class AuthPage extends Component {
  goToLogin() {
    this.props.navigation.navigate('Login');
  }

  goToRegister() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View>
        <Button onPress={() => this.goToLogin()} title="登录" />
        <Button onPress={() => this.goToRegister()} title="注册" />
      </View>
    );
  }
}

export default AuthPage;
