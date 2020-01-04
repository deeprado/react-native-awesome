import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
/**
 * 抽屉导航页面-理财
 */
export default class DrawerLicai extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30}}>理财</Text>
        <TouchableOpacity onPress={this.backHome.bind(this)}>
          <Text
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              marginTop: 20,
            }}>
            返回首页
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.openWallet.bind(this)}>
          <Text
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              marginTop: 20,
            }}>
            跳转钱包
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  //返回首页
  backHome() {
    this.props.navigation.state.params.jumpLicaiCallBack(1);
    this.props.navigation.goBack();
  }
  //跳转钱包
  openWallet() {
    this.props.navigation.navigate('wallet', {
      jumpWalletCallBack: index => {
        this.props.navigation.state.params.jumpLicaiCallBack(index);
      },
    });
    this.props.navigation.state.params.jumpLicaiCallBack(3);
  }
}
