import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import * as WeChat from 'react-native-wechat';
import ToastUtil from '../Util/ToastUtil';

const wechatLoginPng = require('../../../assets/qimao/image/wechat_login.png');
const appid = 'wx732379a9f9484d01';
const secretID = '';

class Mobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      code: '',
      readed: true,

      mobileFlag: false,
      codeFlag: false,

      counting: false,
      timerCount: 60,
      getCode: false,
    };

    this.onMobileChange = this.onMobileChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this._sendCode = this._sendCode.bind(this);
  }

  componentDidMount() {
    WeChat.registerApp(appid).then(res => {
      console.log('注册结果：', res);
    });
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
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

  //
  getAccessToken(responseCode) {
    // ToastUtil.showShort(responseCode, true);
    var AccessTokenUrl =
      'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' +
      appid +
      '&secret=' +
      secretID +
      '&code=' +
      responseCode +
      '&grant_type=authorization_code';
    // console.log('AccessTokenUrl=',AccessTokenUrl);
    fetch(AccessTokenUrl, {
      method: 'GET',
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('responseData.refresh_token=', responseData);
        this.getRefreshToken(responseData.refresh_token);
      })
      .catch(error => {
        if (error) {
          console.log('error=', error);
        }
      });
  }

  //  获取 refresh_token
  getRefreshToken(refreshtoken) {
    var getRefreshTokenUrl =
      'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' +
      appid +
      '&grant_type=refresh_token&refresh_token=' +
      refreshtoken;
    // console.log('getRefreshTokenUrl=',getRefreshTokenUrl);
    fetch(getRefreshTokenUrl, {
      method: 'GET',
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('responseData.accesstoken=', responseData);
        this.getUserInfo(responseData);
      })
      .catch(error => {
        if (error) {
          console.log('error=', error);
        }
      });
  }

  //获取用户信息
  getUserInfo(responseData) {
    console.log(responseData);
    var getUserInfoUrl =
      'https://api.weixin.qq.com/sns/userinfo?access_token=' +
      responseData.access_token +
      '&openid=' +
      responseData.openid;
    console.log('getUserInfoUrl=', getUserInfoUrl);
    fetch(getUserInfoUrl, {
      method: 'GET',
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('getUserInfo=', responseData);
        ToastUtil.showLong(
          [
            responseData.nickname,
            responseData.province,
            responseData.city,
            responseData.openid,
          ],
          true,
        );
      })
      .catch(error => {
        if (error) {
          console.log('error=', error);
        }
      });
  }

  auth() {
    let scope = 'snsapi_userinfo'; //应用授权作用域，如获取用户个人信息则填写snsapi_userinfo
    let state = 'wechat_sdk_demo';
    WeChat.isWXAppInstalled()
      .then(isInstalled => {
        if (isInstalled) {
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
            //返回code码，通过code获取access_token
            this.getAccessToken(authInfo.code);
            console.log(authInfo);
          });
        }
      })
      .catch(err => {
        // 10005 需要开发者认证后，进行授权
        Alert.alert('登录授权发生错误：', err.message, [{text: '确定'}]);
      });
  }

  onMobileChange(text) {
    const newText = text.replace(/[^\d]+/, '');

    let mobileFlag = /^1[3456789]\d{9}$/.test(newText);
    this.setState({
      mobileFlag: mobileFlag,
      mobile: newText,
    });
  }

  onCodeChange(text) {
    const newText = text.replace(/[^\d]+/, '');
    let codeFlag = /^(\d{4}|\d{6})$/.test(newText);
    this.setState({
      codeFlag: codeFlag,
      code: newText,
    });
  }

  _clearMobile = () => {
    this.setState({
      mobile: '',
    });
  };

  _clearCode = () => {
    this.setState({
      code: '',
    });
  };

  _renderCloseMobile() {
    if (this.state.mobile.length <= 0) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={this._clearMobile}
        style={{position: 'absolute', right: 0, top: 10}}>
        <View style={{padding: 5}}>
          <Icon name="x-circle" type="feather" size={12} color="#B2B2B2" />
        </View>
      </TouchableOpacity>
    );
  }

  _renderCloseCode() {
    if (this.state.code.length <= 0) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={this._clearCode}
        style={{position: 'absolute', right: 0, top: 10}}>
        <View style={{padding: 5}}>
          <Icon name="x-circle" type="feather" size={12} color="#B2B2B2" />
        </View>
      </TouchableOpacity>
    );
  }

  _countDownAction() {
    let that = this;
    this.interval = setInterval(() => {
      let codeTime = that.state.timerCount;
      let timer = codeTime - 1;
      if (timer === 0) {
        this.interval && clearInterval(this.interval);
        this.setState({
          counting: false,
          timerCount: 60,
        });
      } else {
        this.setState({
          timerCount: timer,
        });
      }
    }, 1000);
  }

  _fetchCode() {
    console.log('_fetchCode', this.state.mobile);
  }

  _sendCode() {
    if (!this.state.mobileFlag || this.state.counting) {
      return;
    }
    // 请求后台发送验证
    this._fetchCode();
    // 设置状态
    this.setState({
      counting: true,
      getCode: true,
    });
    this._countDownAction();
  }

  _renderGetCode() {
    if (this.state.getCode) {
      if (this.state.counting) {
        return (
          <Text style={[{fontSize: 18}, styles.defaultCode]}>
            {this.state.timerCount}s后重新发送
          </Text>
        );
      } else {
        return (
          <Text style={[{fontSize: 18}, styles.activeCode]}>重新发送</Text>
        );
      }
    } else {
      return (
        <Text
          style={[
            {fontSize: 18},
            this.state.mobileFlag ? styles.activeCode : styles.defaultCode,
          ]}>
          获取验证码
        </Text>
      );
    }
  }

  _onLogin() {
    console.log('登录');
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
        <View style={{paddingLeft: 30, paddingRight: 30}}>
          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#9A9A9A'}}>
              登录七猫免费小说，免费看书领奖励
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
              paddingBottom: 10,
              borderBottomColor: '#F8F8F8',
              borderBottomWidth: 1,
            }}>
            <View style={{width: 30}}>
              <Icon name="mobile" type="foundation" size={30} color="#F2F2F2" />
            </View>
            <View
              style={{
                position: 'relative',
                flex: 1,
              }}>
              <TextInput
                multiline={false}
                maxLength={11}
                selectionColor={'#FA900D'}
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit={true}
                style={styles.edit}
                placeholder={'请输入手机号'}
                secureTextEntry={false}
                value={this.state.mobile}
                keyboardType="numeric"
                placeholderTextColor={'#BBBBBB'}
                selectTextOnFocus={false}
                onChangeText={this.onMobileChange}
              />
              {this._renderCloseMobile()}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              paddingBottom: 10,
              borderBottomColor: '#F8F8F8',
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 30}}>
                <Icon
                  name="shield"
                  type="foundation"
                  size={26}
                  color="#F2F2F2"
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  paddingRight: 120,
                }}>
                <TextInput
                  multiline={false}
                  maxLength={6}
                  clearButtonMode={'always'}
                  selectionColor={'#FA900D'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  style={styles.edit}
                  placeholder={'请输入验证码'}
                  secureTextEntry={false}
                  keyboardType="numeric"
                  selectTextOnFocus={false}
                  placeholderTextColor={'#BBBBBB'}
                  onChangeText={this.onCodeChange}
                  value={this.state.code}
                />
                {this._renderCloseCode()}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderLeftColor: '#C5C5C5',
                borderLeftWidth: 1,
              }}>
              <TouchableOpacity
                onPress={this._sendCode}
                style={{paddingLeft: 20, paddingRight: 20}}>
                {this._renderGetCode()}
              </TouchableOpacity>
            </View>
          </View>

          {/* 微信登录 */}
          <View
            style={[
              {
                borderRadius: 25,
                paddingTop: 10,
                paddingBottom: 10,
                marginTop: 50,
              },
              this.state.mobileFlag && this.state.codeFlag
                ? styles.active
                : styles.default,
            ]}>
            <TouchableOpacity onPress={this._onLogin}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon />
                <Text
                  style={[
                    {fontSize: 18},
                    this.state.mobileFlag && this.state.codeFlag
                      ? styles.activeText
                      : styles.defaultText,
                  ]}>
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
              未注册的手机号号登录后将自动注册
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
            <TouchableOpacity onPress={this.auth}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={wechatLoginPng}
                  style={{width: 70, height: 70}}
                />
                <Text style={{color: '#797979', alignSelf: 'center'}}>
                  微信登录
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
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <Icon
              name="check-circle"
              size={18}
              color={this.state.readed ? '#FF8D00' : '#E3E3E3'}
              type="feather"
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
  active: {
    backgroundColor: '#FFA920',
  },
  default: {
    backgroundColor: '#F5F5F5',
  },
  activeText: {
    color: '#fff',
  },
  defaultText: {
    color: '#BBBBBB',
  },
  activeCode: {
    color: '#FF9D25',
  },
  defaultCode: {
    color: '#C5C5C5',
  },
  edit: {
    fontSize: 18,
    height: 44,
    color: '#BBBBBB',
  },
});

export default Mobile;
