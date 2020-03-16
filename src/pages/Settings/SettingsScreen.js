import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Button,
  resolveAssetSource,
} from 'react-native';
import * as WeChat from 'react-native-wechat';
import fs from 'react-native-fs';
import Toast from 'react-native-root-toast';

import OButton from '../../components/button/OButton';
// console.log('WeChat', WeChat);

class SettingsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '设置',
  };

  constructor(props) {
    super(props);
    //应用注册
    // WeChat.registerApp('wx17256bd80120bb2b');
  }
  componentDidMount() {
    WeChat.registerApp('wx732379a9f9484d01').then(function() {
      // return WeChat.openWXApp()
    });
  }

  async shareText() {
    try {
      let result = await WeChat.shareToTimeline({
        type: 'text',
        description: 'hello, wechat',
      });
      console.log('share text message to time line successful:', result);
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }
  }

  async shareImageUrl() {
    try {
      let result = await WeChat.shareToTimeline({
        type: 'imageUrl',
        title: 'web image',
        description: 'share web image to time line',
        mediaTagName: 'email signature',
        messageAction: undefined,
        messageExt: 'asdfsdfsdfs',
        imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png',
      });
      console.log('share image url to time line successful:', result);
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }
  }

  async shareImageFile() {
    try {
      let rootPath = fs.DocumentDirectoryPath;
      let savePath = rootPath + '/email-signature-262x100.png';
      console.log(savePath);

      /*
       * savePath on iOS may be:
       *  /var/mobile/Containers/Data/Application/B1308E13-35F1-41AB-A20D-3117BE8EE8FE/Documents/email-signature-262x100.png
       *
       * savePath on Android may be:
       *  /data/data/com.wechatsample/files/email-signature-262x100.png
       **/
      await fs.downloadFile(
        'http://www.ncloud.hk/email-signature-262x100.png',
        savePath,
      );
      let result = await WeChat.shareToTimeline({
        type: 'imageFile',
        title: 'image file download from network',
        description: 'share image file to time line',
        mediaTagName: 'email signature',
        messageAction: undefined,
        messageExt: undefined,
        imageUrl: 'file://' + savePath, // require the prefix on both iOS and Android platform
      });
      console.log('share image file to time line successful:', result);
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }
  }

  async shareImageResource() {
    try {
      let imageResource = require('../assets/image/email-signature-262x100.png');
      let result = await WeChat.shareToTimeline({
        type: 'imageResource',
        title: 'resource image',
        description: 'share resource image to time line',
        mediaTagName: 'email signature',
        messageAction: undefined,
        messageExt: undefined,
        imageUrl: resolveAssetSource(imageResource).uri,
      });
      console.log('share resource image to time line successful', result);
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }
  }

  async downloadWord() {
    // Code example to download an word file from web, then share it to WeChat session
    // only support to share to session but time line
    // iOS code use DocumentDirectoryPath
    try {
      let rootPath = fs.DocumentDirectoryPath;
      let fileName = 'signature_method.doc';
      /*
       * savePath on iOS may be:
       *  /var/mobile/Containers/Data/Application/B1308E13-35F1-41AB-A20D-3117BE8EE8FE/Documents/signature_method.doc
       **/
      let savePath = rootPath + '/' + fileName;

      await fs.downloadFile(
        'https://open.weixin.qq.com/zh_CN/htmledition/res/assets/signature_method.doc',
        savePath,
      );
      let result = await WeChat.shareToSession({
        type: 'file',
        title: fileName, // WeChat app treat title as file name
        description: 'share word file to chat session',
        mediaTagName: 'word file',
        messageAction: undefined,
        messageExt: undefined,
        filePath: savePath,
        fileExtension: '.doc',
      });
      console.log('share word file to chat session successful', result);
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }
  }

  async otherF() {
    //android code use ExternalDirectoryPath
    try {
      let rootPath = fs.ExternalDirectoryPath;
      let fileName = 'signature_method.doc';
      /*
       * savePath on Android may be:
       *  /storage/emulated/0/Android/data/com.wechatsample/files/signature_method.doc
       **/
      let savePath = rootPath + '/' + fileName;
      await fs.downloadFile(
        'https://open.weixin.qq.com/zh_CN/htmledition/res/assets/signature_method.doc',
        savePath,
      );
      let result = await WeChat.shareToSession({
        type: 'file',
        title: fileName, // WeChat app treat title as file name
        description: 'share word file to chat session',
        mediaTagName: 'word file',
        messageAction: undefined,
        messageExt: undefined,
        filePath: savePath,
        fileExtension: '.doc',
      });
      console.log('share word file to chat session successful', result);
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Button title="分享文本" onPress={() => this.shareText()} />
          <Button title="分享图片链接" onPress={() => this.shareImageUrl()} />
          <Button title="分享图片文件" onPress={() => this.shareImageFile()} />
          <Button
            title="分享图片资源"
            onPress={() => this.shareImageResource()}
          />
          <Button title="下载文档" onPress={() => this.downloadWord()} />
          <Button title="其他" onPress={() => this.otherF()} />
        </View>
        <Text>Settings!</Text>
        <View style={{margin: 20}}>
          <Text style={styles.welcome}>微信分享</Text>
          <OButton
            text="微信好友分享的文本"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.shareToSession({
                    type: 'text',
                    description: '测试微信好友分享的文本内容',
                  }).catch(error => {
                    Alert.alert(error.message);
                  });
                } else {
                  Alert.alert('请安装微信');
                }
              });
            }}
          />
          <OButton
            text="微信好友分享链接"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.shareToSession({
                    title: '微信好友测试的链接',
                    description: '百度',
                    thumbImage:
                      'http://www.ncloud.hk/email-signature-262x100.png',
                    type: 'news',
                    webpageUrl: 'https://www.baidu.com',
                  }).catch(error => {
                    Alert.alert(error.message);
                  });
                } else {
                  Alert.alert('请安装微信');
                }
              });
            }}
          />
          <OButton
            text="微信朋友圈分享的文本"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.shareToTimeline({
                    type: 'text',
                    description: '测试微信朋友圈分享的文本内容',
                  }).catch(error => {
                    Alert.alert(error.message);
                  });
                } else {
                  Alert.alert('请安装微信');
                }
              });
            }}
          />
          <OButton
            text="微信朋友圈分享的链接"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.shareToTimeline({
                    title: '分享的标题',
                    description: '分享的标题内容',
                    thumbImage:
                      'http://www.ncloud.hk/email-signature-262x100.png',
                    type: 'news',
                    webpageUrl: 'https://www.baidu.com',
                  }).catch(error => {
                    Alert.alert(error.message);
                  });
                } else {
                  Alert.alert('请安装微信');
                }
              });
            }}
          />

          <OButton
            text="微信支付"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.pay({
                    partnerId: 'partnerId', // 商家向财付通申请的商家id
                    prepayId: 'prepayId', // 预支付订单
                    nonceStr: 'nonceStr', // 随机串，防重发
                    timeStamp: 'timeStamp', // 时间戳，防重发.
                    package: 'Sign=WXPay', // 商家根据财付通文档填写的数据和签名
                    sign: 'sign', // 商家根据微信开放平台文档对数据做的签名
                  })
                    .then(requestJson => {
                      //支付成功回调
                      if (requestJson.errCode === '0') {
                        //回调成功处理
                      }
                    })
                    .catch(err => {
                      console.log(err);
                      Alert.alert('支付失败');
                    });
                } else {
                  Alert.alert('请安装微信');
                }
              });
            }}
          />
        </View>
        <View style={{margin: 20}}>
          <Text style={styles.welcome}>微信好友/朋友圈分享实例</Text>
          <OButton
            text="微信好友分享-文本"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.shareToSession({
                    type: 'text',
                    description: '测试微信好友分享文本',
                  }).catch(error => {
                    Toast.show(error.message);
                  });
                } else {
                  Toast.show('没有安装微信软件，请您安装微信之后再试');
                }
              });
            }}
          />
          <OButton
            text="微信好友分享-链接"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.shareToSession({
                    title: '微信好友测试链接',
                    description: '分享自:江清清的技术专栏(www.lcode.org)',
                    thumbImage:
                      'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                    type: 'news',
                    webpageUrl: 'http://www.lcode.org',
                  }).catch(error => {
                    Toast.show(error.message);
                  });
                } else {
                  Toast.show('没有安装微信软件，请您安装微信之后再试');
                }
              });
            }}
          />
          <OButton
            text="微信朋友圈分享-文本"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.shareToTimeline({
                    type: 'text',
                    description: '测试微信朋友圈分享文本',
                  }).catch(error => {
                    Toast.show(error.message);
                  });
                } else {
                  Toast.show('没有安装微信软件，请您安装微信之后再试');
                }
              });
            }}
          />
          <OButton
            text="微信朋友圈分享-链接"
            onPress={() => {
              WeChat.isWXAppInstalled().then(isInstalled => {
                if (isInstalled) {
                  WeChat.shareToTimeline({
                    title: '微信朋友圈测试链接',
                    description: '分享自:江清清的技术专栏(www.lcode.org)',
                    thumbImage:
                      'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                    type: 'news',
                    webpageUrl: 'http://www.lcode.org',
                  }).catch(error => {
                    Toast.show(error.message);
                  });
                } else {
                  Toast.show('没有安装微信软件，请您安装微信之后再试');
                }
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    margin: 5,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
});

export default SettingsScreen;
