import React, {Component} from 'react';
import {View, Button, Text, DeviceEventEmitter, Alert} from 'react-native';
import MyMainModule from '../modules/MyMainModule';
import ToastExample from '../modules/ToastExample';

class NativePage extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
  };

  constructor(props) {
    super(props);
    this.state = {
      contact: {
        phoneNum: 'xxxxxxx',
        phoneName: 'yyyyyyyy',
      },
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener(
      'AndroidToRNMessage',
      this.handleAndroidMessage,
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener(
      'AndroidToRNMessage',
      this.handleAndroidMessage,
    );
  }

  handleAndroidMessage(contact) {
    console.log(contact);
    Alert.alert(contact);
    this.setState({
      contact: contact,
    });
  }

  rnCall() {
    MyMainModule.rnCallNative('测试RN原生方法调用');
  }

  show() {
    ToastExample.show('Awesome', ToastExample.SHORT);
  }

  openActivity() {
    MyMainModule.openActivity();
  }

  getContacts() {
    MyMainModule.getContacts();
  }

  render() {
    let contactV = this.state.contact ? (
      <View>
        <Text>{this.state.contact.phoneNum}</Text>
        <Text>{this.state.contact.phoneName}</Text>
      </View>
    ) : (
      <View>
        <Text>无用户</Text>
      </View>
    );
    return (
      <View>
        <Button title="原生方法调用" onPress={() => this.rnCall()} />
        <Button title="原生方法：Toast" onPress={() => this.show()} />
        <Button
          title="原生方法: Activity"
          onPress={() => this.openActivity()}
        />
        <Button title="原生方法: Contact" onPress={() => this.getContacts()} />
        {contactV}
      </View>
    );
  }
}

export default NativePage;
