import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';

const logo = require('../../static/img/logo.png');

export default class Page3 extends Component {
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
    this._goMyPage = this._goMyPage.bind(this);
  }

  _goMyPage() {
    this.props.navigation.navigate('MyPage', {
      increaseCount: 1,
    });
  }

  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>首页</Text>
          <Button title="进入我的" onPress={this._goMyPage} />
          <Image source={logo} />
        </View>
      </>
    );
  }
}
