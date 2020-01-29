import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import JPush from 'jpush-react-native';
export default class ChatWith extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 初始化 JPush
    JPush.init();
    //连接状态
    this.connectListener = result => {
      console.log('connectListener:' + JSON.stringify(result));
    };
    JPush.addConnectEventListener(this.connectListener);
    //通知回调
    this.notificationListener = result => {
      console.log('notificationListener:' + JSON.stringify(result));
    };
    JPush.addNotificationListener(this.notificationListener);
    //自定义消息回调
    this.customMessageListener = result => {
      console.log('customMessageListener:' + JSON.stringify(result));
    };
    JPush.addCustomMessagegListener(this.customMessageListener);
    //本地通知回调 todo
    this.localNotificationListener = result => {
      console.log('localNotificationListener:' + JSON.stringify(result));
    };
    JPush.addLocalNotificationListener(this.localNotificationListener);
    //tag alias事件回调
    this.tagAliasListener = result => {
      console.log('tagAliasListener:' + JSON.stringify(result));
    };
    JPush.addTagAliasListener(this.tagAliasListener);
    //手机号码事件回调
    this.mobileNumberListener = result => {
      console.log('mobileNumberListener:' + JSON.stringify(result));
    };
    JPush.addMobileNumberListener(this.mobileNumberListener);
    //
  }

  render() {
    return (
      <View style={styles.containers}>
        <Button
          title="点击推送"
          onPress={() => {
            // 推送事件 业务代码 请提取到函数里面
            JPushModule.sendLocalNotification({
              buildId: 1, // 设置通知样式
              id: 5, // 通知的 id, 可用于取消通知
              extra: {key1: 'value1', key2: 'value2'}, // extra 字段 就是我们需要传递的参数
              fireTime: new Date().getTime(), // 通知触发时间的时间戳（毫秒）
              badge: 8, // 本地推送触发后应用角标的 badge 值 （iOS Only）
              subtitle: 'subtitle', // 子标题 （iOS10+ Only）
              title: '通知',
              content: '您有未读消息',
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containers: {
    paddingTop: 20,
  },
});
