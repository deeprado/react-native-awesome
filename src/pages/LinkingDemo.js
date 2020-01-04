import React, {Component} from 'react';
import {View, Linking, AppState} from 'react-native';
import LinkingButton from '../components/LinkingButton';

export default class LinkingDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      Linking.getInitialURL().then(url => {
        console.warn('onAppStateChange Url:' + url);
      });
    }
  };
  componentDidMount = async () => {
    if (AppState.currentState === 'active') {
      Linking.getInitialURL().then(url => {
        console.warn('AppState.currentState Url:' + url);
      });
    }
    AppState.addEventListener('change', this.onAppStateChange);
  };

  render() {
    return (
      <View>
        <LinkingButton url="http://www.reactnaive.vip" text="打开http网页" />
        <LinkingButton url="https://www.baidu.com" text="打开https网页" />
        <LinkingButton url="smsto:13684511513" text="发送短信" />
        <LinkingButton url="tel:18545530416" text="打电话" />
        <LinkingButton url="mailto:siversonw@126.com" text="发邮件" />
        <LinkingButton url="dfy:888999" text="无法打开url" />
        <LinkingButton url="geo:37.2323, 123.2323" text="打开地图位置" />
        <LinkingButton url="dfy://reactnative.vip/data" text="自己打开自己" />
        <LinkingButton url="dfy://test" text="自己打开自己" />
      </View>
    );
  }
}
