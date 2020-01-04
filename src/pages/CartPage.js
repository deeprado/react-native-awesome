import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';
const logo = require('../../static/img/logo.png');

export default class CartPage extends Component {
  // 构造
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>购物车</Text>
          <Button
            title="进入我的"
            onPress={() => this.props.navigation.navigate('MyPage')}
          />
          <Image source={logo} />
        </View>
      </>
    );
  }
}
