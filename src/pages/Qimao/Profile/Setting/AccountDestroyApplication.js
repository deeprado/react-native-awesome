import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Toast, Provider} from '@ant-design/react-native';

class AccountDestroyApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
        <Text style={{color: '#000', fontSize: 24}}>申请注销账号</Text>
      </View>
    );
  }

  destroyAccount() {
    // 请求结束后是否跳转
    Toast.loading('处理中...', 1, () => {
      Toast.info('账号已注销', 1);
    });
  }

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#fff'}
            leftComponent={this.renderLeftComponent()}
            centerComponent={this.renderCenterComponent()}
            rightComponent={this.renderRightComponent()}
          />
          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 30, paddingRight: 30}}>
              <View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#272727'}}>
                    一、 注销账号必须符合以下条件：
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    1.
                    近一个月内不存在更换手机号、更换微信号等敏感信息变更的操作；
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    2. 不存在正在审核中的提现申请
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    3. 账号处于正常状态，不存在被经用等限制情形。
                  </Text>
                </View>
              </View>

              <View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 20, color: '#272727'}}>
                    二、
                    注销后的账号，相关信息会被清空，且无法找回，无法进行相关操作：
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    1. 无法登录、使用七猫免费小说账号；
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    2. 账号中的书架记录将被清空；
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    3. 账号中的特权权益将被清空；
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    4. 账号中的邀请好友关系将被清空；
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    5. 账号中的签到记录将被清空；
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 18, color: '#676767'}}>
                    6. 账号中的金币、现金金额将被清空；
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 30, paddingLeft: 50, paddingRight: 50}}>
              <View style={{}}>
                <LinearGradient
                  colors={['#FFB129', '#FF9108']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  style={styles.linearGradient}>
                  <TouchableOpacity
                    onPress={this.destroyAccount}
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
                        fontSize: 18,
                        backgroundColor: 'transparent',
                      }}>
                      同意并申请注销账号
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  linearGradient: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default AccountDestroyApplication;
