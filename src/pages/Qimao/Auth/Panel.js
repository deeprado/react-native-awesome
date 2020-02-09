import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {Header, Text, Image, Icon} from 'react-native-elements';
import * as WeChat from 'react-native-wechat';
const {width, height} = Dimensions.get('window');

const panelBgPng = require('../../../assets/qimao/image/panel_bg.png');
const mobileLoginPng = require('../../../assets/qimao/image/mobile_login.png');

class Panel extends Component {
  // static navigationOptions = {
  //   title: '福利',
  // };

  constructor(props) {
    super(props);
    this.state = {
      alRead: false,
    };
  }

  componentDidMount() {
    WeChat.registerApp('wx732379a9f9484d01');
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24}}>登录</Text>
      </View>
    );
  }

  goTarget(routeName) {
    this.props.navigation.navigate(routeName);
  }

  auth() {
    let scope = 'snsapi_userinfo'; //应用授权作用域，如获取用户个人信息则填写snsapi_userinfo
    let state = 'wechat_sdk_demo';
    WeChat.sendAuthRequest(scope, state).then(authInfo => {
      /*
        errCode	Number	Error Code
        errStr	String	Error message if any error occurred
        openId	String	xxx
        code	String	Authorization code
        url	String	The URL string
        lang	String	The user language
        country	String	The user country
      */
      console.log(authInfo);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />

        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <View>
            <Image
              source={panelBgPng}
              style={{width: width - 40, height: 220}}
            />
          </View>

          {/* 微信登录 */}
          <View
            style={{
              backgroundColor: '#39B900',
              borderRadius: 25,
              paddingTop: 10,
              paddingBottom: 10,
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={this.auth}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="social-github"
                  type="foundation"
                  size={25}
                  color="#fff"
                />
                <Text style={{color: '#fff', fontSize: 20}}>
                  登录领最高10元红包
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 提示信息 */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: '#9B9B9B', fontSize: 12, marginTop: 10}}>
              新用户专享
            </Text>
            <Text style={{color: '#9B9B9B', fontSize: 12, marginTop: 10}}>
              未注册的微信号登录后将自动注册
            </Text>
          </View>

          {/* 其他登录方式 */}
          <View
            style={{
              position: 'relative',
              marginTop: 30,
              marginBottom: 20,
            }}>
            <View
              style={{
                height: 10,
                borderBottomColor: '#F5F5F5',
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: '#fff',
                paddingLeft: 5,
                paddingRight: 5,
              }}>
              <Text
                style={{fontSize: 14, color: '#9B9B9B', alignSelf: 'center'}}>
                其他登录方式
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.goTarget('Mobile')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={mobileLoginPng}
                  style={{width: 70, height: 70}}
                />
                <Text style={{color: '#797979', alignSelf: 'center'}}>
                  手机号登录
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 30,
            left: 0,
            right: 0,
          }}>
          <View
            style={{
              backgroundColor: 'red',
            }}>
            <Icon
              name="check-circle"
              type="feather"
              size={24}
              color={'#DADADA'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#B3B3B3'}}>我已阅读并同意</Text>
            <TouchableOpacity onPress={() => this.goTarget('Agreement')}>
              <Text style={{color: '#FFA029'}}>《用户协议》</Text>
            </TouchableOpacity>
            <Text style={{color: '#B3B3B3'}}>及</Text>
            <TouchableOpacity onPress={() => this.goTarget('Privacy')}>
              <Text style={{color: '#FFA029'}}>《隐私政策》</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default Panel;
