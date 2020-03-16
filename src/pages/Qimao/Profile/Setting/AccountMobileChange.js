import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {Toast, Provider} from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as RNGeetestSensebot from '@yyyyu/react-native-geetest-sensebot';

// 绑定手机号
class AccountMobileChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      code: '',

      codeFlag: false,
      mobileFlag: false,

      counting: false,
      timerCount: 60,
      getCode: false,
    };

    this.onMobileChange = this.onMobileChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this._sendCode = this._sendCode.bind(this);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

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

  _clearCode = () => {
    this.setState({
      code: '',
    });
  };

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

  geetest = async () => {
    let api1Result;
    try {
      const api1Response = await fetch(
        'http://www.geetest.com/demo/gt/register-test',
      );
      api1Result = await api1Response.json();
    } catch (e) {
      return console.log('API1 request failed, message: %s.', e.message);
    }

    console.log('api1Result', api1Result);

    let geetestResult;
    try {
      geetestResult = await RNGeetestSensebot.start({
        api1Result,
        // optional default false
        debug: true,
        // optional default 10s
        loadTimeout: 10000,
        // optional default 10s
        reqTimeout: 10000,
        // optional default system
        lang: RNGeetestSensebot.Lang.System,
        // optional default false
        enableBackgroundCancel: true,
        // optional default transparent
        backgroundColorIOS: 'red',
        // optional default none
        backgroundBlurEffectIOS:
          RNGeetestSensebot.BackgroundBlurEffectIOS.Regular,
        // optional
        onEvent: (code, data) => {
          if (code === RNGeetestSensebot.Events.FAILED) {
            console.log('Validate failed, reason: %s', data[0]);
          } else {
            console.log(RNGeetestSensebot.Events[code], data);
          }
        },
      });
    } catch (e) {
      return console.log('Error, code: %d, message: %s.', e.code, e.message);
    }

    console.log('geetestResult', geetestResult);

    let api2Result;
    try {
      const api2Response = await fetch(
        'http://www.geetest.com/demo/gt/validate-test',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          body: JSON.stringify(geetestResult),
        },
      );
      api2Result = await api2Response.json();
    } catch (e) {
      return console.log('API2 request failed, message: %s.', e.message);
    }

    console.log('Validate result: %o.', api2Result);

    if (api2Result.status === 'success') {
      this._requestCode();
    } else {
      this._errorNotice();
    }
  };

  async _openGeeTestCheck() {
    this.geetest();
  }

  async _sendCode() {
    if (!this.state.mobileFlag || this.state.counting) {
      return;
    }
    this._openGeeTestCheck();
  }

  async _errorNotice() {
    Toast.info('验证异常，请稍候重试！');
  }

  async _requestCode() {
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
        <Text style={{color: '#000', fontSize: 24}}>绑定新手机号</Text>
      </View>
    );
  }

  // 确认更换
  confirmChange() {
    if (!this.state.codeFlag || !this.state.mobileFlag) {
      return;
    }
    // 校验验证码

    // 请求结束后是否跳转
    Toast.loading('处理中...', 1, () => {
      if (false) {
        Toast.info('验证码已失效，请重新获取', 1);
        return;
      } else {
        this.props.navigation.navigate('');
      }
      //
    });
  }

  _renderButton() {
    if (this.state.mobileFlag && this.state.codeFlag) {
      return (
        <View style={{marginTop: 50}}>
          <LinearGradient
            colors={['#FFB129', '#FF9108']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <TouchableOpacity
              onPress={() => this.confirmChange()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 25,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  backgroundColor: 'transparent',
                }}>
                确认更换手机号
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View
          style={[
            {
              borderRadius: 25,
              marginTop: 50,
            },
            styles.default,
          ]}>
          <TouchableOpacity onPress={() => this.confirmChange()}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 12,
                paddingBottom: 12,
              }}>
              <Text style={[{fontSize: 16}, styles.defaultText]}>
                确认更换手机号
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
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
        <Provider>
          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 40, paddingRight: 40}}>
              {/* 手机号 */}
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
                  <Icon
                    name="mobile"
                    type="foundation"
                    size={30}
                    color="#F2F2F2"
                  />
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
                    placeholder={'请输入新手机号'}
                    secureTextEntry={false}
                    value={this.state.mobile}
                    keyboardType="numeric"
                    placeholderTextColor={'#BBBBBB'}
                    selectTextOnFocus={false}
                    onChangeText={this.onMobileChange}
                  />
                </View>
              </View>

              {/* 验证码 */}
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

              {/* 按钮 */}
              {this._renderButton()}
            </View>
          </View>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  edit: {
    fontSize: 18,
    height: 44,
    color: '#272727',
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
  linearGradient: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default AccountMobileChange;
